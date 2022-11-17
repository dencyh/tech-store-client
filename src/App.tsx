import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/notFound";
import Home from "./pages/home";
import Product from "./pages/product";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/:id" element={<Product />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
