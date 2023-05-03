import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/login/Login";
import Register from "./Pages/register/Register";
import Header from "./Components/header/Header";
import UserProfile from "./Pages/userProfile/UserProfile";
import { EditProfile } from "./Pages/userProfile";
import { DisplayAddress, EditAddress } from "./Pages/address";
import AddAddress from "./Pages/address/AddAddress";
import { AddItem, DisplayItems } from "./Pages/admin/item";
import DisplayUser from "./Pages/admin/user/DisplayUser";
import useAuth from "./Hooks/useAuth";
import AdminHome from "./Pages/admin/adminHome/AdminHome";
import MyCart from "./Pages/mycart/MyCart";
import { useContext, useEffect } from "react";
import useProducts from "./Hooks/useProducts";
import counterContext from "./Hooks/Context";
import "./App.css";
import DisplayFavList from "./Pages/favorite/DisplayFavList";


function App() {
  const { user } = useAuth();
  

  return (
      <div className="App">
        <Header />
        <Routes>
          {user.isAdmin ? (
            <Route exact path="/" element={<AdminHome />}></Route>
          ) : (
            <Route exact path="/" element={<Home />}></Route>
          )}
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/profile" element={<UserProfile />}></Route>
          <Route path="/edit-profile" element={<EditProfile />}></Route>
          <Route exact path="/address" element={<DisplayAddress />}></Route>
          <Route path="/address/add" element={<AddAddress />}></Route>
          <Route path="/address/edit" element={<EditAddress />}></Route>
          <Route exact path="/admin/item/:mode" element={<AddItem />}></Route>
          <Route path="/admin/items" element={<DisplayItems />}></Route>
          <Route path="/admin/allUsers" element={<DisplayUser />}></Route>
          <Route path="/cart" element={<MyCart />}></Route>
          <Route path="/favList" element={<DisplayFavList />}></Route>
        </Routes>
      </div>
  );
}

export default App;
