import React, { useEffect, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/404";
import Home from "./pages/homePage";
import ProductPage from "./pages/productPage";
import CatalogPage from "./pages/catalogPage";
import AddProduct from "./features/products/addProduct";
import CartPage from "./pages/cartPage";
import BookmarksPage from "./pages/bookmarksPage";
import ProfilePage from "./pages/profilePage";
import {
  fetchCurrentUser,
  selectCurrentUser,
  selectUser
} from "./features/auth/userSlice";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import {
  cartApiSlice,
  useGetCartProductsQuery
} from "./features/cart/cartSlice";
import { createSelector } from "@reduxjs/toolkit";
import store from "./redux/store";

function App() {
  const currentUser = useAppSelector(selectCurrentUser);
  const { data: cart } = useGetCartProductsQuery({
    userId: currentUser?._id || ""
  });

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="products/:productName/:id" element={<ProductPage />} />
      <Route path="catalog/:category" element={<CatalogPage />} />
      <Route path="catalog/:category/new" element={<AddProduct />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="bookmarks" element={<BookmarksPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
