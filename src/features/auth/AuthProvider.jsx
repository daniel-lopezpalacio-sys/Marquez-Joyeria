import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

   // 🔥 función reutilizable
  const fetchUserAndRole = async (session) => {
    const currentUser = session?.user ?? null;
    setUser(currentUser);

    if (currentUser) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", currentUser.id)
        .single();

      setRole(profile?.role);
    } else {
      setRole(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    // 🔹 sesión inicial
    const init = async () => {
        const { data } = await supabase.auth.getSession();
        await fetchUserAndRole(data.session);
    };

    init();

    // 🔹 escuchar cambios (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        console.log("EVENT:", _event);

        if (!session) {
            setUser(null);
            setRole(null);
            setLoading(false);
            return;
        }

        await fetchUserAndRole(session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return false;

    await fetchUserAndRole(data.session);
    return true;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);