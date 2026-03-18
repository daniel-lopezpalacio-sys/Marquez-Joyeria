import { supabase } from "../lib/supabaseClient";
import { useEffect, useState } from "react";

function OrdersPage() {

  const [orders, setOrders] = useState([]);

  // traer pedidos hechos por el cliente
  const getOrders = async () => {

    const { data, error } = await supabase
      .from("orders")
      .select(`
        *,
        products(name, price, image),
        profiles(email)
      `)
      .order("created_at", { ascending: false });

    if (error) {
      consolo.log(error);
    } else {
      setOrders(data);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Pedidos
      </h1>

      {orders.length === 0 && (
        <p>No hay pedidos todavía.</p>
      )}

      <div className="flex flex-col gap-4">

        {orders.map((order) => (
          <div
            key={order.id}
            className="border p-4 rounded flex items-center gap-4">

            <p><b>Cliente:</b> {order.profiles?.email}</p>
            <p><b>Producto:</b> {order.products?.name}</p>
            <p><b>Precio:</b> {order.products?.price}</p>
            <p><b>Cantidad:</b> {order.quantity}</p>
            <p><b>Estado:</b> {order.status}</p>

            {order.products?.image && (
              <img
                src={order.products.image}
                // alt={order.products.name}
                className="w-20 h-20 object-cover rounded"
              />
            )}

            <div className="flex-1">

              <h3 className="font-bold text-lg">
                {order.products?.name}
              </h3>

              <p>
                Precio: ${order.products?.price}
              </p>

              <p className="text-sm text-gray-600">
                Cliente: {order.profiles?.email}
              </p>

              <p className="text-sm">
                Cantidad: {order.quantity}
              </p>

              <p className="text-sm font-semibold">
                Estado: {order.status}
              </p>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default OrdersPage;