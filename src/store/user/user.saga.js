import { takeLatest, put, all, call, take } from "redux-saga/effects";

import { USER_ACTION_TYPES } from "./user.types";

import {
  signinSuccess,
  signinFailed,
  signupFailed,
  signupSuccess,
  signoutFailed,
  signoutSuccess,
} from "./user.action";

import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signinAuthUserWithEmailandPassword,
  createAuthUserWithEmailandPassword,
  signOutUser,
} from "../../utils/firebase/firebase.utils";

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    );
    console.log("From user Saga", userSnapshot);
    console.log("From user Saga", userSnapshot.data());
    yield put(signinSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signinFailed(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield put(signinFailed(error));
  }
}

export function* signinWithEmail({ payload: { email, password } }) {
  try {
    console.log("USER: ", email);
    console.log("Password: ", password);
    const { user } = yield call(
      signinAuthUserWithEmailandPassword,
      email,
      password
    );
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signinFailed(error));
  }
}

export function* signinWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signinFailed(error));
  }
}

export function* signup({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield call(
      createAuthUserWithEmailandPassword,
      email,
      password
    );
    yield put(signupSuccess(user, { displayName }));
  } catch (error) {
    yield put(signupFailed(error));
  }
}

export function* signout() {
  try {
    yield call(signOutUser);
    yield put(signoutSuccess());
  } catch (error) {
    yield put(signoutFailed(error));
  }
}

export function* signinAfterSignup({ payload: { user, additionalDetails } }) {
  yield call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* onEmailSigninStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGNIN_START, signinWithEmail);
}

export function* onGoogleSigninStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGNIN_START, signinWithGoogle);
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignupStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGNUP_START, signup);
}

export function* onSignupSuccess() {
  yield takeLatest(USER_ACTION_TYPES.SIGNUP_SUCCESS, signinAfterSignup);
}

export function* onSignoutStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGNOUT_START, signout);
}

export function* userSaga() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSigninStart),
    call(onEmailSigninStart),
    call(onSignupStart),
    call(onSignupSuccess),
    call(onSignoutStart)
  ]);
}
