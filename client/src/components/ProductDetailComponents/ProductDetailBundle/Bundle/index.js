import React from "react";
import Typography from "@mui/material/Typography";
import ProductDetailHeader from "../../ProductDetailHeader";
import ProductDetailDescription from "../ProductDetailDescription";
import ProductDetailPrice from "../ProductDetailPrice";
import ProductDetailQuantity from "../ProductDetailQuantity";
import CartButtons from "../../../Buttons";
import { Card } from "@mui/material";

export default function Bundle(item) {
  return (
    <Card
      sx={{
        backgroundColor: "#eeeeee",
      }}
    >
      <ProductDetailDescription description={item.description} />

      <ProductDetailPrice price={item.price} />
      <ProductDetailQuantity quantity={item.quantity} />
      {item.quantity > 0 ? (
        <CartButtons
          _id={item._id}
          name={item.name}
          images={item.images}
          price={item.price}
          quantity={item.quantity}
          description={item.description}
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
    </Card>
  );
}
