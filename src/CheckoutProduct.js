import React from "react";
import "./CheckoutProduct.css";
import { useStateValue } from "./StateProvider";

function CheckoutProduct({ id, title, image, rating, price }) {
  const [state, dispatch] = useStateValue();
  const removeFromCart = () => {
    dispatch({ type: "REMOVE_FROM_BASKET", payload: id });
  };
  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct-image" src={image} />
      <div className="checkoutProduct-info">
        <p className="checkoutProduct-title">{title}</p>
        <p className="checkoutProduct-price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct-rating">
          {Array(rating)
            .fill()
            .map(() => (
              <p>⭐</p>
            ))}
        </div>
        <button onClick={removeFromCart}>Remove from Cart</button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
