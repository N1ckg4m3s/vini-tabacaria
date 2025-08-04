import { ProductController } from "@/controller/productContoller";
import { Produto } from "@/controller/types";
import { NextRequest, NextResponse } from "next/server";

/**
 * Endpoint especifico para retornar itens da mesma marca que o produto indicado
 * 
 * @param {string} marca - marca que devera ser procurado
 * 
 * @returns {Produto[]} lista com todos os itens da mesma marca
*/
export async function GET(request: NextRequest) {
    /* obtem os parametros passados */
    const { searchParams } = request.nextUrl;

    /* obter o id do produto */
    const product_marca: string | undefined = searchParams.get("product_marca") || undefined;

    if (!product_marca) return NextResponse.json({
        mensage: 'Marca do produto não indicada'
    }, { status: 400 });

    try {
        const returnData: Produto[] = await new ProductController().getProductsByMarca(product_marca);

        return NextResponse.json({
            mensage: 'dados obtidos com sucesso',
            responseData: returnData
        }, { status: 200 })
    } catch (e) {
        return NextResponse.json({ error: e }, { status: 500 })
    }
}