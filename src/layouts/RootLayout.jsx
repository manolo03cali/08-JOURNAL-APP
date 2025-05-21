import { useDispatch, useSelector } from "react-redux";
import { CheckingAuth } from "../ui";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../firebase/config";
import { logout, login } from "../store/auth/authSlice";

export const RootLayout = () => {
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout());
      const { uid, email, displayName, photoURL } = user;
      dispatch(login({ uid, email, displayName, photoURL }));
    });
  }, []);

  if (status === "checking") {
    return <CheckingAuth />;
  }

  return <Outlet />;
};
