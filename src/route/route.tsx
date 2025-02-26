import { createBrowserRouter } from "react-router";
import Admin from "../layout/Admin";
import Login from "../pages/Login";
import ProtectedRoute from '../route/protectedRoute';
import Dashboard from "../pages/admin/Dashboard";
import User from "../pages/admin/User";

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
                path: "/admin/dashboard/user",
                element: <User />
            }
        ]
    }
]);

export default router;