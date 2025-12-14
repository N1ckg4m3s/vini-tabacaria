import { Produto } from "@/shered/shered.types"
import { NextRequest, NextResponse } from "next/server"

// --------------------
// Props basico dos Services
// --------------------
export type serviceProps = (request: NextRequest) => Promise<NextResponse>

// ========================================

// --------------------
// Parametros do repositorio
// --------------------
export type RepositoryParams = Array<{
    field: string
    op: "=" | "ilike" | "gte" | "lte" | "contains" | "overlaps"
    value: string | number | string[]
}>;