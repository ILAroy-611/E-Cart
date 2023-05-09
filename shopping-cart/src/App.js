import { Route, Routes } from "react-router-dom";
import Home from "./Pages/home/Home";
import Login from "./Pages/login/Login";
import Register from "./Pages/register/Register";
import Header from "./Components/header/Header";
import UserProfile from "./Pages/userProfile/UserProfile";
import { EditProfile } from "./Pages/userProfile";
import { DisplayAddress, EditAddress } from "./Pages/address";
import AddAddress from "./Pages/address/AddAddress";
import { AddItem, DisplayItems } from "./Pages/admin/item";
import DisplayUser from "./Pages/admin/user/DisplayUser";
import AdminHome from "./Pages/admin/adminHome/AdminHome";
import MyCart from "./Pages/mycart/MyCart";
import { useContext } from "react";
import useProducts from "./Hooks/useProducts";
import counterContext from "./Hooks/Context";
import DisplayFavList from "./Pages/favorite/DisplayFavList";
import "./App.css";
import NotFound from "./Components/notFound/NotFound";
import ProtectedRoutes from "./utilityFUnctions/ProtectedRoutes";

function App() {
  const { user } = useContext(counterContext);

  return (
    <div className="App">
      <Header />
      <Routes>
        {user.isAdmin ? (
          <Route exact path="/" element={<AdminHome />} />
        ) : (
          <Route exact path="/" element={<Home />} />
        )}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoutes>
              <UserProfile />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <ProtectedRoutes>
              <EditProfile />
            </ProtectedRoutes>
          }
        />
        <Route
          exact
          path="/address"
          element={
            <ProtectedRoutes>
              <DisplayAddress />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/address/:mode"
          element={
            <ProtectedRoutes>
              <AddAddress />
            </ProtectedRoutes>
          }
        />
        {/* <Route path="/address/" element={<EditAddress />}/> */}
        <Route
          exact
          path="/admin/item/:mode"
          element={
            <ProtectedRoutes>
              <AddItem />
            </ProtectedRoutes>
          }
        />
        <Route path="/admin/items" element={<DisplayItems />} />
        <Route
          path="/admin/allUsers"
          element={
            <ProtectedRoutes>
              <DisplayUser />
            </ProtectedRoutes>
          }
        />
        <Route path="/cart" element={<MyCart />} />
        <Route path="/favList" element={<DisplayFavList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
