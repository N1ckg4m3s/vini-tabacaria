import { ProductController } from "@/controller/productContoller";
import { Produto } from "@/controller/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    /* obtem os parametros passados */
    const { searchParams } = request.nextUrl;

    /* obter o id do produto */
    const productId: string | undefined = searchParams.get("id_produto") || undefined;

    /* retornar erro caso não tenha passado id do produto */
    if (productId === undefined || productId === '') {
        return NextResponse.json({
            mensage: 'Id do produto não indicado'
        }, { status: 400 });
    }

    const Controller = new ProductController();
    const produto: Produto[] | null = await Controller.getProductById(productId);

    /* retornar erro caso não tenha encontrado o produto */
    if (produto === null || produto?.length <= 0) {
        return NextResponse.json({
            mensage: `Produto com id ${productId} não encontrado`
        }, { status: 404 });
    }
    
    return NextResponse.json({
        mensage: 'teste',
        responseData: produto
    }, { status: 200 })
}