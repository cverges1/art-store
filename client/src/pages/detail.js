import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_PROD } from "../utils/queries";
import Card from "@mui/material/Card";
import SingleProduct from "../components/SingleProd";
import CartButtons from "../components/Buttons";
import { useStoreContext } from "../utils/GlobalState";
export default function Detail() {
  const [state, dispatch] = useStoreContext();
  const { currentProduct } = state;

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

  console.log("product",product)

  return (
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
  );
}
