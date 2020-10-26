import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import Register from "./Register";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";

function App() {
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log(authUser);
      if (authUser) {
        dispatch({ type: "SET_USER", payload: authUser });
      } else {
        dispatch({ type: "SET_USER", payload: null });
      }
    });
    return () => {
      //
    };
  }, []);

  return (
    <Router>
      <div className="app">
        <Header />
        <Switch>
          <Route exact path="/payment">
            <Payment />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route path="/checkout" exact>
            <Checkout />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
