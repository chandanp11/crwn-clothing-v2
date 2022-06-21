import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
// import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

import { rootReducer } from "./root-reducer";
import { rootSaga } from "./root-saga";

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
  // blacklist: ["user"],
  whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

// const middleWare = [loggerMiddleware];

const middleWare = [
  process.env.NODE_ENV !== "production" && logger,
  // thunk,
  sagaMiddleware,
].filter(Boolean);

const composeEnhanceer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const componsedEnhancer = composeEnhanceer(applyMiddleware(...middleWare));
// export const store = createStore(rootReducer, undefined, componsedEnhancer);
export const store = createStore(
  persistedReducer,
  undefined,
  componsedEnhancer
);
sagaMiddleware.run(rootSaga)
export const persitor = persistStore(store);
