import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/404";
import Home from "./pages/homePage";
import ProductPage from "./pages/productPage";
import CatalogPage from "./pages/catalogPage";
import AddProduct from "./features/products/addProduct";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/:productName/:id" element={<ProductPage />} />
      <Route path="/:category" element={<CatalogPage />} />
      <Route path="/:category/new" element={<AddProduct />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
