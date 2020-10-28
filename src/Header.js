import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import { IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

function Header() {
  const [state, dispatch] = useStateValue();
  const handleAuth = () => {
    if (state.user) {
      auth.signOut();
    }
  };
  return (
    <div className="header">
      <Link to="/">
        <img
          className="header-logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
        ></img>
      </Link>
      <div className="header-search">
        <input className="header-searchInput" type="text" />
        <SearchIcon className="header-searchIcon" />
      </div>
      <div className="header-nav">
        <Link to={!state.user && "/login"}>
          <div className="header-option" onClick={handleAuth}>
            <span className="header-optionLineOne">
              Hello, {state.user ? state.user.name : "Guest"}
            </span>
            <span className="header-optionLineTwo">
              {state.user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>
        {state.user && (
          <Link to="/orders">
            <div className="header-option">
              <span className="header-optionLineOne">Returns</span>
              <span className="header-optionLineTwo">& Orders</span>
            </div>
          </Link>
        )}

        <div className="header-option">
          <span className="header-optionLineOne">Your</span>
          <span className="header-optionLineTwo">Prime</span>
        </div>

        <Link to="/checkout" className="header-optionBasket">
          <IconButton aria-label="cart" color="inherit">
            <Badge badgeContent={state.basket?.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Link>
      </div>
    </div>
  );
}

export default Header;
