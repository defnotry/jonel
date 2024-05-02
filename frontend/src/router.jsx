import { Navigate, createBrowserRouter } from "react-router-dom";
import GuestLayout from "./views/layouts/GuestLayout";
import Login from "./views/guest/Login";
import Register from "./views/guest/Register";
import Home from "./views/user/Home";
import UserLayout from "./views/layouts/UserLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/home" />,
      },
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/login" />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
