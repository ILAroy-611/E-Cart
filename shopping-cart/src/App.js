import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import "./App.css";
import Login from "./Pages/login/Login";
import Register from "./Pages/register/Register";
import Header from "./Components/header/Header";



function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
