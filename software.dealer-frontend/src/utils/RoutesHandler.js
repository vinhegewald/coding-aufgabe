import React from "react";
import { Routes, Route } from "react-router-dom";

// routes
import MainRoute from "../routes/MainRoute";
import ProductRoute from "../routes/ProductRoute";
import NotFoundRoute from "../routes/NotFoundRoute";
import ShoppingCartRoute from "../routes/ShoppingCartRoute";
import ProfileRoute from "../routes/ProfileRoute";
import SignInRoute from "../routes/SignInRoute";
import LogoutRoute from "../routes/LogoutRoute";
import SignUpRoute from "../routes/SignUpRoute";

const RoutesHandler = () => {
  return (
    <Routes>
      <Route path="/" element={<MainRoute />} />
      <Route path="/product/:id" element={<ProductRoute />} />
      <Route path="/shopping-cart" element={<ShoppingCartRoute />} />
      <Route path="/profile" element={<ProfileRoute />} />
      <Route path="/login" element={<SignInRoute />} />
      <Route path="/logout" element={<LogoutRoute />} />
      <Route path="/signup" element={<SignUpRoute />} />
      <Route path="*" element={<NotFoundRoute />} />
    </Routes>
  );
};

export default RoutesHandler;
