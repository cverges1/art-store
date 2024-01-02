import React from "react";
import Typography from "@mui/material/Typography";
import { pluralize } from "../../../../utils/helpers";

export default function ProductDetailQuantity(item) {

    return (
        <Typography
        variant="subtitle"
        color="text.secondary"
        component="div"
        textAlign={"center"}
        sx={{
          fontSize: {
            xs: "16px",
            sm: "20px",
            md: "26px",
            lg: "26px",
            xl: "28px",
          },
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[700],
        }}
      >
        {item.quantity} {pluralize("item", item.quantity)} in stock
      </Typography>
    )
}