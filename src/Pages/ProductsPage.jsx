import toast from "react-hot-toast";
import { supabase } from "../lib/supabaseClient";
import { useEffect, useState } from "react";

function ProductsPage() {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [role, setRole] = useState(null);

  // traer productos
  const getProducts = async () => {
    const { data } = await supabase
      .from("products")
      .select("*, categories(name)");

    if (data) {
      setProducts(data);
    }
  };

  const getUserRole = async () => {

  const { data: userData } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userData.user.id)
    .single();

  if (data) {
    setRole(data.role);
  }
};

  // traer categorías
  const getCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*");

    if (error) {
      console.log(error);
    } else {
      setCategories(data);
    }
  };

  // crear producto
  const createProduct = async (e) => {
    e.preventDefault();

    const { data: userData } = await supabase.auth.getUser();

    let imageUrl = null;

    if(image) {
      const fileName = Date.now() + "-" + image.name;
      const { error: uploadError } = await supabase.storage
       .from("products")
       .upload(fileName, image);

       if (uploadError) {
        toast.error("Error al Cargar la Imagen");
        return;
       }
      const { data } = supabase.storage
        .from("products")
        .getPublicUrl(fileName);

      imageUrl = data.publicUrl;
    }

    const { error } = await supabase
      .from("products")
      .insert([
        {
          name,
          price,
          image: imageUrl,
          category_id: categoryId,
          user_id: userData.user.id
        }
      ]);
      toast.success("Producto Creado con Exito ");

    if (error) {
      console.log(error);
      toast.error("Error al crear producto");
    } else {
      toast.success("Producto creado con Exito");
      setName("");
      setPrice("");
      setImage(null);
      setCategoryId("");
      getProducts();
    }
  };

  const buyProduct = async (productId) => {
    const { data: userData } = await supabase.auth.getUser();

    await supabase
     .from("orders")
     .insert([
      {
        product_id: productId,
        user_id: userData.user.id,
        quantity: 1,
        status: "pending"
      }
     ]);
     toast.success("Gracias por su compra");
  };

  useEffect(() => {
    getProducts();
    getCategories();
    getUserRole();
  }, []);

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Productos
      </h1>

      {/* FORMULARIO */}
      {role == "admin" && (
      <form
        onSubmit={createProduct}
        className="flex flex-col gap-3 mb-8 w-72"
      >

        <input
          type="text"
          placeholder="Nombre del producto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="file"
          placeholder="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="border p-2 rounded"
        />

        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Seleccionar categoría</option>

          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}

        </select>

        <button className="bg-black text-white p-2 rounded">
          Crear producto
        </button>

      </form>
      )}

      {/* LISTA DE PRODUCTOS */}
      <div className="flex gap-4 flex-wrap">

        {products.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded w-60"
          >

            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover mb-2 rounded"
              />
            )}

            <h3 className="font-bold">
              {product.name}
            </h3>

            <p>${product.price}</p>

            {role === "client" && (
            <button onClick={() => buyProduct(product.id)}
            className="bg-green-600 text-white px-3 py-1 mt-2 rounded">
              Comprar
            </button>
            )}

            <p className="text-sm text-gray-500">
              Categoría: {product.categories?.name}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}

export default ProductsPage;