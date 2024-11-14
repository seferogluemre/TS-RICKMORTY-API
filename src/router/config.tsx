import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Favorites from "../Favorites";

function config() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/favorites-characters" element={<Favorites />}></Route>
    </Routes>
  );
}

export default config;
