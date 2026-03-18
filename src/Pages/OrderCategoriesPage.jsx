import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import toast from "react-hot-toast";

function OrderCategoriesPage() {

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null); 
  const [editingName, setEditingName] = useState("");

  //  categorías
  const fetchCategories = async () => {
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) return;

    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("user_id", userData.user.id)
      .order("created_at", { ascending: true });

    if (error) {
      console.log(error);
    } else {
      setCategories(data);
    }
  };

  // crear categoría
  const createCategory = async (e) => {
    e.preventDefault();

    if (!name) return;

    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      toast.error("Usuario no autenticado");
      return;
    }

    const { error } = await supabase
      .from("categories")
      .insert([{ name, user_id: userData.user.id }]);

    if (error) {
      console.log(error);
      toast.error("Error al cargar categoría");
    } else {
      toast.success("Categoría creada");
      setName("");
      fetchCategories();
    }
  };
   const deleteCategory =async (id) => {
    const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id);

    if (error) {
      console.log(error)
    } else {
      toast.success("Categoría eliminada")
      fetchCategories();
    }
   };

   const updateCategory = async (id) => {
    if(!editingName) return;


    const{ error } = await supabase
    .from("categories")
    .update({ name: editingName })
    .eq("id", id);

    if (error) {
      console.log(error);
    } else {
      toast.success("Categoría actualizada");
      setEditingId(null);
      setEditingName("");
      fetchCategories();
    }

   };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Categorías de órdenes
      </h1>

      {/* crear categoria */}
      <form onSubmit={createCategory} className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Nueva categoría"
          className="border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button className="bg-black text-white px-4 py-2 rounded">
          Crear
        </button>
      </form>

       {/* lista */}
      <div className="space-y-2">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="border p-3 rounded bg-gray-50 flex justify-between"
          >
            {editingId === cat.id ? (
              <>
                <input
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  className="border p-1"
                />

                <button
                  onClick={() => updateCategory(cat.id)}
                  className="bg-green-500 text-white px-2 rounded"
                >
                  Guardar
                </button>
              </>
            ) : (
              <>
                <span>{cat.name}</span>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingId(cat.id);
                      setEditingName(cat.name);
                    }}
                    className="bg-blue-500 text-white px-2 rounded"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => deleteCategory(cat.id)}
                    className="bg-red-500 text-white px-2 rounded"
                  >
                    Eliminar
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderCategoriesPage;