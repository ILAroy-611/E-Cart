import { NavLink } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import useAuth from "../../Hooks/useAuth";
import PrimaryButton from "../button/PrimaryButton";
// import { useEffect, useState } from "react";
import "./header.css";


function Header() {
  const { logout, user } = useAuth();
  // console.log("user in header", name)
  return (
    <header className="cart-primary-header flex">
      <div className="logo ">
        <NavLink to="/" className="link flex">
          <img src="cart-img.png" alt="cart" />
          <h2>E-Cart</h2>
        </NavLink>
      </div>
      <div className="flex cart-search-bar">
        <input
          type="search"
          name=""
          className="cart-search"
          placeholder="Search items"
        />
        <BsSearch className="cart-search-icon" />
      </div>
      { localStorage.getItem("token") ? (
        <nav className="cart-primary-navbar">
          <ul className="flex">
            <li>Hi {JSON.parse(localStorage.getItem("user")).username}</li>
            <li> <PrimaryButton Action="Logout" onCLick={logout}/> </li>
          </ul>
        </nav>
      ) : (
        <nav className="cart-primary-navbar">
          <ul className="flex">
            <li>
              <NavLink to="/login" className="link">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" className="link">
                Register
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;
