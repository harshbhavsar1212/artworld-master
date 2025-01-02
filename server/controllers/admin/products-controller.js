const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");



const handleImageUpload = async (req, res) => {
    try {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const url = "data:" + req.file.mimetype + ";base64," + b64;
      
      const result = await imageUploadUtil(url);
      
      // Check if the imageUploadUtil call was successful
      if (result && result.url) {
        res.json({
          success: true,
          result,  // Return the result for debugging
        });
      } else {
        // If result doesn't contain expected data, handle this case
        throw new Error("Image upload failed: No URL returned.");
      }
      
    } catch (error) {
      console.log("Error during image upload:", error);  // More detailed logging
      res.status(500).json({
        success: false,
        message: error.message || "An error occurred during image upload",  // Send error details back to frontend
      });
    }
  };


  //add a new product


  const addProduct = async(req, res)=>{
    try{

      const {
        image, 
        title, 
        description, 
        category, 
        price, 
        salePrice, 
        totalStock,
      } = req.body;

      const newlyCreatedProduct = new Product({
        image, 
        title, 
        description, 
        category, 
        price, 
        salePrice, 
        totalStock,
      });

      await newlyCreatedProduct.save();
      res.status(201).json({
        success:true,
        data : newlyCreatedProduct,
      });

    }catch(e){
      console.log(e);
      res.status(500).json({
        success : false,
        message: "Error occured"
      });
      
    }
  };

  //fetch all products

  const fetchAllProduct = async(req, res)=>{

    try{

      const listOfProducts = await Product.find({});
      res.status(200).json({
        success : true,
        data : listOfProducts,
      });

    }catch(e){
      console.log(e);
      res.status(500).json({
        success : false,
        message: "Error occured"
      });
      
    }

  };
 

  //edit a product 

  const editProduct = async(req,res)=>{

    try{

      const {id} = req.params;
      const {
        image, 
        title, 
        description, 
        category, 
        price, 
        salePrice, 
        totalStock,
      } = req.body;

      let findProduct = await Product.findById(id);
      if(!findProduct) return(404).json({
        success : false,
        message : "Product not found",
      });

      findProduct.title = title || findProduct.title;
      findProduct.description = description || findProduct.description;
      findProduct.category = category || findProduct.category;
      findProduct.price = price === "" ? 0 : price || findProduct.price;
      findProduct.salePrice = salePrice === "" ? 0 : salePrice || findProduct.salePrice;
      findProduct.totalStock = totalStock || findProduct.totalStock;
      findProduct.image = image || findProduct.image;

      await findProduct.save();
      res.status(200).json({
        success : true,
        data : findProduct,
      });

    }catch(e){
      console.log(e);
      res.status(500).json({
        success : false,
        message: "Error occured"
      });
      
    }

  }

  


  //delete a product

  const deleteProduct = async(req,res)=>{


    try{

      const {id} = req.params
      const product = await Product.findByIdAndDelete(id);

      if(!product) return(404).json({
        success : false,
        message : "Product not found",
      });

      res.status(200).json({
        success : true,
        message : "Product deleted successfully",
      });
      

    }catch(e){
      console.log(e);
      res.status(500).json({
        success : false,
        message: "Error occured"
      });
    }

  }

  module.exports = {handleImageUpload, addProduct, fetchAllProduct, editProduct, deleteProduct};
  