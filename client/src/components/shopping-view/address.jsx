/* eslint-disable react/jsx-key */
import { addressFromControls } from "@/config";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewAddress, deleteAddress, editaAddress, fetchAllAddresses } from "@/store/shop/address-slice";
import AddressCard from "./address-card";
import { toast } from "@/hooks/use-toast";


const initialAddressFormData = {
    fullName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    notes: "",
}


function Address({setCurrentSelectedAddress, selectedId}) {

    const [formData, setFormData] = useState(initialAddressFormData);
    const [currentEditedId, setCurrentEditedId] = useState(null);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { addressList } = useSelector((state) => state.shopAddress);



    function handleManageAddress(event) {
        event.preventDefault();

        if(addressList.length >= 3 && currentEditedId === null){
            setFormData(initialAddressFormData);
            toast({
                title : "You can not add more than 3 addresses",
                variant : "destructive",
            })
            return;
        }


        currentEditedId !== null ? 
        dispatch(editaAddress({
            userId : user?.id,
            addressId : currentEditedId,
            formData,
        })).then((data)=>{
            if(data?.payload?.success){
                dispatch(fetchAllAddresses(user?.id));
                setCurrentEditedId(null);
                setFormData(initialAddressFormData);
                toast({
                    title: "Address Updated Successfully"
                })
            }
        })

        : dispatch(addNewAddress({
            ...formData,
            userId: user?.id,
        })
        ).then((data) => {
            console.log(data);
            if (data?.payload?.success) {
                dispatch(fetchAllAddresses(user?.id))
                setFormData(initialAddressFormData)
                toast({
                    title: "Address Added Successfully"
                })
            }
        });
    }

    function handleDeleteAddress(getCurrentAddress) {
        console.log(getCurrentAddress);
        dispatch(deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })).then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchAllAddresses(user?.id));
                toast({
                    title: "Address Deleted Successfully",
                });
            }
        })

    }

    function handleEditAddress(getCurrentAddress) {
        setCurrentEditedId(getCurrentAddress?._id)
        setFormData({
            ...formData,
            fullName: getCurrentAddress?.fullName,
            address: getCurrentAddress?.address,
            city: getCurrentAddress?.city,
            state: getCurrentAddress?.state,
            pincode: getCurrentAddress?.pincode,
            phone: getCurrentAddress?.phone,
            notes: getCurrentAddress?.notes,
        })
    }

    function isFormValid() {
        return Object.keys(formData)
            .map((key) => formData[key] !== "")
            .every((item) => item);
    }

    useEffect(() => {
        dispatch(fetchAllAddresses(user?.id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    // console.log(addressList,"addressList");



    return (
        <Card>
            <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {
                    addressList && addressList.length > 0 ?
                        addressList.map((singleAddressItem) =>
                            <AddressCard
                                selectedId={selectedId}
                                handleDeleteAddress={handleDeleteAddress}
                                addressInfo={singleAddressItem}
                                handleEditAddress={handleEditAddress}
                                setCurrentSelectedAddress={setCurrentSelectedAddress}
                            />
                        ) : null
                }
            </div>
            <CardHeader>
                <CardTitle>
                    {
                        currentEditedId  !== null ? "Edit Address" : "New Address"
                    }
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <CommonForm
                    formControls={addressFromControls}
                    formData={formData}
                    setFormData={setFormData}
                    buttonText={currentEditedId !== null ? "Edit Address" : "Add New Address"}
                    onSubmit={handleManageAddress}
                    isBtnDisabled={!isFormValid()}
                />
            </CardContent>
        </Card>
    );
};

export default Address;