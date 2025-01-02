const Address = require("../../models/Address");

const addAddress = async (req, res) => {
    try {

        const { userId, fullName, address, city, state, pincode, phone, notes } = req.body;

        if (!userId || !fullName || !address || !city || !state || !pincode || !phone || !notes) {
            return res.status(400).json({
                success: false,
                message: "Invalid Data Provided",
            });
        }

        const newlyCreatedAddress = new Address({
            userId, fullName, address, city, state, pincode, phone, notes
        })

        await newlyCreatedAddress.save();

        res.status(201).json({
            success: true,
            data: newlyCreatedAddress,
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error"
        })

    }
}

const fetchAllAddress = async (req, res) => {
    try {

        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User Id Required"
            });
        }

        const addressList = await Address.find({ userId });

        res.status(200).json({
            success: true,
            data: addressList,
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error"
        })

    }
}

const editAddress = async (req, res) => {
    try {

        const { userId, addressId } = req.params;
        const formData = req.body;

        if (!userId || !addressId) {
            return res.status(400).json({
                success: false,
                message: "User and Address Id required"
            });
        }

        const address = await Address.findOneAndUpdate({
            _id: addressId,
            userId
        }, formData, { new: true });

        if (!address) {
            return res.status(404).json({
                success: false,
                message: "address not found",
            })
        }

        res.status(200).json({
            success: true,
            data: address
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error"
        })

    }
}


const deleteAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params;

        if (!userId || !addressId) {
            return res.status(400).json({
                success: false,
                message: "User and Address Id required"
            });
        }

        const address = await Address.findOneAndDelete({ _id: addressId, userId });

        if (!address) {
            return res.status(404).json({
                success: false,
                message: " address not found ",
            });
        }

        res.status(200).json({
            success: true,
            message: "address deleted successfully",
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error"
        })

    }
}


module.exports = { addAddress, fetchAllAddress, editAddress, deleteAddress };