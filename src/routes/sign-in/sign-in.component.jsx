import {
  auth,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  // signInWithGoogleRedirect,
} from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

// import {useEffect} from "react";
// import {getRedirectResult} from "firebase/auth";

const SignIn = () => {

  // this is callback for redirected sign-in. 
  // useEffect( async () => {
  //   const response = await getRedirectResult(auth);
  //   if (response){
  //     const userDocRef = await createUserDocumentFromAuth(response.user);
  //   }
  // }, []);

  // ths is for sign-in with google popup
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    // console.log(response);
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      {/* <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button> */}
      <SignUpForm />
    </div>
  );
};

export default SignIn;
