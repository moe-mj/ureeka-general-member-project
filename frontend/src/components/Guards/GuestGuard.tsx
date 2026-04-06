import type { ReactNode } from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

interface Props {
    children: ReactNode
}

export const GuestGuard = ({ children }: Props) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading</div>
    }
    if (user) {
        return <Navigate to='/dashboard' replace />
    }
    return <>{children}</>
}