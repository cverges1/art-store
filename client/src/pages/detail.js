import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_PROD } from "../utils/queries";
import Card from "@mui/material/Card";
import SingleProduct from "../components/SingleProd";
import CartButtons from "../components/Buttons";
import Grid from "@mui/system/Unstable_Grid/Grid";

export default function Detail() {

  const { id } = useParams();

  const { loading, error, data } = useQuery(QUERY_SINGLE_PROD, {
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
          <SingleProduct
            _id={product._id}
            name={product.name}
            image={product.image}
            price={product.price}
            quantity={product.quantity}
            description={product.description}
          />
          <CartButtons
            _id={product._id}
            name={product.name}
            image={product.image}
            price={product.price}
            quantity={product.quantity}
            description={product.description}
          />
        </React.Fragment>
      </Card>
    </div>
    </Grid>
    </Grid>
  );
}
