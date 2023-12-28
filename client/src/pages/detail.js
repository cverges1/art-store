import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_PROD } from "../utils/queries";
import Card from "@mui/material/Card";
import SingleProduct from "../components/SingleProd";
import CartButtons from "../components/Buttons";
import Grid from "@mui/system/Unstable_Grid/Grid";
import Typography from "@mui/material/Typography";
import ImageUploadForm from "../components/ImageUploadForm";

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

  console.log(product)

  if (!product) {
    return <p>Product not found</p>; // Handle the case when the product is not available
  }

  return (
    <Grid container spacing={2} justifyContent="center" margin={4}>
      <Grid key={product._id} item xs={12} sm={9} md={6} lg={5}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              mt: -12,
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[200]
                  : theme.palette.grey[700],
            }}
          >
            <React.Fragment>
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
              <SingleProduct
                _id={product._id}
                name={product.name}
                images={product.images}
                price={product.price}
                quantity={product.quantity}
                description={product.description}
              />
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
          </Card>
        </div>
      </Grid>
    </Grid>
  );
}
