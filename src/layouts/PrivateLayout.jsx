import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

export const PrivateLayout = () => {
  const { status } = useSelector((state) => state.auth);
  if (status !== "authenticated") {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <div className="container">
        <Outlet />
      </div>
    </>
  );
};
