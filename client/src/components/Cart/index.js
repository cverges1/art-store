import React, { useEffect, useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import CartItem from "../CartItem";
import { useStoreContext } from "../../utils/GlobalState";
import {
  TOGGLE_CART,
  ADD_MULTIPLE_TO_CART,
  UPDATE_PRODUCTS,
} from "../../utils/actions";
import "./style.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

const stripePromise = loadStripe(
  "pk_test_51NiT64KX9mdrTXyFdXKmMXHGGQBHwmAYEAJvsJE6hqNa3cq6Edu6SlY0FMODhuABzA2dyl05cjOaM6IhgT43QTzf00OW2DDOfp"
);

const Cart = () => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
  const cartRef = useRef(null);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise("cart", "get");
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  const toggleCart = () => {
    dispatch({ type: TOGGLE_CART });
  };

  const handleClickOutside = (event) => {
    if (cartRef.current && !cartRef.current.contains(event.target)) {
      // Clicked outside the cart, close it
      toggleCart();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    const productIds = [];

    state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    getCheckout({
      variables: { products: productIds },
    })
      .then((response) => {
        if (response.success) {
          dispatch({ type: UPDATE_PRODUCTS });
        } else {
          console.error("Checkout failed:", response.message);
        }
      })
      .catch((error) => {
        console.error("Error during checkout:", error);
      });
  }

  if (!state.cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCart}>
        <ShoppingCartOutlinedIcon aria-label="trash"></ShoppingCartOutlinedIcon>
      </div>
    );
  }

  return (
    <div className="cart" ref={cartRef} style={{ zIndex: 9999 }}>
      <div className="close">
        <Button
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: "black",
            "&:hover": {
              backgroundColor: "white",
              color: "black",
            },
          }}
          onClick={toggleCart}
        >
          X
        </Button>
      </div>
      <Typography sx={{ margin: 5 }}>
        <h2>Shopping Cart</h2>
      </Typography>
      {state.cart.length ? (
        <div>
          {state.cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}

          <div
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              backgroundColor: "black",
            }}
          >
            <div
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "black",
              }}
            >
              <strong>Total: ${calculateTotal()}</strong>
            </div>
            <div>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 1,
                  backgroundColor: "black",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "black",
                  },
                }}
                onClick={submitCheckout}
              >
                CHECKOUT
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Typography>
          <h3>You haven't added anything to your cart yet!</h3>
        </Typography>
      )}
    </div>
  );
};

export default Cart;
