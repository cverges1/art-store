import React, { useState } from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useMutation } from '@apollo/client';
import { UPDATE_PRODUCT_QUANTITY } from '../../utils/mutations';

const CartItem = ({ item }) => {
  const [ dispatch] = useStoreContext();
  const [prevQuantity, setPrevQuantity] = useState(item.purchaseQuantity);

  const [updateProduct] = useMutation(UPDATE_PRODUCT_QUANTITY);

  const removeFromCart = async (item) => {
    try {
      // Use the purchaseQuantity for the correct quantity to add back to the inventory
      const removeFromCartQuantity = item.purchaseQuantity;
  
      // Call the updateProduct mutation before removing from cart
      await updateProduct({
        variables: {
          id: item._id,
          quantity: removeFromCartQuantity, // Pass the removed quantity to increase
        },
      });
  
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id,
      });
  
      idbPromise("cart", "delete", { ...item });
    } catch (error) {
      console.error("Error updating product quantity:", error);
    }
  };

  const onChange = async (e) => {
    const newQuantity = parseInt(e.target.value);
  
    if (e.target.value === "") {
      // Handle case where the input is empty
      setPrevQuantity("");
    } else if (newQuantity >= 0 && newQuantity <= item.quantity) {
      try {
        const quantityDifference = newQuantity - prevQuantity;
  
        // Check if the new quantity plus the initial quantity in the cart exceeds the available inventory quantity
        if (item.quantity - quantityDifference >= 0 && newQuantity >= 0) {
          // Call the updateProduct mutation before updating the cart quantity
          await updateProduct({
            variables: {
              id: item._id,
              quantity: -quantityDifference,
            },
          });
  
          dispatch({
            type: UPDATE_CART_QUANTITY,
            _id: item._id,
            purchaseQuantity: newQuantity,
          });
  
          idbPromise("cart", "put", {
            ...item,
            purchaseQuantity: newQuantity,
          });
  
          // Update prevQuantity whenever a valid quantity is set
          setPrevQuantity(newQuantity);
        } else {
          // Reset newQuantity to the previous valid quantity
          setPrevQuantity(item.purchaseQuantity);
          alert(`Not enough stock. Available quantity is ${item.quantity}`);
        }
      } catch (error) {
        console.error("Error updating product quantity:", error);
      }
    } else {
      // Reset newQuantity to the previous valid quantity
      setPrevQuantity(item.purchaseQuantity);
      alert(`Please enter a valid quantity between 0 and ${item.quantity}`);
    }
  };          
  

  return (
    <div className="flex-row">
      <div>
        <img src={`/images/ProductImages/${item.images}`} alt={`${item.description}`} />
      </div>
      <div>
        <div>
          {item.name} | ${item.price} 
        </div>
        <div>
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={prevQuantity}
            onChange={onChange}
            max={item.quantity}
            min={0}
          />
          <span
            role="img"
            aria-label="trash"
            onClick={() => removeFromCart(item)}
          >
            <DeleteOutlineOutlinedIcon />
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;