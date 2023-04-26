import { NavLink } from "react-router-dom";

export const items = [
  {
    key: "1",
    label: <NavLink to="/cart">My Shopping Cart</NavLink>,
  },
  {
    key: "2",
    label: <NavLink to="/orders">My Orders</NavLink>,
  },
  {
    key: "3",
    label: <NavLink to="/favorites">My Favorites</NavLink>,
  },
  {
    key: "4",
    label: <NavLink to="/wallet">My Wallet</NavLink>,
  },
  {
    key: "5",
    label: <NavLink to="/profile">My Profile</NavLink>,
  },
  {
    key: "6",
    label: <NavLink to="/address">Address</NavLink>,
  },
  {
    key: "7",
    label: <NavLink to="/settings">Settings</NavLink>,
  },
];

export const adminItems=[
  {
    key: "1",
    label: <NavLink to={`/admin/items`}>Items</NavLink>,
  },
  {
    key: "2",
    label: <NavLink to={`/admin/item/add`}>Add Item</NavLink>,
  },
  {
    key: "3",
    label: <NavLink to={`/admin/allUsers`}>Users</NavLink>,
  },
  {
    key: "4",
    label: <NavLink to="/profile">My Profile</NavLink>,
  },
]


