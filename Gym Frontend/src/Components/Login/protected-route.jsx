import { Navigate } from "react-router-dom";
import { useAuth } from "./hooks/use-auth";

export function ProtectedRoute({ children }) {
    const { user, isLoading } = useAuth();
    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-purple-50/30">
                <div className="text-purple-600">Loading...</div>
            </div>
        )
    }
    if (!user) {
        return <Navigate to="/signin" replace />
    }

    return <>{children}</>
}