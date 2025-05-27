import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { FirebaseAuth } from "./config";

const GoogleProvider = new GoogleAuthProvider();

export const singIntWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, GoogleProvider);
    // const credentials = GoogleAuthProvider.credentialFromResult(result);
    const { displayName, email, photoURL, uid } = result.user;
    return {
      ok: true,
      //User info
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error) {
    console.log(error);
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;

    return {
      ok: false,
      errorMessage,
    };
  }
};
export const registerUserWithEmailPassword = async ({
  email,
  password,
  displayName,
}) => {
  try {
    console.log(email, password, displayName);
    const resp = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { uid, photoURL } = resp.user;

    //TODO: actualizar el  displayname en el firebase
    await updateProfile(FirebaseAuth.currentUser, { displayName });

    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName,
    };
  } catch (error) {
    //  console.log(error);
    return {
      ok: false,
      errorMessage: error.message,
    };
  }
};
export const LoginWithEmailPassword = async ({ email, password }) => {
  try {
    const resp = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    // const credentials = GoogleAuthProvider.credentialFromResult(result);
    const { displayName, photoURL, uid } = resp.user;
    //! signInWithEmailPassword es la funcion que debemos de llamar no actualizar profile
    return {
      ok: true,
      //User info
      displayName,
      photoURL,
      uid,
    };
  } catch (error) {
    //console.log(error);
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;

    return {
      ok: false,
      errorMessage,
    };
  }
};
export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut();
};
