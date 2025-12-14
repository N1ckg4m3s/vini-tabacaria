import { catalogService } from "@/server/catalog/catalog.service";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const service = new catalogService()

    return await service.obterDadosParaFiltragem(request)
}
