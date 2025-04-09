import { createBrowserRouter } from "react-router";
import Login from "../pages/Login";
import ProtectedRoute from '../route/protectedRoute';
import AdminLayout from "../layout/Admin";
import AdminDashboard from "../pages/admin/Dashboard";
import Blog from "../pages/admin/Blog";
import User from "../pages/admin/User";
import Profile from "../pages/admin/Profile";
import Home from "../pages/user/Home";
import ViewBlog from "../pages/user/ViewBlog";
import UserLayout from "../layout/User";
import UserDashboard from "../pages/user/Dashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/blog/:id",
        element: <ViewBlog />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/user/dashboard",
        element: <ProtectedRoute><UserLayout /></ProtectedRoute>,
        children: [
            {
                path: "/user/dashboard",
                element: <UserDashboard />
            }
        ]
    },
    {
        path: "/admin/dashboard",
        element: <ProtectedRoute><AdminLayout /></ProtectedRoute>,
        children: [
            {
                path: "/admin/dashboard",
                element: <AdminDashboard />
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