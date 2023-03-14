import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import "./App.css";
import Login from "./Pages/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
