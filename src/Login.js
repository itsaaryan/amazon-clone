import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";
import "./Login.css";

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const history = useHistory();

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth);
        history.push("/");
      })
      .catch((err) => alert(err.message));
  };

  const register = (e) => {
    e.preventDefault();
    history.push("/register");
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
        <h1>Sign-In</h1>
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

          <button className="login-signin-btn" onClick={signIn} type="submit">
            Sign-In
          </button>

          <p style={{ marginTop: "15px", fontSize: "12px" }}>
            By continuing, you agree to Amazon's-Clone Conditions of Use and
            Privacy Notice.
          </p>
          <button className="login-register-btn" onClick={register}>
            Create your Amazon account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
