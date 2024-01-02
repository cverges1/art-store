import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { CardHeader } from "@mui/material";
import { pluralize } from "../../../utils/helpers";

export default function ProductDetailImage(item) {
    const { images, name, _id, price, quantity, description } = item;

    return (
        <CardMedia
        component="img"
        alt={{ name }}
        sx={{ maxHeight: 800}}
        src={`/images/ProductImages/${images}`}
      />
    )
}