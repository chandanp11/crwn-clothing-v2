import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";

import App from "./App";
import { UserProvider } from "./contexts/user.context";
import { CartProvider } from "./contexts/cart.context";
// import { CategoriesProvider } from "./contexts/categories.context";

import "./index.scss";

// import reportWebVitals from "./reportWebVitals";

const rootElement = document.getElementById("root");

render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        {/* <CategoriesProvider> */}
          <CartProvider>
            <App />
          </CartProvider>
        {/* </CategoriesProvider> */}
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
