import React from "react";
import { Card } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";

export default function ProductDetailImage(item) {
  return (
    <Card
      sx={{
        backgroundColor: "#eeeeee"
      }}
    >
      <CardMedia
        component="img"
        alt={item.name}
        src={`/images/ProductImages/${item.images}`}
      />
    </Card>
  );
}
