import React from "react";
import Typography from "@mui/material/Typography";

export default function ProductDetailPrice(item) {
  return (
    <React.Fragment>
      <Typography
        variant="subtitle"
        color="text.secondary"
        component="h4"
        textAlign={"center"}
        sx={{
          fontSize: {
            xs: "14px",
            sm: "18px",
            md: "14px",
            lg: "22px",
            xl: "26px",
          },
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[700],
        }}
      >
        Price:
      </Typography>
      <Typography
        variant="subtitle"
        color="text.secondary"
        component="h4"
        textAlign={"center"}
        sx={{
          fontSize: {
            xs: "14px",
            sm: "18px",
            md: "14px",
            lg: "22px",
            xl: "26px",
          },
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[700],
        }}
      >
        ${item.price}
      </Typography>
    </React.Fragment>
  );
}
