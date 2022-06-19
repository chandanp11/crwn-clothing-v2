import { compose, createStore, applyMiddleware } from "redux";
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

// const middleWare = [loggerMiddleware];

const middleWare = [logger];
const componsedEnhancer = compose(applyMiddleware(...middleWare));
export const store = createStore(rootReducer, undefined, componsedEnhancer);
