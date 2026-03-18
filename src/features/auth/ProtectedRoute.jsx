import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

function ProtectedRoute({ children, requireAdmin = false })  {
    const { user, role, loading } = useAuth();

    console.log("User:", user);
    console.log("Role:", role);

    if(loading) return <p>Cargando...</p>;

    if(!user) {
        return <Navigate to="/" />;
    }

        if (requireAdmin && role !== "admin") {
            return <Navigate to="/dashboard/products" />;
        } 

    return children;
};
export default ProtectedRoute;