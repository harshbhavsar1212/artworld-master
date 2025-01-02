/* eslint-disable react/prop-types */
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";




function AddressCard({ 
  addressInfo, 
  handleDeleteAddress, 
  handleEditAddress, 
  setCurrentSelectedAddress,
  selectedId,
}) {

  console.log(selectedId, addressInfo?._id );
  

  return (
    <Card onClick={
      setCurrentSelectedAddress
        ? () => setCurrentSelectedAddress(addressInfo)
        : null
    }
    className={`cursor-pointer border-red-700 ${selectedId?._id === addressInfo?._id ? "border-red-900 border-[4px]" : "border-black" }`}
    >
      <CardContent className={`${selectedId === addressInfo?._id ? "border-black" : ""}grid gap-4 p-4`}>
        <Label>Full Name: {addressInfo?.fullName}</Label>
        <Label>Address : {addressInfo?.address}</Label>
        <Label>City : {addressInfo?.city}</Label>
        <Label>State : {addressInfo?.state}</Label>
        <Label>Pin Code : {addressInfo?.pincode}</Label>
        <Label>Phone : {addressInfo?.phone}</Label>
        <Label>Notes : {addressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className="flex justify-between p-3">
        <Button onClick={() => handleEditAddress(addressInfo)} >Edit</Button>
        <Button onClick={() => handleDeleteAddress(addressInfo)}>Delete</Button>
      </CardFooter>
    </Card>
  );
};

export default AddressCard;