import React, { useState } from "react";
import axios from "axios";

const ImageUploadForm = ({ productId, onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      console.log("Selected file:", selectedFile);

      const formData = new FormData();
      formData.append("image", selectedFile);

      // Upload the file to the server
      const response = await axios.post(`/images/api/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
      });

      // Handle success (e.g., update UI, fetch updated product details)
      console.log("Upload success:", response.data);
      onUploadSuccess();
    } catch (error) {
      // Handle error (e.g., show error message)
      console.error("Upload failed:", error,);
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
