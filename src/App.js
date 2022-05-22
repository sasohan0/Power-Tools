import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Login/Register";
import Home from "./Pages/Home/Home/Home";
import Purchase from "./Pages/Purchase/Purchase";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/tools/:toolId" element={<Purchase></Purchase>}></Route>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
