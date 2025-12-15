import { NextRequest } from "next/server";

export const resolveProductId = async (request: NextRequest): Promise<string> => {
    const { searchParams } = request.nextUrl;

    const queryId = searchParams.get("productId");
    if (queryId) return queryId;

    try {
        const body = await request.json();
        if (body?.productId) return body.productId;

        if (body?.id) return body.id;
    } catch { }

    throw new Error("id do produto não informado");
};
