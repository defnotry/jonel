import { Navigate, createBrowserRouter } from "react-router-dom";
import GuestLayout from "./views/layouts/GuestLayout";
import Login from "./views/guest/Login";
import Register from "./views/guest/Register";


const router = createBrowserRouter([
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to='/login' />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            }
        ]
    }
]);

export default router;