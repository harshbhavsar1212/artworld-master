const express = require("express");

const {addToCart,
    fetchCartItem,
    updateCartItemQuantity,
    deleteCartItem,
} = require("../../controllers/shop/cart-controller");


const router = express.Router();

router.post("/add", addToCart);
router.get("/get/:userId", fetchCartItem);
router.put("/update-cart", updateCartItemQuantity);
router.delete("/:userId/:productId", deleteCartItem);


module.exports = router;
