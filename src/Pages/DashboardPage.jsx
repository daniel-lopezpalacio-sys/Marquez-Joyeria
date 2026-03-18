import { useAuth } from "../features/auth/AuthProvider";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import toast from "react-hot-toast";

function DashboardPage(){
  const { user, role, logout  } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {

    const getProfile = async () => {

    const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

    if (!error) {
      setProfile(data);
    }else {
      console.error(error);
    }
  };
if (user) {
  getProfile();
}

}, [user]);

  const handleLogout = async () => {
    toast.success("Vuelve Pronto");
  await logout();

  navigate("/");
  };

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-xl font-bold mb-6">
          Joyeria Marquez
        </h2>
        <nav className="flex flex-col gap-4">
          <NavLink to="/dashboard/products">
          Productos </NavLink>

          {role === "admin" && (
            
           <NavLink to="/dashboard/categories">
           Categorías</NavLink>

          )}

          {role === "admin" && (
          <NavLink to="/dashboard/orders">
          Pedidos </NavLink>
          )}
        </nav>
      </aside>

{/* Contenido */}
      <main className="flex-1 p-8 bg-gray-50">
        <div className="flex justify-between items-center mb-6">

          <h1 className="text-2xl font-bold mb-1">
            Bienvenido, {user?.email}
          </h1>

          <p className="text-sm text-gray-500">
            Rol: {role}
          </p>
          <button onClick={handleLogout} className=" bg-yellow-600 px-4 py-2 rounded">
           Cerrar Sesión
          </button>
        </div>

        <Outlet />
      </main> 
  </div>
  );
}
export default DashboardPage;
