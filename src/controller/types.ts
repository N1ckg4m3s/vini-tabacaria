// Tipo discriminador
type TipoProduto = 'essencia' | 'acessorio' | 'carvaoAluminio' | 'outros';

// Campos base
interface ProdutoBase {
    id: string;
    nome: string;
    marca: string;
    valor: number;
    tipo: TipoProduto;
    imagem?: string
}

// --------- ESSÊNCIA ---------

type TipoEssencia = 'Doce' | 'Citrica' | 'Gelada' | 'Quente' | 'Mentolada';

interface ProdutoEssencia extends ProdutoBase {
    tipo: 'essencia';
    especificacao: {
        tipo: TipoEssencia[];
        sabor: string;
    };
}

// --------- ACESSÓRIO ---------

type TipoAcessorio = 'Rosh' | 'Vaso' | 'Borracha' | 'Corpo' | 'Prato' | 'Mangueira' | 'Contra' | 'Piteira' | 'Mangueira' | 'Bolinha' | 'Outros';
type TamanhoAcessorio = 'Grade' | 'Pequeno' | 'Medio' | 'Padrão';

interface ProdutoAcessorio extends ProdutoBase {
    tipo: 'acessorio';
    especificacao: {
        tipo: TipoAcessorio;
        cor: string;
        tamanho: TamanhoAcessorio;
    };
}

// --------- CARVÃO / ALUMÍNIO ---------

type TipoKit = 'Unidade' | '250g' | 'MeioKilo' | 'Kilo' | 'Box' | 'Pacote';

interface ProdutoCarvaoAluminio extends ProdutoBase {
    tipo: 'carvaoAluminio';
    especificacao: {
        kit: TipoKit;
    };
}

// --------- OUTROS / FUTURO ---------

interface ProdutoOutros extends ProdutoBase {
    tipo: 'outros';
    especificacao: Record<string, unknown>; // ou algo mais genérico/flexível
}

// --------- PRODUTO FINAL UNIFICADO ---------

export type Produto =
    | ProdutoEssencia
    | ProdutoAcessorio
    | ProdutoCarvaoAluminio
    | ProdutoOutros;
