import { NextRequest, NextResponse } from "next/server";

// Simulando um catálogo com 100 itens
const catalog = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`
}));

export function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl;
    
    // Adaptado aos parâmetros que você está usando
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limitPerPage = parseInt(searchParams.get("limit_per_page") || "10", 10);

    const totalItems = catalog.length;
    const totalPages = Math.ceil(totalItems / limitPerPage);

    const currentPage = Math.min(Math.max(page, 1), totalPages);

    const startIndex = (currentPage - 1) * limitPerPage;
    const endIndex = startIndex + limitPerPage;
    const paginatedItems = catalog.slice(startIndex, endIndex);

    return NextResponse.json(
        {
            currentPage,
            totalPages,
            totalItems,
            limitPerPage,
            items: paginatedItems
        },
        { status: 200 }
    );
}
