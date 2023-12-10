import React, { useState } from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const CartItem = ({ item }) => {
  const [, dispatch] = useStoreContext();
  const [prevQuantity, setPrevQuantity] = useState(item.purchaseQuantity);

  const removeFromCart = (item) => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id,
    });
    idbPromise("cart", "delete", { ...item });
  };

  const onChange = (e) => {
    const newQuantity = parseInt(e.target.value);

    if (e.target.value === "") {
      // Handle case where the input is empty
      setPrevQuantity("");
    } else if (newQuantity >= 0 && newQuantity <= item.quantity) {
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
      alert(
        `Please enter a valid quantity between 0 and ${item.quantity}`
      );
    }
  };

  return (
    <div className="flex-row">
      <div>
        <img src={`/images/${item.image}`} alt="" />
      </div>
      <div>
        <div>
          {item.name}, ${item.price}
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
