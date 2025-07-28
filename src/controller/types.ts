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

export interface ExpecificacaoEssencia {
    tipo: 'essencia';
    especificacao: {
        tipo: string;
        sabor: string;
    };
}

export type ProdutoEssencia = ExpecificacaoEssencia & ProdutoBase;

// --------- ACESSÓRIO ---------

export interface ExpecificacaoAcessorio {
    tipo: 'acessorio';
    especificacao: {
        tipo: string;
        cor: string;
        tamanho: string;
    };
}

export type ProdutoAcessorio = ExpecificacaoAcessorio & ProdutoBase;

// --------- CARVÃO / ALUMÍNIO ---------
export interface ExpecificacaoCarvaoAluminio {
    tipo: 'carvaoAluminio';
    especificacao: {
        kit: string;
    };
}

export type ProdutoCarvaoAluminio = ExpecificacaoCarvaoAluminio & ProdutoBase;

// --------- OUTROS / FUTURO ---------

export interface ExpecificacaoOutros {
    tipo: 'outros';
    especificacao: Record<string, unknown>; // ou algo mais genérico/flexível
}
export type ProdutoOutros = ExpecificacaoOutros & ProdutoBase;

// --------- PRODUTO FINAL UNIFICADO ---------

export type Produto =
    ProdutoEssencia
    | ProdutoAcessorio
    | ProdutoCarvaoAluminio
    | ProdutoOutros;

// --------- AUX ---------

export type Filtro = {
    titulo: string;
    opcoes: Record<string, boolean>;
};