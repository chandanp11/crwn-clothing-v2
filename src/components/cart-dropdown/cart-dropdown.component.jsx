// import { useContext } from "react";
// import { CartContext } from "../../contexts/cart.context";

import {useSelector} from "react-redux"

import { useNavigate } from "react-router-dom";


import { selectCartItems } from "../../store/cart/cart.selector";
import {
  CartDropdownContainer,
  EmpryMessage,
  CartItems,
} from "./cart-dropdown.styles";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

const CartDropdown = () => {
  // const { cartItems } = useContext(CartContext);
  const cartItems = useSelector(selectCartItems);
  
  const navigate = useNavigate();
  const goToCheckoutHandler = () => {
    navigate("/checkout");
  };

  return (
    <CartDropdownContainer>
      <CartItems className="cart-items">
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmpryMessage>Your Cart is empty</EmpryMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckoutHandler}>Go to checkout</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
