import { useProducts } from "../hooks/useProducts"


// pantalla de productos para cliente registrado

export default function ProductsPage() {
    const { products, loading } = useProducts()

    if (loading) return <P>Cargando Productos.</P>
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">
                Inventario - Joyeria Marquez
            </h1>
            <div className="grid gap-4">{products.map(product => (
                <div 
                  key={product.id} className="border p-4 rounden-lg">

                    <h2 className="font-semibold">{product.name}</h2>

                    <p>Precio: ${product.price}</p>
                    <p>Precio: ${product.stock}</p>

                </div>

            ))}
        </div>
    </div>
    )
}