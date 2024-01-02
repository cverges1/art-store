import React from "react";
import Typography from "@mui/material/Typography";

export default function ProductDetailDescription(item) {
  return (
    <React.Fragment>
      <Typography
        variant="title"
        color="text.secondary"
        component="h4"
        textAlign={"center"}
        sx={{
          fontSize: {
            xs: "18px",
            sm: "22px",
            md: "30px",
            lg: "34px",
            xl: "40px",
          }
        }}
      >
        DETAILS:
      </Typography>
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
          }
        }}
      >
        {item.description}
      </Typography>
    </React.Fragment>
  );
}
