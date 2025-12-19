import { NextRequest, NextResponse } from "next/server";
import { BadRequestError, NotFoundError } from "./error/erros.handle";

export function createRoute(handler: (req: NextRequest) => Promise<any>) {
    return async (req: NextRequest) => {
        try {
            const result = await handler(req);
            return NextResponse.json(result, { status: 200 });
        } catch (e) {
            if (e instanceof BadRequestError)
                return NextResponse.json({ error: e.message }, { status: 400 });

            if (e instanceof NotFoundError)
                return NextResponse.json({ error: e.message }, { status: 404 });

            console.error(e);
            return NextResponse.json({ error: "Erro interno" }, { status: 500 });
        }
    };
}
