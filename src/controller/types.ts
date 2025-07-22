// Campos base
export interface ProdutoBase {
    id: string;
    nome: string;
    marca: string;
    valor: number;
    tipo: string;
    imagem?: string
}

// --------- ESSÊNCIA ---------

export interface ProdutoEssencia extends ProdutoBase {
    tipo: 'essencia';
    especificacao: {
        tipo: string;
        sabor: string;
    };
}

// --------- ACESSÓRIO ---------

export interface ProdutoAcessorio extends ProdutoBase {
    tipo: 'acessorio';
    especificacao: {
        tipo: string;
        cor: string;
        tamanho: string;
    };
}

// --------- CARVÃO / ALUMÍNIO ---------
export interface ProdutoCarvaoAluminio extends ProdutoBase {
    tipo: 'carvaoAluminio';
    especificacao: {
        kit: string;
    };
}

// --------- OUTROS / FUTURO ---------

export interface ProdutoOutros extends ProdutoBase {
    tipo: 'outros';
    especificacao: Record<string, unknown>; // ou algo mais genérico/flexível
}

// --------- PRODUTO FINAL UNIFICADO ---------

export type Produto =
    | ProdutoEssencia
    | ProdutoAcessorio
    | ProdutoCarvaoAluminio
    | ProdutoOutros;
