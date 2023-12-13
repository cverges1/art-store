import React from "react";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { CardHeader } from "@mui/material";
import { pluralize } from "../../utils/helpers";

export default function SingleProduct(item) {
  const { image, name, _id, price, quantity, description } = item;

  return (
    <>
      <CardHeader
      key={_id}
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
      <CardMedia
        component="img"
        alt={{name}}
        src={`/images/${image}`}
        sx={{ minWidth: "75vw", maxHeight: "50vh" }}
      />
      <Box>
        <CardContent         sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[700],
        }}>
          <Typography
            variant="subtitle"
            color="text.secondary"
            component="div"
            textAlign={"center"}
            sx={{ mb: 1 }}
          >
            {description}
          </Typography>
          <Typography
            variant="subtitle"
            color="text.secondary"
            component="div"
            textAlign={"center"}
          >
            ${price}
          </Typography>
          <Typography
            variant="subtitle"
            color="text.secondary"
            component="div"
            textAlign={"center"}
          >
            {quantity} {pluralize("item", quantity)} in stock
          </Typography>
        </CardContent>
      </Box>
    </>
  );
}
