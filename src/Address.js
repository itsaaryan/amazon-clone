import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import { db } from "./firebase";
import "react-phone-input-2/lib/style.css";
import "./Address.css";
import { useStateValue } from "./StateProvider";
import { toast, ToastContainer } from "react-toastify";

function Address() {
  const [address, setaddress] = useState({
    city: "",
    country: "",
    line1: "",
    postal_code: "",
    state: "",
  });
  const [phone, setphone] = useState(null);

  const [{ user }, dispatch] = useStateValue();

  const history = useHistory();

  const addAddress = (e) => {
    e.preventDefault();
    if (
      !address.city ||
      !address.country ||
      !address.line1 ||
      !address.postal_code ||
      !address.state ||
      !phone
    ) {
      toast.error("Please enter all the fields", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
      });
      return;
    }
    db.collection("users")
      .doc(user?.uid)
      .update({ address: address, phone })
      .then(() => {
        dispatch({ type: "SET_USER", payload: { ...user, address, phone } });
        history.push("/payment");
      });
  };

  return (
    <div className="address">
      <Link to="/">
        <img
          className="address-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
        />
      </Link>
      <div className="address-container">
        <h1>Delivery Address</h1>
        <form>
          <h5>Address Line 1</h5>
          <input
            type="text"
            value={address.line1}
            onChange={(e) => setaddress({ ...address, line1: e.target.value })}
          />
          <h5>Postal Code</h5>
          <input
            type="text"
            value={address.postal_code}
            onChange={(e) =>
              setaddress({ ...address, postal_code: e.target.value })
            }
          />
          <h5>City</h5>
          <input
            type="text"
            value={address.city}
            onChange={(e) => setaddress({ ...address, city: e.target.value })}
          />
          <h5>State</h5>
          <input
            type="text"
            value={address.state}
            onChange={(e) => setaddress({ ...address, state: e.target.value })}
          />
          <h5>Country</h5>
          <input
            type="text"
            value={address.country}
            onChange={(e) =>
              setaddress({ ...address, country: e.target.value })
            }
          />
          <h5>Phone</h5>
          <PhoneInput
            country={"us"}
            value={phone}
            onChange={(val, c) => {
              setphone(val);
            }}
          />
          <button className="address-save-btn" onClick={addAddress}>
            Add Address
          </button>
        </form>
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

export default Address;
