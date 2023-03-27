import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/login/Login";
import Register from "./Pages/register/Register";
import Header from "./Components/header/Header";
import UserProfile from "./Pages/userProfile/UserProfile";
import { EditProfile } from "./Pages/userProfile";
import AddAddress from "./Pages/address/AddAddress";
import DisplayAddress from "./Pages/address/DisplayAddress";
import "./App.css";



function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/profile" element={<UserProfile />}></Route>
        <Route path="/edit-profile" element={< EditProfile />}></Route>
        <Route exact path="/address" element={< DisplayAddress />}></Route>
        <Route path="/address/add" element={< AddAddress />}></Route>
      </Routes>
    </div>
  );
}

export default App;
