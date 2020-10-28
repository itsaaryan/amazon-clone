import React, { useEffect } from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";
import { useHistory } from "react-router-dom";

function Subtotal() {
  const [state, dispatch] = useStateValue();
  const history = useHistory();
  console.log(state.user?.address);
  const getBasketTotal = () => {
    var sum = 0;
    for (var i = 0; i < state.basket?.length; i++) {
      sum += state.basket[i].price;
    }
    return sum;
  };
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({state.basket?.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal-gift">
              <input type="checkbox" />
              This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal()}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />

      <button
        onClick={() =>
          state.user
            ? state.user.address
              ? history.push("/payment")
              : history.push("/address")
            : history.push("/login")
        }
      >
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Subtotal;
