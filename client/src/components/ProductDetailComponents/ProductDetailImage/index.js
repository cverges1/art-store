import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { CardHeader } from "@mui/material";
import { pluralize } from "../../../utils/helpers";

export default function ProductDetailImage(item) {

    return (
        <CardMedia
        component="img"
        alt={item.description}
        sx={{ maxHeight: 800}}
        src={`/images/ProductImages/${item.images}`}
      />
    )
}