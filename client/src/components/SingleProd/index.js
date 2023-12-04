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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card sx={{ width: '50vw' }}>
        <CardMedia
          component="img"
          alt={`${product.name}`}
          src={`/images/${product.image}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${product.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button fullWidth variant="contained">
            ADD TO CART
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
