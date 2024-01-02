import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_PROD } from "../utils/queries";
import Card from "@mui/material/Card";
import ProductDetailHeader from "../components/ProductDetailComponents/ProductDetailHeader";
import ProductDetailImage from "../components/ProductDetailComponents/ProductDetailImage";
import ProductDetailDescription from "../components/ProductDetailComponents/ProductDetailDescription";
import CartButtons from "../components/Buttons";
import Grid from "@mui/system/Unstable_Grid/Grid";
import Typography from "@mui/material/Typography";
// future development
// import ImageUploadForm from "../components/ImageUploadForm";

export default function Detail() {
  const { id } = useParams();

  // State to force a re-render if needed
  const [forceRerender, setForceRerender] = useState(false);

  // Function to handle successful image uploads
  function handleUploadSuccess(productId) {
    // Set the state to force a re-render
    setForceRerender(!forceRerender);
  }

  // Query to fetch product data
  const { loading, error, data, refetch } = useQuery(QUERY_SINGLE_PROD, {
    variables: { id },
  });

  if (loading) {
    // Initial loading state
    return <p>Loading...</p>;
  }

  if (error) {
    console.log("Error fetching product", error);
    return <p>Error: {error.message}</p>;
  }

  const product = data ? data.product : null;

  console.log(product);

  if (!product) {
    return <p>Product not found</p>; // Handle the case when the product is not available
  }

  return (
    <React.Fragment>
      <ProductDetailHeader name={product.name} />
      <ProductDetailImage images={product.images} />
      <ProductDetailDescription description={product.description} />
      {/* For future development w/ admin routes */}

      {/* <ImageUploadForm
                productId={product._id}
                onUploadSuccess={() => {
                  // Call the refetch function to fetch the updated data
                  refetch();
                  // Call the handleUploadSuccess function
                  handleUploadSuccess(product._id);
                }}
              /> */}
      {product.quantity > 0 ? (
        <CartButtons
          _id={product._id}
          name={product.name}
          images={product.images}
          price={product.price}
          quantity={product.quantity}
          description={product.description}
        />
      ) : (
        <Typography
          sx={{
            textAlign: "center",
            backgroundColor: "#666666",
            color: "white",
          }}
        >
          <h3>Product Unavailable</h3>
        </Typography>
      )}
    </React.Fragment>
  );
}
