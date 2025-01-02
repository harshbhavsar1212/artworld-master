const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../../models/Order');
const Cart = require("../../models/Cart");
const Product = require("../../models/Product")

// Initialize Razorpay instance
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET
});

// Create Order
const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
    } = req.body;

    // Create Razorpay order
    const options = {
      amount: totalAmount * 100, // Amount in paisa
      currency: 'INR',
      receipt: `receipt_order_${Date.now()}`
    };

    const order = await razorpayInstance.orders.create(options);

    // Store order in database
    const newOrder = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId: order.id,
      payerId,
    });
    await newOrder.save();

    res.status(201).json({
      success: true,
      orderId: newOrder._id,
      razorpayOrderId: order.id,
    });

  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ success: false, message: 'Order creation failed' });
  }
};

// Capture Payment
const capturePayment = async (req, res) => {


  try {

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId, orderId } = req.body;
    
  
    let order = await Order.findById(orderId);
    console.log(orderId, "orderID");
    

    if(!order){
      return res.status(404).json({
        success : false,
        message : "Order not found"
      })
    }

    // Verify payment signature to ensure authenticity
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest('hex');

    // console.log(razorpay_signature, "recevied signature");
    // console.log(expectedSignature, "expected signature");



    if (expectedSignature === razorpay_signature) {
      // Payment is valid, mark as paid in database
      const updatedOrder = await Order.findOneAndUpdate(
        { paymentId: razorpay_order_id },
        { paymentStatus: 'paid', orderStatus: 'Confirmed' },
        { new: true }
      );

      if (!updatedOrder) {
        return res.status(404).json({
          success: false,
          message: 'Order not found',
        });
      }


      //update the stock for each product in the order's cartItems
      for(let item of order.cartItems){
        let product = await Product.findById(item.productId);

        if(!product){
          return res.status(404).json({
            success : false,
            message : `Not enough stock for this product ${product.title}`
          });
        }

        product.totalStock -= item.quantity;
        await product.save();

      }

      // Clear the user's cart after successful payment
      await Cart.findOneAndUpdate(
        { userId },
        { $set: { items: [] } }, // Clear all items
        { new: true }
      );


      console.log('Payment captured successfully:', {
        orderId: updatedOrder._id,
        razorpay_order_id,
        razorpay_payment_id,
        paymentStatus: 'paid',
        orderStatus: 'Confirmed',
      });

      res.status(200).json({
        success: true,
        message: 'Payment captured successfully'
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Invalid payment signature'
      });
    }
  } catch (error) {
    console.error('Error capturing payment:', error);
    res.status(500).json({ success: false, message: 'Payment capture failed' });
  }
};

//Orders
const getAllOrdersByUserId = async (req,res) =>{
  try {
    
    const {userId} = req.params;
    const orders = await Order.find({userId});

    if(!orders.length){
      return res.status(404).json({
        success : false,
        message : "No Orders found"
      });
    }

    res.status(200).json({
      success : true,
      data : orders
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success : false,
      message : "some error occured"

    })
    
  }
}

const getOrderDetails = async (req,res) =>{
  try {
    
    const {id} = req.params;
    const order = await Order.findById(id);

    if(!order){
      return res.status(404).json({
        success : false,
        message : "Order not  found"
      });
    }

    res.status(200).json({
      success : true,
      data : order
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success : false,
      message : "some error occured"

    })
    
  }
}


module.exports = { createOrder, capturePayment, getAllOrdersByUserId, getOrderDetails };
