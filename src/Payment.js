import React, { useState } from "react";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./StateProvider";
import "./Payment.css";
import { Link } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [error, seterror] = useState(null);
  const [disabled, setdisabled] = useState(true);
  const [successed, setsuccessed] = useState(false);
  const [processing, setprocessing] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = () => {};

  const handleChange = (e) => {
    setdisabled(e.empty);
    seterror(e.error ? e.error.message : "");
  };

  const getBasketTotal = () => {
    var sum = 0;
    for (var i = 0; i < basket?.length; i++) {
      sum += basket[i].price;
    }
    return sum;
  };

  return (
    <div className="payment">
      <div className="payment-container">
        <h1>Checkout {<Link to="/checkout">({basket?.length} items)</Link>}</h1>
        <div className="payment-section">
          <div className="payment-title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment-address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angles,CA</p>
          </div>
        </div>
        <div className="payment-section">
          <div className="payment-title">
            <h3>
              Review Items <strong>&</strong> delivery
            </h3>
          </div>
          <div className="payment-items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        <div className="payment-section">
          <div className="payment-title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment-details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment-pricecontainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal()}
                  displayType={"text"}
                  decimalScale={2}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || successed}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
