import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_PROD } from "../../utils/queries";
import { Box } from "@mui/system";
import { CardHeader } from "@mui/material";

export default function SingleProduct() {
  const { id } = useParams();
  console.log(id);

  const { loading, error, data } = useQuery(QUERY_SINGLE_PROD, {
    variables: { id },
  });

  if (loading) {
    // Initial loading state
    return <p>Loading...</p>;
  }

  if (error) {
    console.log("Error fetching product", error);
    return <p>Error: {error.message}</p>;
  }

  const product = data.product;

  console.log(product);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "75vw",
          maxHeight: "75vh",
        }}
      >
        <CardHeader
          title={
            <Typography variant="h4" align="center">
              {product.name}
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
          alt={`${product.name}`}
          src={`/images/${product.image}`}
          sx={{ minWidth: "75vw", maxHeight: "50vh" }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ flex: "1 0 auto" }}>
            <CardContent>
              <Typography
                variant="subtitle"
                color="text.secondary"
                component="div"
                textAlign={"center"}
                sx={{ mb: 1 }}
              >
                {product.description}
              </Typography>
              <Typography
                variant="subtitle"
                color="text.secondary"
                component="div"
                textAlign={"center"}
              >
                ${product.price}
              </Typography>
            </CardContent>
          </Box>
          <CardActions>
            <Button fullWidth variant="contained">
              ADD TO CART
            </Button>
          </CardActions>
        </Box>
      </Card>
    </div>
  );
}
