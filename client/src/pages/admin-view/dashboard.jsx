/* eslint-disable react/jsx-key */
import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImages, getFeatureImages } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  console.log(uploadedImageUrl);

  function handleUploadFeatureImage() {
    dispatch(addFeatureImages(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      }

    })
  }

  useEffect(() => {
    dispatch(getFeatureImages())
  }, [dispatch])

  console.log(featureImageList, "hello");


  return (
    <div>
      {/* <h1>Uplaod Features Images</h1> */}
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
      // isEditMode={currentEditedId !== null}
      />
      <Button className="mt-3" onClick={handleUploadFeatureImage}>Upload</Button>
      <div className="flex flex-col gap-4 mt-5">
        {
          featureImageList && featureImageList.length > 0 ?
            featureImageList.map((featureImageItem) =>
              <div className="relative">
                <img
                  src={featureImageItem.image}
                  className="w-full h-[300px] object-cover rounded-t-lg"
                />
              </div>
            ) : null
        }
      </div>
    </div>
  );
};

export default AdminDashboard;