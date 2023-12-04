import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import AppBar from '@mui/material/AppBar';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
// import StarIcon from '@mui/icons-material/StarBorder';
// import Toolbar from '@mui/material/Toolbar';
import Typography from "@mui/material/Typography";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";

import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../../utils/queries";

const defaultTheme = createTheme();

export default function Pricing() {
  const { id: categoryID } = useParams();

  const { loading, error, data } = useQuery(QUERY_PRODUCTS, {
    variables: { categoryId: categoryID },
    fetchPolicy: "network-only",
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

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />

      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {products.map((product) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={product._id}
              xs={12}
              sm={product.title === "Enterprise" ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={product.name}
                  subheader={product.description}
                  titleTypographyProps={{ align: "center" }}
                  subheaderTypographyProps={{
                    align: "center",
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "baseline",
                      mb: 2,
                    }}
                  >
                    <img src={product.image} alt="" />
                  </Box>
                </CardContent>
                <Typography
                  sx={{
                    textAlign: "center",
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                >
                  $ {product.price}
                </Typography>
                <CardActions>
                  <Button fullWidth variant="contained">
                    ADD TO CART{" "}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
