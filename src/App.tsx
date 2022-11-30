import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/404";
import Home from "./pages/homePage";
import ProductPage from "./pages/productPage";
import CatalogPage from "./pages/catalogPage";
import AddProduct from "./features/products/addProduct";
import Cart from "./features/cart/cart";
import CartPage from "./pages/cartPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="products/:productName/:id" element={<ProductPage />} />
      <Route path="catalog/:category" element={<CatalogPage />} />
      <Route path="catalog/:category/new" element={<AddProduct />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
