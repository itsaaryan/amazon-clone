import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth, db } from "./firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [repass, setrepass] = useState("");

  const history = useHistory();
  const signUp = (e) => {
    e.preventDefault();
    if (password !== repass) {
      toast.error("Passwords did not match", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
      });
      setpassword("");
      setrepass("");
      return;
    }
    if (!name || !email || !password) {
      toast.warn("Please enter all the fields", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth.user.uid);
        if (auth.user.uid) {
          const id = auth.user.uid;
          console.log(id);
          db.collection("users").doc(id).set({ name, email });
          history.replace("/");
        }
      })
      .catch((err) => alert(err.message));
  };
  return (
    <div className="login">
      <Link to="/">
        <img
          className="login-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
        />
      </Link>

      <div className="login-container">
        <h1>Create Account</h1>
        <form>
          <h5>Name</h5>
          <input
            type="text"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
          <h5>E-mail</h5>

          <input
            type="text"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            placeholder="atleat 6 characters"
          />

          <h5>Re-enter Password</h5>
          <input
            type="password"
            value={repass}
            onChange={(e) => setrepass(e.target.value)}
            placeholder="atleat 6 characters"
          />

          <button className="login-signin-btn" onClick={signUp} type="submit">
            Sign-Up
          </button>

          <p style={{ marginTop: "15px", fontSize: "12px" }}>
            By continuing, you agree to Amazon's-Clone Conditions of Use and
            Privacy Notice.
          </p>
          <button
            className="login-register-btn"
            onClick={() => history.push("/login")}
          >
            Login
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

export default Register;
