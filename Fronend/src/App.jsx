import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css'
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Profile from "./pages/profile/Profile.jsx";
import ProfileBasket from "./pages/profile/ProfileBasket.jsx";
import ProfileProduct from "./pages/profile/ProfileProduct.jsx";
import ProfileSettings from "./pages/profile/ProfileSettings.jsx";
import ProfileLogout from "./pages/profile/ProfileLogout.jsx";
import ProfileUpdate from "./pages/profile/ProfileUpdate.jsx";
import ProfileDelete from "./pages/profile/ProfileDelete.jsx";
import ProductCreate from "./pages/ProductCreate.jsx";
import Product from "./pages/Product.jsx";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile/" element={<Profile />} />
              <Route path="/profile/basket" element={<ProfileBasket />} />
              <Route path="/profile/product" element={<ProfileProduct />} />
              <Route path="/profile/settings" element={<ProfileSettings />} />
              <Route path="/profile/logout" element={<ProfileLogout />} />
              <Route path="/profile/update" element={<ProfileUpdate />} />
              <Route path="/profile/delete" element={<ProfileDelete />} />
              <Route path="/product/:productId" element={<Product />}></Route>
              <Route path="/product/create" element={<ProductCreate />} />
          </Routes>
      </BrowserRouter>
  )
}

export default App;
