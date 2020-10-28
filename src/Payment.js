import React, { useEffect, useState } from "react";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./StateProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Payment.css";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import axios from "./axios";
import { db } from "./firebase";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [error, seterror] = useState(null);
  const [disabled, setdisabled] = useState(true);
  const [successed, setsuccessed] = useState(false);
  const [processing, setprocessing] = useState("");
  const [clientSecret, setclientSecret] = useState(true);
  const history = useHistory();

  const stripe = useStripe();
  const elements = useElements();

  const getBasketTotal = () => {
    var sum = 0;
    for (var i = 0; i < basket?.length; i++) {
      sum += basket[i].price;
    }
    return sum;
  };

  useEffect(() => {
    const dataToJSON = JSON.stringify({
      address: user?.address,
      name: user?.name,
    });
    const getClientSecret = async () => {
      const responce = await axios.post(
        `/payments/create?total=${Math.floor(getBasketTotal() * 100)}`,
        dataToJSON,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      setclientSecret(responce.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);

  console.log("secret======>", clientSecret);

  const handleSubmit = async (e) => {
    console.log("called");
    e.preventDefault();
    setprocessing(true);
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then((result) => {
        console.log("result=>>", result);
        if (result.error) {
          toast.error(result.error.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
          });
          seterror(result.error.message);
          setprocessing(false);
        } else {
          db.collection("users")
            .doc(user?.uid)
            .collection("orders")
            .doc(result.paymentIntent.id)
            .set({
              basket: basket,
              amount: result.paymentIntent.amount,
              created: result.paymentIntent.created,
            });
          setsuccessed(true);
          seterror(null);
          setprocessing(false);
          dispatch({ type: "EMPTY_BASKET" });
          history.replace("/orders");
        }
      });
  };

  const handleChange = (e) => {
    setdisabled(e.empty);
    seterror(e.error ? e.error.message : "");
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
            <p>{user?.address.line1}</p>
            <p>
              {user?.address.city},{user?.address.postal_code}
            </p>
            <p>{user?.address.state}</p>
            <p>{user?.address.country}</p>
            <strong>Contact Info: +{user?.phone}</strong>
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
                <button
                  type="submit"
                  disabled={processing || disabled || successed}
                >
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default Payment;
