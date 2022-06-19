import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

// sample code for logger if we have to write our own
const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log("type: ", action.type);
  console.log("Payload: ", action.payload);
  console.log("current State: ", store.getState());

  next(action);

  console.log("next state: ", store.getState());
};

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const middleWare = [loggerMiddleware];

const middleWare = [logger];
const componsedEnhancer = compose(applyMiddleware(...middleWare));
// export const store = createStore(rootReducer, undefined, componsedEnhancer);
export const store = createStore(
  persistedReducer,
  undefined,
  componsedEnhancer
);
export const persitor = persistStore(store);
