const express = require("express");


const { addFeatureImages, getFeatureImages } = require("../../controllers/common/feature-controller");


const router = express.Router();


router.post("/add", addFeatureImages);        
router.get("/get", getFeatureImages);      


module.exports = router;