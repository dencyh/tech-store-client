import { selectCurrentUser } from "../features/user/userSlice";
import {
  CartItem,
  getCartSelectors,
  productDecrement,
  productIncrement,
  useGetCartQuery,
  useUpdateCartMutation
} from "../features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Product } from "../types/products/core.product";

export const useCart = (product: Product) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);

  const cart = useAppSelector(getCartSelectors(currentUser?._id).selectCart);

  const cartProduct = cart?.entities[product._id || ""];

  const cartItems = useAppSelector(
    getCartSelectors(currentUser?._id).selectAllCart
  );

  // Update Local Cart
  const localQuantityUpdate = (action: "increment" | "decrement") => {
    return function () {
      switch (action) {
        case "increment":
          dispatch(
            productDecrement({
              product: product._id,
              quantity: 1
            })
          );
          break;
        case "decrement":
          dispatch(
            productIncrement({
              product: product._id,
              quantity: 1
            })
          );
          break;
      }
    };
  };

  // Update API cart
  const [updateCart] = useUpdateCartMutation();

  const handleQuantityUpdate = (action: "increment" | "decrement") => {
    return function () {
      if (!cart) return;
      let newCart: CartItem[] = [...cartItems];
      const inCart = cart.entities[product._id];
      switch (action) {
        case "increment": {
          if (!inCart) {
            newCart.push({ product: product, quantity: 1 });
          } else {
            newCart = cartItems.map((cartItem) =>
              cartItem.product._id === product._id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            );
          }
          break;
        }
        case "decrement": {
          if (inCart && inCart.quantity === 1) {
            newCart = newCart.filter(
              (cartItem) => cartItem.product._id !== product._id
            );
          } else {
            newCart = newCart.map((cartItem) =>
              cartItem.product._id === product._id
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem
            );
          }
          break;
        }
      }
      currentUser
        ? updateCart({ userId: currentUser._id, products: newCart })
        : console.log("local cart action");
    };
  };

  // Final function updates local cart or API cart if user logged in
  const updateQuantity = currentUser
    ? handleQuantityUpdate
    : localQuantityUpdate;

  return {
    cartItems,
    cartProduct,
    updateQuantity
  };
};
