import { ProductController } from '@/controller/productContoller';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    // Verifica se o usuário está autenticado
    const token = request.cookies.get('authToken')?.value

    if (!token) {
        return NextResponse.json({ error: 'Usuário não autenticado' }, { status: 401 });
    }

    try {
        // obtem os dados do produto do corpo da requisição
        const productData = await request.json();

        await new ProductController().registerProduct(productData);
        return NextResponse.json({ message: 'Produto registrado com sucesso' }, { status: 200 });
    } catch (error: any) {
        console.error('[admin_product_register] Erro ao registrar produto:', error);

        // Se for erro de validação de dados (ex: campos obrigatórios)
        if (error.name === 'ValidationError') {
            return NextResponse.json({ error: 'Dados inválidos' }, { status: 422 });
        }

        // Se for erro por duplicidade ou conflito
        if (error.code === 'PRODUCT_EXISTS') {
            return NextResponse.json({ error: 'Produto já existe' }, { status: 409 });
        }

        // Erro genérico do servidor
        return NextResponse.json({ error: 'Erro interno ao registrar produto' }, { status: 500 });
    }
}