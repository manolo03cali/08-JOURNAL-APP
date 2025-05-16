import { singIntWithGoogle } from "../../firebase/providers";
import { checking, login, logout } from "./authSlice";

export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checking());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checking());
    const result = await singIntWithGoogle();
    if (!result.ok) return dispatch(logout(result));
    dispatch(login(result));
  };
};
