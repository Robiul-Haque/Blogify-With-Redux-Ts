import { createBrowserRouter } from "react-router";
import AdminDashboard from "../layout/AdminDashboard";
import Login from "../pages/Login";
import ProtectedRoute from '../route/protectedRoute';

const router = createBrowserRouter([
    {
        path: "/",
        element: <h2>Home</h2>
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/admin/dashboard",
        element: <ProtectedRoute><AdminDashboard /></ProtectedRoute>
    }
]);

export default router;