import { PublicLayout } from "../layouts";
import { LoginPage, RegisterPage, ErrorPage } from "../auth";
export const publicRoutes = [
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <LoginPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
];
