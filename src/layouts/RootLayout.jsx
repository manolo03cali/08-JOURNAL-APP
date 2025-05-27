import { CheckingAuth } from "../ui";
import { Outlet } from "react-router-dom";
import { useCheckAuth } from "../hooks";

export const RootLayout = () => {
  const { status } = useCheckAuth();

  if (status === "checking") {
    return <CheckingAuth />;
  }

  return <Outlet />;
};
