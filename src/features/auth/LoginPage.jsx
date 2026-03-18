import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { supabase } from "../../lib/supabaseClient";


function LoginPage() {

    const  { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault();

      const success = await login(email, password);

      if(success) {
        const { data: userData } = await supabase.auth.getUser();

        const { data } = await supabase
         .from("profiles")
         .select("role")
         .eq("id", userData.user.id)
         .maybeSingle();

         if (data && data.role === "admin") {
          toast.success("BIENVENIDO ADMINISTRADOR");
         } else {
        toast.success("Bienvenido a la mejor Joyeria");
         }

        navigate("/dashboard/products");
      } else {
        toast.error("Correo o Contraseña incorrectos");
      }
    };

    return (
        <div className="  bg-black/70 p-6 rounded-lg w-75 text-white">
       <h2 className="text-xl mb-4 text-center">Iniciar Sesión</h2>

       <form onSubmit={handleSubmit}>
       <input
        type="email"
        placeholder="Correo electrónico"
        className="w-full mb-3 p-2 bg-transparent border-b border-yellow-500"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />

       <input
        type="password"
        placeholder="Contraseña"
        className="w-full mb-4 p-2 bg-transparent border-b border-yellow-500"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />

        <button
        type="submit"
        className="w-full py-2 bg-yellow-600 rounded"
        >Ingresar</button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-300">
            ¿No tienes cuenta?
          </p>

          <Link
          to="/signup" className="text-yellow-500 hover:text-yellow-400 font-semibold text-sm"
          >
            Registrate Aquí
          </Link>
        </div>
       </div>
        );
      }

export default LoginPage;