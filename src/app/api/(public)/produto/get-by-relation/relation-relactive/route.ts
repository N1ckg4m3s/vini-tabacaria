import { ProductController } from "@/controller/productContoller";
import { ExpecificacaoAcessorio, ExpecificacaoCarvaoAluminio, ExpecificacaoEssencia, Produto } from "@/controller/types";
import { NextRequest, NextResponse } from "next/server";

/**
 * Endpoint especifico para retornar itens relativos a o produto indicado
 * 
 * @param {string} tipo - tipo do produto {acessorio, essencia, carvãoalu....}
 * @param {JSON} itemData - informações do produto com base no tipo:
 *      {
 *          ExpecificacaoEssencia |
 *          ExpecificacaoAcessorio |
 *          ExpecificacaoCarvaoAluminio
 *      }
 * 
 * @returns {Produto[]} lista com todos os itens da mesma marca
*/
export async function GET(request: NextRequest) {
    /* obtem os parametros passados */
    const { searchParams } = request.nextUrl;

    /* obter o id do produto */
    const product_tipo: string | undefined = searchParams.get("product_tipo") || undefined;
    const product_especifications: string | undefined = searchParams.get("product_especifications") || undefined;

    if (!product_tipo) return NextResponse.json({
        mensage: 'Tipo do produto não indicado'
    }, { status: 400 });

    if (!product_especifications) return NextResponse.json({
        mensage: 'especificações do produto não indicada'
    }, { status: 400 });

    const especificacoesParse = JSON.parse(product_especifications)

    const Controller = new ProductController();

    let list_To_Return: Produto[] = [];

    try {
        switch (product_tipo) {
            case 'essencia': {
                list_To_Return = await Controller.getRelaciveProductsByEssencia(especificacoesParse as ExpecificacaoEssencia);

                break;
            }
            case 'acessorio': {
                list_To_Return = await Controller.getRelaciveProductsByAcessorio(especificacoesParse as ExpecificacaoAcessorio);

                break;
            }
            case 'carvaoAluminio': {
                list_To_Return = await Controller.getRelaciveProductsByCarvaoAluminio(especificacoesParse as ExpecificacaoCarvaoAluminio);

                break;
            }
            default: {
                break;
            }
        }
    } catch (e) {
        return NextResponse.json({ error: e }, { status: 500 })
    }

    if (list_To_Return.length > 0) {
        return NextResponse.json({
            mensage: 'No information',
            responseData: []
        }, {
            status: 200
        })
    } else {
        return NextResponse.json({
            mensage: 'itens obtidos com sucesso',
            responseData: list_To_Return
        }, {
            status: 200
        })
    }
}