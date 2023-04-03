import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { Home } from "./Home";

export const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};
