import { createBrowserRouter } from "react-router";
import Admin from "../layout/Admin";
import Login from "../pages/Login";
import ProtectedRoute from '../route/protectedRoute';
import Dashboard from "../pages/admin/Dashboard";
import Blog from "../pages/admin/Blog";
import User from "../pages/admin/User";
import Profile from "../pages/admin/Profile";

const router = createBrowserRouter([
    {
        path: "/",
        element: <h2>Home</h2>
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/admin/dashboard",
        element: <ProtectedRoute><Admin /></ProtectedRoute>,
        children: [
            {
                path: "/admin/dashboard",
                element: <Dashboard />
            },
            {
                path: "/admin/dashboard/blog",
                element: <Blog />
            },
            {
                path: "/admin/dashboard/user",
                element: <User />
            },
            {
                path: "/admin/dashboard/profile",
                element: <Profile />
            },
        ]
    }
]);

export default router;