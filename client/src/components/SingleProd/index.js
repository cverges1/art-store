import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { CardHeader } from "@mui/material";
import { idbPromise, pluralize } from "../../utils/helpers";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { useStoreContext } from "../../utils/GlobalState";

export default function SingleProduct(item) {
  const [state, dispatch] = useStoreContext();

  const {
    image,
    name,
    _id,
    price,
    quantity,
    description
  } = item;

  const { cart } = state;

  // State for managing the quantity
  const [number, setQuantity] = useState(1);

  // Event handler for increasing quantity
  const handleIncrease = () => {
    setQuantity(number + 1);
  };

  // Event handler for decreasing quantity
  const handleDecrease = () => {
    if (number > 1) {
      setQuantity(number - 1);
    }
  };

  console.log(item)
  
  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  }

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
          mt: -12,
        }}
      >
        <CardHeader
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
          alt={`${name}`}
          src={`/images/${image}`}
          sx={{ minWidth: "75vw", maxHeight: "50vh" }}
        />
        <Box>
          <CardContent>
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <CardActions>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                marginBottom: 2,
              }}
            >
              {quantity > 1 && (
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    marginTop: 1, // Add marginTop to separate from the quantity buttons
                  }}
                >
                  <Button
                    onClick={() => handleDecrease(_id)}
                    variant="contained"
                    sx={{ width: "47.5%" }}
                  >
                    -
                  </Button>
                  <Box
                    sx={{
                      padding: "8px",
                      marginX: "2px",
                      minWidth: "40px",
                      textAlign: "center",
                      border: "1px solid black",
                      borderRadius: "4px",
                    }}
                  >
                    <Typography>{number}</Typography>
                  </Box>
                  <Button
                    onClick={() => handleIncrease(_id)}
                    variant="contained"
                    sx={{ width: "47.5%" }}
                  >
                    +
                  </Button>
                </Box>
              )}
              <Box sx={{ width: "100%" }}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={addToCart}
                  sx={{ marginTop: 1 }} // Add marginTop to separate from the quantity buttons
                >
                  ADD TO CART
                </Button>
              </Box>
            </Box>
          </CardActions>
        </Box>
      </Card>
    </div>
  );
}