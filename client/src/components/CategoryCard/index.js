import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { QUERY_CATEGORIES } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { Link } from 'react-router-dom';

export default function CategorySection() {
  // Fetch products using GraphQL query
  const { loading, error, data } = useQuery(QUERY_CATEGORIES);

  if (loading) {
    // Initial loading state
    return <p>Loading...</p>;
  }

  if (error) {
    console.log("Error fetching categories", error);
    return <p>Error: {error.message}</p>;
  }

  const categories = data.categories;

  return (
    <div style={{ textAlign: 'center' }}>
      {categories.map((category) => (
        <Link key={category._id} to={`/category/${category._id}`} style={{ textDecoration: 'none', display: 'inline-block', width: '75vw', margin: '0 auto' }}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                src={`/images/${category.categoryImage}`}
                alt="category image"
              />
              <CardContent>
                <Typography
                  variant="h5"
                  align="center"
                  color="text.secondary"
                  component="p"
                >
                  {category.categoryName}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
      ))}
    </div>
  );
}
