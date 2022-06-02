import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { UserContext } from "../../contexts/user.context";
// import "./navigation.styles.jsx";
import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from "./navigation.styles";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);
  // const { currentUser, setCurrentUser } = useContext(UserContext);
  // console.log(currentUser);

  // const signOutHandler = async () => {
  //   await signOutUser();
  //   setCurrentUser(null);
  // }

  return (
    <Fragment>
      <NavigationContainer>
        {/* <div className="navigation"> */}
        {/* <Link className="logo-container" to="/"> */}
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        {/* </Link> */}

        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
              {/* <span className="nav-link" onClick={signOutUser}> */} 
              SIGN-OUT{" "}
              {/* </span> */}
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
        {/* </div> */}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
