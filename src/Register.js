import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";

function Register() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const history = useHistory();
  const signUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth);
        if (auth) {
          history.push("/");
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
    </div>
  );
}

export default Register;
