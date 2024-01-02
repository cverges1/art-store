import React from "react";
import Typography from "@mui/material/Typography";


export default function ProductDetailDescription(item) {
  const { description } = item;

  return (
    <Typography
    variant="subtitle"
    color="text.secondary"
    component="div"
    textAlign={"center"}
  >
    {description}
  </Typography>
  )
}