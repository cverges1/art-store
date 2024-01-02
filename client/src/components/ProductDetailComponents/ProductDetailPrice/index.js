import React from "react";
import Typography from "@mui/material/Typography";


export default function ProductDetailPrice(item) {

    return (
    <React.Fragment>
        <Typography
        variant="subtitle"
        color="text.secondary"
        component="div"
        textAlign={"center"}>
            Price: 
        </Typography>
        <Typography
        component="div"
        textAlign={"center"}
      >
     ${item.price}
      </Typography>
    </React.Fragment>
      )
}