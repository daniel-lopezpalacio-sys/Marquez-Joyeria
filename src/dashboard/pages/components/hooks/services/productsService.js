import { supabase } from "../../lib/supabaseClient"

export async function getProducts() {
    const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })

    if (error) throw error
    return data
    }

    export async function createProduct(product) {
        const {data, error} = await supabase
        .from("products")
        .insert([product])
        .select()

        if (error) throw error
        return data
    }

    export async function deleteProduct(id) {
        const {error} = await supabase
        .from("products")
        .delete()
        .eq("id", id)

        if (error) throw error
    }
