import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import ProtectedRoute from '../route/protectedRoute';
import AdminLayout from "../layout/Admin";
import AdminDashboard from "../pages/admin/Dashboard";
import Blog from "../pages/admin/Blog";
import User from "../pages/admin/User";
import AdminProfile from "../pages/admin/Profile";
import Home from "../pages/user/Home";
import ViewBlog from "../pages/user/ViewBlog";
import UserLayout from "../layout/User";
import UserProfile from "../pages/user/Profile";
import Bookmark from "../pages/user/Bookmark";
import SignUp from "../pages/SignUp";
import ForgotPassword from "../pages/ForgotPassword";
import VerifyOtp from "../pages/VerifyOtp";
import ResetPassword from "../pages/ResetPassword";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/blog/:id",
        element: <ProtectedRoute><ViewBlog /></ProtectedRoute>
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/sign-up",
        element: <SignUp />
    },
    {
        path: "/forgot-password",
        element: <ForgotPassword />
    },
    {
        path: "/reset-password",
        element: <ResetPassword />
    },
    {
        path: "/verify-otp",
        element: <VerifyOtp />
    },
    {
        path: "/user/dashboard",
        element: <ProtectedRoute><UserLayout /></ProtectedRoute>,
        children: [
            {
                path: "/user/dashboard/profile",
                element: <UserProfile />
            },
            {
                path: "/user/dashboard/bookmarked",
                element: <Bookmark />
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
                element: <AdminProfile />
            },
        ]
    }
]);

export default router;