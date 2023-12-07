import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import GlobalStyles from "@mui/material/GlobalStyles";
import CssBaseline from "@mui/material/CssBaseline";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../../utils/queries";
import { useStoreContext } from "../../utils/GlobalState";
import SingleProduct from "../SingleProd";
import ContactCard from "../ContactCard";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";

const defaultTheme = createTheme();

export default function Pricing() {
  const [state, dispatch] = useStoreContext();
  const { currentCategory } = state;
  const { id } = useParams();

  const { loading, error, data } = useQuery(QUERY_PRODUCTS, {
    variables: { categoryId: id },
  });

  
  if (loading) {
    // Initial loading state
    return <p>Loading...</p>;
  }

  if (error) {
    console.log("Error fetching product", error);
    return <p>Error: {error.message}</p>;
  }

  console.log(data.products)

  const products = data.products;

  if (currentCategory === 'commissions' || products.length <= 0) {
    return (
      <ThemeProvider theme={defaultTheme}>
        <Typography sx={{ textAlign: "center" }}>
          <Card>
            <CardHeader
              title="Commissions"
              subheader={
                <div>
                  Have a specific idea that you would like to have made? You've
                  found the right place! Please include as many details about
                  the piece you are envisioning in your message.
                  <br />
                  Prices and wait times on commission pieces vary depending on
                  size, subject, and material.
                </div>
              }
              titleTypographyProps={{ align: "center" }}
              subheaderTypographyProps={{
                align: "center",
              }}
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? theme.palette.grey[200]
                    : theme.palette.grey[700],
                mb: -3,
              }}
            />
            <CardContent sx={{ padding: 0 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <ContactCard />
              </Box>
            </CardContent>
          </Card>
        </Typography>
      </ThemeProvider>
    );
  } else {
    return (
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles
          styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
        />
        <CssBaseline />

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            borderColor: "divider",
            margin: "1",
          }}
        >
          <Typography>
            <h1>
              {products[0].categoryID.categoryName}
            </h1>
          </Typography>
        </Box>

        {products.map((product) => (
          <Link key={product._id}
          to={`/product/${product._id}`}>
                    <SingleProduct
            _id={product._id}
            name={product.name}
            image={product.image}
            price={product.price}
            quantity={product.quantity}
            description={product.description}
          />
          </Link>
        ))}
      </ThemeProvider>
    );
  }
}
