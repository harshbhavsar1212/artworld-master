const Feature = require("../../models/Feature");


const addFeatureImages = async (req, res) => {
    try {

        const { image } = req.body;

        console.log(image, "image");

        const featuresImages = new Feature({
            image
        })

        await featuresImages.save();

        res.status(201).json({
            success : true,
            data : featuresImages,
        })
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : "Some Error Occured,"
        })
        
    }
}



const getFeatureImages = async (req, res) => {
    try {

        const images = await Feature.find({});

        res.status(200).json({
            success : true,
            data : images,
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : "Some Error Occured,"
        })
        
    }
}


module.exports = {addFeatureImages, getFeatureImages};