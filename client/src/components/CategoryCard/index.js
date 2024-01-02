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

  console.log(categories)
  return (
    <div style={{ textAlign: 'center' }}>
      {categories.map((category) => (
        <Link key={category._id} to={`/category/${category._id}`} style={{ textDecoration: 'none', display: 'inline-block', width: '75vw', position: 'relative' }}>
          <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardActionArea>
            <CardMedia
                component="img"
                height="300"
                style={{ objectFit: 'cover', marginTop: '10px' }} // Adjust marginTop to lower the image
                src={`/images/CategoryImages/${category.categoryImage}`}
                alt={category.categoryName}
              />
              <CardContent style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white' }}>
                <Typography
                  variant="h5"
                  align="center"
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