import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
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
import ProtectedRoute from "./components/protectedRoute";

function App() {
  const currentUser = useAppSelector(selectCurrentUser);
  useAppSelector(selectLocalCart);
  useGetCartQuery(currentUser?._id || "", {
    skip: !currentUser
  });

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      >
        <Route index element={<ProfilePage />} />
        <Route path=":path" element={<ProfilePage />} />
      </Route>
      <Route path="products/:productName/:id" element={<ProductPage />} />
      <Route path="catalog" element={<CatalogPage />}>
        <Route index element={<CatalogPage />} />
        <Route path=":type" element={<CatalogPage />} />
      </Route>

      <Route
        path="catalog/:type/new"
        element={
          <ProtectedRoute requireAdmin>
            <AddProduct />
          </ProtectedRoute>
        }
      />

      <Route path="cart" element={<CartPage />} />
      <Route
        path="bookmarks"
        element={
          <ProtectedRoute>
            <BookmarksPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
