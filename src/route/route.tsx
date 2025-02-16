import { createBrowserRouter } from "react-router";
import AdminDashboard from "../layout/AdminDashboard";
import Login from "../pages/Login";

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
        path: "/admin",
        element: <AdminDashboard />
    }
]);

export default router;