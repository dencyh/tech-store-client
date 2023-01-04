import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "./pages/404";
import Home from "./pages/homePage";
import ProductPage from "./pages/productPage";
import CatalogPage from "./pages/catalogPage";
import AddProduct from "./features/products/addProduct";
import CartPage from "./pages/cartPage";
import BookmarksPage from "./pages/bookmarksPage";
import ProfilePage from "./pages/profilePage";
import { selectCurrentUser } from "./features/user/userSlice";
import { useAppSelector } from "./redux/hooks";
import { selectLocalCart, useGetCartQuery } from "./features/cart/cartSlice";

function App() {
  const currentUser = useAppSelector(selectCurrentUser);
  useAppSelector(selectLocalCart);
  useGetCartQuery(currentUser?._id || "", {
    skip: !currentUser
  });

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="profile">
        <Route index element={<ProfilePage />} />
        <Route path=":path" element={<ProfilePage />} />
      </Route>
      <Route path="products/:productName/:id" element={<ProductPage />} />
      <Route path="catalog/:type" element={<CatalogPage />} />
      <Route path="catalog/:type/new" element={<AddProduct />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="bookmarks" element={<BookmarksPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
