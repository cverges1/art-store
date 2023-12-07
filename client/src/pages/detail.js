import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_PROD } from "../utils/queries";
import SingleProduct from "../components/SingleProd";

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
    <div key={product._id}>
    <SingleProduct
    _id={product._id}
    name={product.name}
    image={product.image}
    price={product.price}
    quantity={product.quantity}
    description={product.description}
  /> 
    </div>
 );
}
