import { ReactNode } from "react";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { Navigate, useLocation } from "react-router";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const token: string | null = useAppSelector((state: RootState) => state.auth.token);
    const location = useLocation();

    // Token is not valid then go to the login page.
    if (!token) return <Navigate to="/login" state={{ from: location.pathname }} replace />

    return children;
}

export default ProtectedRoute;