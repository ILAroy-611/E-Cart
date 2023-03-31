import { NavLink } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import useAuth from "../../Hooks/useAuth";
// import { useEffect, useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { adminItems, items } from "./dropdownMenuItems";
import "./header.css";
import SCDropdown from "../dropdown/SCDropdown";
import { TextButton } from "../button";

function Header() {
  const { logout, user } = useAuth();
  console.log("user in header", user)
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
      {localStorage.getItem("token") ? (
        <nav className="cart-primary-navbar">
          <ul className="flex">
            {user.isAdmin?
            <SCDropdown
            placement="bottom"
            items={adminItems}
            mainEle={
              <li>
                Hi{" "}
                {
                  user.username
                }*
              </li>
            }
          />
            :
            <>
            <SCDropdown
              placement="bottom"
              items={items}
              mainEle={
                <li>
                  Hi{" "}
                  {
                    user.username
                  }
                </li>
              }
            />
            <li>
              {" "}
              <BsCart3 className="cart-icon" />{" "}
            </li>
            </>}
            {/* <li>Hi {JSON.parse(localStorage.getItem("user")).username.split(" ")[0]}</li> */}
            
            <li>
              {" "}
              <TextButton Action="Logout" onCLick={logout} />{" "}
            </li>
            
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
