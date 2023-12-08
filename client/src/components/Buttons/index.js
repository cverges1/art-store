import React, { useState } from "react";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { useStoreContext } from "../../utils/GlobalState";
import { idbPromise } from "../../utils/helpers";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";

export default function CartButtons(item) {
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
    )
}