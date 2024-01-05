import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_PROD } from "../utils/queries";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import ProductDetailHeader from "../components/ProductDetailComponents/ProductDetailHeader";
import ProductDetailImage from "../components/ProductDetailComponents/ProductDetailImage";
import Bundle from "../components/ProductDetailComponents/ProductDetailBundle/Bundle";

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
    <Card sx={{ backgroundColor: "#eeeeee" }}>
      <ProductDetailHeader _id={product._id} name={product.name} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={8}>
          <ProductDetailImage
            images={product.images}
            description={product.description}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={4}>
          <Bundle
            _id={product._id}
            name={product.name}
            description={product.description}
            quantity={product.quantity}
            price={product.price}
            images={product.images}
          />
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
       </Grid>
      </Grid>
    </Card>
  );
}
