import { useEffect, useState } from "react";
import { getProducts } from "./services/productsService";
import { supabase } from "../../../../lib/supabaseClient";

export function useProducts() {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    
    async function loadProducts() {
        const data = await getProducts()
        setProducts(data)
        setLoading(false)
    }

    useEffect(() => {
        loadProducts()

        const channel = supabase
        .channel("products-channel")
        .on(
            "postgres_changes",
            {
                event: "*",
                schema: "public",
                table: "products"
            },
            () => {
                loadProducts()
            }
        )
        .subscribe()
        return () => {
            supabase.removeChannel(channel)
        }
    }, [])

    return {
        products,
        loading,
        reload: loadProducts
    }
}