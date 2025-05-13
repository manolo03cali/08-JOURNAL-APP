import { Navigate } from "react-router-dom";
import { PrivateLayout } from "../layouts";
import { JournalPage, ErrorPage } from "../journal";

export const privateRoutes = [
  {
    element: <PrivateLayout />,
    children: [
      { index: true, element: <Navigate to="/journal" replace /> },
      { path: "journal", element: <JournalPage /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
];
