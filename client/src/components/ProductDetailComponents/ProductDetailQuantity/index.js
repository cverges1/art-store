import React from "react";
import Typography from "@mui/material/Typography";
import { pluralize } from "../../../utils/helpers";

export default function ProductDetailQuantity(item) {

    return (
        <Typography
        variant="subtitle"
        color="text.secondary"
        component="div"
        textAlign={"center"}
      >
        {item.quantity} {pluralize("item", item.quantity)} in stock
      </Typography>
    )
}