import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/notFound";
import Home from "./pages/home";
import Product from "./pages/product";
import ProductList from "./features/products/productList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:category/:id" element={<Product />} />
      <Route path="/:category" element={<ProductList />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
