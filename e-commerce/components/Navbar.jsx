import Link from "next/link";
import React, { useContext } from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { Context } from "../context/StateContext";
import Cart from "./Cart";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantites } = useContext(Context);
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href={"/"}>e-commerce</Link>
      </p>
      <button type="button" className="cart-icon" onClick={""}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantites}</span>
      </button>
      <Cart />
    </div>
  );
};

export default Navbar;
