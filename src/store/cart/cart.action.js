import { CART_ACTIONS_TYPE } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

export const setIsCartOpen = (boolean) =>
  createAction(CART_ACTIONS_TYPE.SET_IS_CART_OPEN, boolean);

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === existingCartItem.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTIONS_TYPE.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return createAction(CART_ACTIONS_TYPE.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, cartItemmToClear) => {
  const newCartItems = clearCartItem(cartItems, cartItemmToClear);
  return createAction(CART_ACTIONS_TYPE.SET_CART_ITEMS, newCartItems);
};
