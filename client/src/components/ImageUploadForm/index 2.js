import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { SINGLE_UPLOAD } from "../../utils/mutations";

const ImageUploadForm = ({ productId, categoryId }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [singleUpload] = useMutation(SINGLE_UPLOAD);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      console.log("Selected file:", selectedFile);

      const { data } = await singleUpload({
        variables: {
          file: selectedFile,
          productID: productId,
          categoryID: categoryId,
        },
      });

      console.log("Upload response:", data.singleUpload);
    } catch (error) {
      // Handle error (e.g., show error message)
      console.error("Upload failed:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!selectedFile}>
        Upload Image
      </button>
    </div>
  );
};

export default ImageUploadForm;