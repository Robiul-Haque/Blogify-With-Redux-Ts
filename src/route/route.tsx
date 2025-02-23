import { createBrowserRouter } from "react-router";
import Admin from "../layout/Admin";
import Login from "../pages/Login";
import ProtectedRoute from '../route/protectedRoute';
import Dashboard from "../pages/admin/Dashboard";

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
                element: <h3>User</h3>
            }
        ]
    }
]);

export default router;