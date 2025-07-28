import { ProductController } from "@/controller/productContoller";
import { Filtro } from "@/controller/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const dadosDoFiltro = await new ProductController().getFilterData();

        return NextResponse.json(dadosDoFiltro, { status: 200 });
    } catch (e) {
        return NextResponse.json({
            message: "Não foi possivel obter os dados do filtro.",
        }, { status: 500 });
    }
}