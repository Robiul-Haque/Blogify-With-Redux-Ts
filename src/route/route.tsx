import { createBrowserRouter } from "react-router";
import Admin from "../layout/Admin";
import Login from "../pages/Login";
import ProtectedRoute from '../route/protectedRoute';
import Dashboard from "../pages/admin/Dashboard";
import Blog from "../pages/admin/Blog";
import User from "../pages/admin/User";
import Profile from "../pages/admin/Profile";
import Home from "../pages/user/Home";
import ViewBlog from "../pages/user/ViewBlog";

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
        element: <ProtectedRoute><User /></ProtectedRoute>,
        children: [
            {
                path: "/user/dashboard",
                element: <Dashboard />
            }
        ]
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