import React from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const CartItem = ({ item }) => {
  const [, dispatch] = useStoreContext();

  const removeFromCart = (item) => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id,
    });
    idbPromise("cart", "delete", { ...item });
  };

  const onChange = (e) => {
    const newQuantity = parseInt(e.target.value);
  
    if (newQuantity >= 0 && newQuantity <= item.quantity) {
      if (newQuantity === 0) {
        dispatch({
          type: REMOVE_FROM_CART,
          _id: item._id,
        });
        idbPromise("cart", "delete", { ...item });
      } else {
        dispatch({
          type: UPDATE_CART_QUANTITY,
          _id: item._id,
          purchaseQuantity: newQuantity,
        });
        idbPromise("cart", "put", {
          ...item,
          purchaseQuantity: newQuantity,
        });
      }
    } else {
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
            value={item.purchaseQuantity}
            onChange={onChange}
            max={item.quantity}
            min={1}
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
