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
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51HgDjnFi7AfvlbUvKWI44Yj8XZbXq6KG5Ryge6j5tJDRuzbzYlTdWBrtYhT1apvvGDt0EZN83BdUC998LOzKJl9T00oTeCZoTe"
);

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
        <Switch>
          <Route exact path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Header />
            <Register />
          </Route>
          <Route path="/checkout" exact>
            <Header />
            <Checkout />
          </Route>
          <Route path="/" exact>
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
