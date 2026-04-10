import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css'
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Profile from "./pages/Profile.jsx";
import ProductCreate from "./pages/ProductCreate.jsx";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/product/create" element={<ProductCreate />} />
          </Routes>
      </BrowserRouter>
  )
}

export default App;
