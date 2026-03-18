import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import {Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function SignupPage() {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false);
  const [role, setRole] = useState("client");

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if(error){
      setError(error.message);
    }else{
      if (data.user) {
        await supabase.from("profiles").insert([
          {
            id: data.user.id,
            email: email,
            role: "client"
          }
        ]);
      }
      toast.success("cuenta Creada Exitosamente");
      navigate("/");
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">

      <form
        onSubmit={handleSignup}
        className="bg-black/70 p-6 rounded-lg w-75 text-white"
      >

        <h1 className="text-xl mb-4 text-center">
          Crear cuenta
        </h1>

        <input
          type="email"
          placeholder="Correo"
          className="w-full mb-3 p-2 bg-transparent border-b border-b-yellow-500"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="w-full mb-4 p-2 bg-transparent border-b border-yellow-500"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
        />

        {error && (
          <p className="text-red-500 text-sm mb-3">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-black text-white p-2 rounded"
        >
          {loading ? "Creando..." : "Registrarse"}
        </button>

        <p className="text-sm text-center mt-4">
         ¿Ya tienes cuenta?{" "}
         <Link to="/login" className="text-yellow-500 hover:text-yellow-400 font-semibold text-sm">
           Inicia sesión
         </Link>
        </p>

      </form>

    </div>
  );
}