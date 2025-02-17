import { ReactNode } from "react";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { Navigate } from "react-router";

const protectedRoute = ({ children }: { children: ReactNode }) => {
    const token: string | null = useAppSelector((state: RootState) => state.auth.token);

    // Token is not valid then go to the login page.
    if (!token) return <Navigate to="/login" replace={true} />

    return children;
}

export default protectedRoute;