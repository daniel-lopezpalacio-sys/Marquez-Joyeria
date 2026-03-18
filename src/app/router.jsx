import { Routes,Route } from "react-router-dom";
import ProtectedRoute from "../features/auth/ProtectedRoute";

import HomePage from "../Pages/HomePage";
import LoginPage from "../features/auth/LoginPage";
import SignupPage from "../features/auth/SignupPage";
import DashboardPage from "../Pages/DashboardPage";

import ProductosPage from "../Pages/ProductsPage";
import OrdersPage from "../Pages/OrdersPage";
import OrderCategoriesPage from "../Pages/OrderCategoriesPage"


export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />


            {/* comienzo con la ruta protegida  */}
            
            <Route
            path="/dashboard"
            element={
            <ProtectedRoute>
                <DashboardPage />
            </ProtectedRoute>
            }   
        >
            <Route path="products" element={<ProductosPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="categories" element={<OrderCategoriesPage />} />

            <Route path="categories"
            element={
                <ProtectedRoute requireAdmin={true}>
                    <OrderCategoriesPage />
                </ProtectedRoute>
            }
            />

            </Route>

        </Routes>
                
    );
}