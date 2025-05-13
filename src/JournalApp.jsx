import { RouterProvider } from "react-router-dom";
import { AppRouter } from "./routes/AppRouter";

export const JournalApp = () => {
  return <RouterProvider router={AppRouter} />;
};
