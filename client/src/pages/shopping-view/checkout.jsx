/* eslint-disable react/jsx-key */
import Address from "@/components/shopping-view/address";
import img from "../../assets/account.png"
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { capturePayment, createNewOrder } from "@/store/shop/order-slice";
import { toast } from "@/hooks/use-toast";




function ShoppingCheckout() {


  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const dispatch = useDispatch();
  const { razorpayOrderId = null, isLoading = false, paymentError = null } = useSelector((state) => state.order || {});



  console.log(currentSelectedAddress, "currentSelectedAddress");

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
        (sum, currentItem) =>
          sum +
          (currentItem?.salePrice > 0
            ? currentItem?.salePrice
            : currentItem?.price) *
          currentItem?.quantity, 0
      ) : 0;


  const handlePayment = async () => {

    if (cartItems.length === 0) {
      toast({
        title: "Your Cart is Empty please add items to procced",
        variant: "destructive"
      });

      return;
    }

    if (currentSelectedAddress === null) {
      toast({
        title: "Please Select One Address to process",
        variant: "destructive"
      });
      return;
    }


    // console.log(orderId,"orderId");


    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price: singleCartItem?.salePrice > 0 ? singleCartItem?.salePrice : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        fullName: currentSelectedAddress?.fullName,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        state: currentSelectedAddress?.state,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "razorpay",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
    };


    try {

      const response = await dispatch(createNewOrder(orderData));
      // console.log(response, "hello");


      if (response && response.type === "order/createNewOrder/fulfilled") {
        const razorpayOrder = response.payload;

        // Capture both razorpayOrderId and orderId from the response
        const { razorpayOrderId, orderId } = razorpayOrder;

        console.log("Razorpay Order ID:", razorpayOrderId);
        console.log("Your system Order ID:", orderId);

        const options = {
          key: import.meta.env.VITE_RAZORPAY_API_KEY, // Replace with your Razorpay key
          amount: razorpayOrder.totalAmount * 100,
          currency: "INR",
          name: "Order Payment",
          description: "Complete your purchase",
          order_id: razorpayOrder.razorpayOrderId,
          handler: async function (response) {
            const paymentData = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              userId: user?.id,
              orderId: orderId,
            };

            // Dispatch capturePayment with payment data
            await dispatch(capturePayment(paymentData));
            console.log(paymentData, "pritesh");

            // Redirect after successful payment
            window.location.href = "/shop/payment-success";

          },
          prefill: {
            name: user?.name,
            email: user?.email,
            contact: currentSelectedAddress?.phone,
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        console.error("order creation failed", response);

      }

    } catch (error) {
      console.error(error, "error during payment initiation");

    }



  };



  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address selectedId={currentSelectedAddress} setCurrentSelectedAddress={setCurrentSelectedAddress} />
        <div className="felx flex-col gap-4">
          {
            cartItems && cartItems.items && cartItems.items.length > 0 ?
              cartItems.items.map((item) =>
                <UserCartItemsContent
                  cartItem={item}
                />
              ) : null
          }

          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total Amount</span>
              <span className="font-bold">₹{totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button onClick={handlePayment} className="w-full">Checkout with Razorpay</Button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ShoppingCheckout;