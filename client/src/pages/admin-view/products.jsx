/* eslint-disable react/jsx-key */
import ProductImageUpload from "@/components/admin-view/image-upload";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { addProductFormElement } from "@/config";
import { addNewProduct, deleteProduct, editProduct, fetchAllProduct } from "@/store/admin/prducts-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminProductTile from "@/components/admin-view/product-tile";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  price: "",
  salePrice: "",
  totalStock: "",
}

function AdminProducts() {

  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { productList } = useSelector(state => state.adminProducts)
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    currentEditedId !== null ?
      dispatch(editProduct({
        id: currentEditedId, formData
      })).then((data) => {
        console.log(data, "edit");

        if(data?.payload?.success) {
          dispatch(fetchAllProduct());
          setFormData(initialFormData)
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
        }

      })
      : dispatch(addNewProduct({
        ...formData,
        image: uploadedImageUrl
      })).then((data) => {
        console.log(data);
        if (data?.payload?.success) {
          dispatch(fetchAllProduct())
          setOpenCreateProductsDialog(false)
          setImageFile(null);
          setFormData(initialFormData)
          toast({
            title: "Product add succeddfully"
          });
        }
      });
  }


  function handleDelete(getcurrentProductId){

    dispatch(deleteProduct(getcurrentProductId)).then(data => {
      if(data?.payload?.success){
        dispatch(fetchAllProduct());
      }
    })
    
  }

  function isFormValid(){
    return Object.keys(formData).map((key) => formData[key] !== "").every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllProduct());
  }, [dispatch]);


  console.log(productList, uploadedImageUrl, "productList");



  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end" >
        <Button onClick={() => setOpenCreateProductsDialog(true)} >Add New Products</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">

        {productList && productList.length > 0
          ? productList.map((productItem) => (
            <AdminProductTile
              setFormData={setFormData}
              setOpenCreateProductsDialog={setOpenCreateProductsDialog}
              setCurrentEditedId={setCurrentEditedId}
              product={productItem}
              handleDelete={handleDelete}
            />
          ))
          : null}

      </div>
      <Sheet open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null)
          setFormData(initialFormData)
        }}>
        <SheetContent side='right' className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {
                currentEditedId !== null ?
                  "Edit Product" : "Add New Product"
              }
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              formControls={addProductFormElement}
              isBtnDisabled={!isFormValid(false)}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProducts;