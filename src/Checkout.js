import React from "react";
import "./Checkout.css";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./StateProvider";
import Subtotal from "./Subtotal";

function Checkout() {
  const [state, dispatch] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout-left">
        <img
          className="checkout-ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />
        <h2 className="checkout-title">Your shopping Basket</h2>
        {state.basket.map((item) => (
          <CheckoutProduct
            id={item.id}
            title={item.title}
            image={item.image}
            rating={item.rating}
            price={item.price}
          />
        ))}
      </div>
      <div className="checkout-right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
