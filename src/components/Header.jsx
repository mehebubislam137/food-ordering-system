import React from "react";
import { ShoppingBag, Utensils } from "lucide-react";

function Header({ cartCount, onCartClick }) {
  return (
    <header className="header">
      <div className="header-inner">
        <a className="logo" href="#home">
          <span className="logo-icon">
            <Utensils size={19} />
          </span>

          <span>
            Taste<span>Table</span>
          </span>
        </a>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#menu">Menu</a>
          <a href="#orders">Orders</a>
        </nav>

        <button className="cart-button" onClick={onCartClick}>
          <ShoppingBag size={19} />
          <span>Cart</span>

          {cartCount > 0 && <b>{cartCount}</b>}
        </button>
      </div>
    </header>
  );
}

export default Header;

