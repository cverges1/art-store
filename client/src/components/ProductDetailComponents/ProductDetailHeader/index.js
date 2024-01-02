import React from "react";
import Typography from "@mui/material/Typography";
import { CardHeader } from "@mui/material";

export default function ProductDetailHeader(item) {

    return (
        <CardHeader
        key={item._id}
        title={
          <Typography variant="h4" align="center">
            {item.name}
          </Typography>
        }
        titleTypographyProps={{ align: "center" }}
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[700],
        }}
      />
    )
}