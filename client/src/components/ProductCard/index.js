import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { PRODUCTS_BY_CATEGORY } from "../../utils/queries";

export default function ProductCard({ categoryID }) {
  const { id } = useParams();

  const { loading, error, data } = useQuery(PRODUCTS_BY_CATEGORY, {
    variables: { categoryID: id, },
  });

  if (loading) {
    // Initial loading state
    return <p>Loading...</p>;
  }

  if (error) {
    console.log("Error fetching categories", error);
    return <p>Error: {error.message}</p>;
  }

  const products = data.products;

  console.log(products);
  console.log(id)


  return (
    <div>
      {products.map((product) => (
        <div key={product._id}>
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
          <Link to={`/product/${product._id}`}>
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
