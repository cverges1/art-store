import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { PRODUCTS_BY_CATEGORY } from "../../utils/queries";

export default function ProductCard() {
  const { loading, error, data } = useQuery(PRODUCTS_BY_CATEGORY);

  if (loading) {
    // Initial loading state
    return <p>Loading...</p>;
  }

  if (error) {
    console.log("Error fetching categories", error);
    return <p>Error: {error.message}</p>;
  }

  const products = data.products;

  console.log(data.products);

  return (
    <div>
      {products.map((product) => (
        <div>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {product.image} image
            </Typography>
            <Typography variant="h5" component="div"></Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {product.name}
            </Typography>
            <Typography variant="body2">
              ${product.price}
              <br />
            </Typography>
          </CardContent>
          <Link to={`/category/${product._id}`}>
                <div>
                    <p>View Details</p>
                </div>
            </Link>
        </Card>
        </div>
      ))}
    </div>
  );
}
