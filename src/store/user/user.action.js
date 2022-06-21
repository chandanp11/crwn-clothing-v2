import { createAction } from "../../utils/reducer/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";

export const setCurrentUser = (user) =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
// export const USER_ACTION_TYPES = {
//   SET_CURRENT_USER: "user/SET_CURRENT_USER",
//   CHECK_USER_SESSION: "user/CHECK_USER_SESSION",
//   GOOGLE_SIGNIN_START: "user/GOOGLE_SIGNIN_START",
//   EMAIL_SIGNIN_START: "user/EMAIL_SIGNIN_START",
//   SIGNIN_SUCCESS: "user/SIGNIN_SUCCESS",
//   SIGNIN_FAILURE: "user/SIGNIN_FAILURE",
// };

export const checkUserSession = () =>
  createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);

export const googleSigninStart = () =>
  createAction(USER_ACTION_TYPES.GOOGLE_SIGNIN_START);

export const emailSigninStart = (email, password) =>
  createAction(USER_ACTION_TYPES.EMAIL_SIGNIN_START, { email, password });

export const signinSuccess = (user) =>
  createAction(USER_ACTION_TYPES.SIGNIN_SUCCESS, user);

export const signinFailed = (error) =>
  createAction(USER_ACTION_TYPES.SIGNIN_FAILED, error);

export const signupStart = (email, password, displayName) =>
  createAction(USER_ACTION_TYPES.SIGNUP_START, {
    email,
    password,
    displayName,
  });

export const signupSuccess = (user, additionalDetails) =>
  createAction(USER_ACTION_TYPES.SIGNUP_SUCCESS, { user, additionalDetails });

export const signupFailed = (error) =>
  createAction(USER_ACTION_TYPES.SIGNUP_FAILED, error);

export const signoutStart = () => createAction(USER_ACTION_TYPES.SIGNOUT_START);
export const signoutSuccess = () =>
  createAction(USER_ACTION_TYPES.SIGNOUT_SUCCESS);
export const signoutFailed = (error) =>
  createAction(USER_ACTION_TYPES.SIGNOUT_FAILED, error);
