import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function Header() {
  const [{ basket }] = useStateValue();

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="logo"
        />
      </Link>

      <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>

      <div className="header__nav">
        <Link to="/loginpage" style={{ textDecoration: "none" }}>
          <div className="header__option">
            <span className="header__optionLineOne">User,</span>
            <span className="header__optionLineTwo">login</span>
          </div>
        </Link>

        <Link to="/User" style={{ textDecoration: "none" }}>
          <div className="header__option">
            <span className="header__optionLineOne">Hello,</span>
            <span className="header__optionLineTwo">User</span>
          </div>
        </Link>

        <Link to="/cart" style={{ textDecoration: "none" }}>
          <div className="header__optionBasket">
            <ShoppingBasketIcon />
            <span className="header__optionLineTwo header__basketCount">
              {basket.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
