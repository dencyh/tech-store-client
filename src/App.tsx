import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/404";
import Home from "./pages/homePage";
import ProductPage from "./pages/productPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:category/:id" element={<ProductPage />} />
      <Route path="/:category" element={<ProductPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
