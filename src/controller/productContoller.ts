import { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import { supabase } from "./dataBase/supraConnection";
import { mapProduto, mapProdutoAcessorio, mapProdutoBase, mapProdutoCarvaoAluminio, mapProdutoEssencia, mapProdutoOutros } from "./mapProducts";
import { Produto, ProdutoBase } from "./types";

/* ========== [ types com nomes legiveisa ] ========== */

type ProdutoQueryBuilder = PostgrestFilterBuilder<any, any, ProdutoBase[], string, unknown>;

type QueryPromise = Promise<Produto[] | Produto | null>

type FilterType = Partial<{
    tipo: string;
    id: string;
}>;

const selectAllItens = `
  *,
  essencias (
    sabor,
    tipo_essencia
  ),
  acessorios (
    tipo_acessorio,
    cor,
    tamanho
  ),
  carvao_aluminio (
    kit
  ),
  outros (
    especificacao
  )
`;

const allTables = 'produtos, essencias, acessorios, carvao_aluminio, outros';

const tables = {
    produtos: 'produtos',
    essencias: 'essencias',
    acessorios: 'acessorios',
    carvao_aluminio: 'carvao_aluminio',
    outros: 'outros'
}

export class ProductController {
    /* ==================== [ AUX ] ==================== */
    /* Executa a quety e transforma o retorno */
    private async executeProdutoQuery(query: ProdutoQueryBuilder): QueryPromise {
        try {
            const { data, error } = await query;

            if (error) {
                console.error('[executeProdutoQuery] Erro na query:', error);
                throw new Error(`Erro na execução da query: ${error.message}`);
            }

            if (!data) {
                console.warn('[executeProdutoQuery] Nenhum dado retornado.');
                return null;
            }
            

            // Se for um array, mapeia todos
            if (Array.isArray(data)) {
                return data.map((e) => mapProduto(e,true));
            }

            // Se for objeto único, mapeia direto
            return mapProduto(data);
        } catch (err: any) {
            console.error('[executeProdutoQuery] Falha inesperada:', err.message || err);
            throw new Error('Erro inesperado ao buscar produtos.');
        }
    }


    /* Gera uma query com os dados do filtro retornando a query */
    private generateQueryWithFiltro(table: string, filtro?: FilterType): ProdutoQueryBuilder {

        let query = supabase.from(table).select(selectAllItens);

        if (filtro?.tipo) query = query.eq('tipo', filtro.tipo);
        if (filtro?.id) query = query.eq('id', filtro.id);

        return query;
    }

    /**
     * Retorna apenas os dados de especificação do produto
     * 
     * @param {ProdutoBase} product - O produto base a ser transformado
     * @returns {Produto} - O produto com especificações
    */
    private mapProductEspecification(product: ProdutoBase): Produto {
        switch (product.tipo) {
            case 'essencia':
                return mapProdutoEssencia(product);
            case 'acessorio':
                return mapProdutoAcessorio(product);
            case 'carvaoAluminio':
                return mapProdutoCarvaoAluminio(product);
            case 'outros':
                return mapProdutoOutros(product);
            default:
                throw new Error(`Tipo de produto desconhecido: ${product.tipo}`);
        }
    }

    /* ==================== [ GET ] ==================== */
    /**
     * padroniza a obtenção de todos os itens do Banco
     * 
     * @param {FilterType} filtro -- filtro da busca dos produtos 
     * @returns {QueryPromise}
     *  - lista com produtos
     *  - produto unico
     *  - null // nada encontrado
     */
    private async fetchProdutos(filtro?: FilterType): QueryPromise {
        let query = this.generateQueryWithFiltro(tables.produtos, filtro);

        return await this.executeProdutoQuery(query);
    }

    /**
     * Obtem todos os produtos do Banco
     * 
     * @param {string} productType? - tipo do produto a se obter 
     * @returns 
    */
    public async getAllProducts(productType?: string) {
        try {
            const produtos = await this.fetchProdutos(productType ? { tipo: productType } : undefined);
            return Array.isArray(produtos) ? produtos : [];
        } catch (e) {
            console.error(`[ProductController] getAllProducts | Erro: ${e}`);
            return [];
        }
    }

    /**
     * Obtem os itens no banco com base em uma paginação
     * 
     * Paginação direta no banco, fora do fetchProdutos padrão
     * 
     * @param {number} from? - index inicio 
     * @param {number} to? - index fim
     * @param {string} productType? - tipo do produto a se obter 
     * @returns {Produto[] | null}
    */
    public async getAllProductsByPage(from: number, to: number, productType?: string) {
        try {
            /* Validando se o From e To estão concisos */
            if (from < 0 || to < from) {
                throw new Error("Intervalo de paginação inválido.");
            }

            let query = this.generateQueryWithFiltro(tables.produtos, productType ? { tipo: productType } : undefined);

            query = query.range(from, to);

            const produtos: Produto | Produto[] | null = await this.executeProdutoQuery(query);

            return Array.isArray(produtos) ? produtos : [];
        } catch (e) {
            console.error(`[ProductController] getAllProductsByPage | Erro: ${e}`);
            return [];
        }
    }

    /**
     * Obtem  um produto especifico com base no id
     * 
     * @param {number} productId -- id do produto a se obter
     * @returns {Produto[] | null}
    */
    public async getProductById(productId: string) {
        try {
            const produto = await this.fetchProdutos({ id: productId });
            return produto;
        } catch (e) {
            console.error(`[ProductController] getProductById | Erro: ${e}`);
            return null;
        }
    }

    /* ==================== [ PUT ] ==================== */

    /* ==================== [ POST ] ==================== */
    /**
     * Registra um produto base no banco de dados
     * 
     * @param {ProdutoBase} mappedData - Dados do produto base mapeados
     * @returns {Promise<number>} - Retorna o ID do produto registrado
    */
    public async registerBaseProduct(mappedData: any): Promise<number> {
        try {
            console.log(mappedData)

            const { data, error } = await supabase.from(tables.produtos)
                .insert(mappedData)
                .select('id')
                .single();

            if (error) {
                throw error;
            }
            console.log('3')

            return data.id;
        } catch (error: any) {
            console.error(`[ProductController] registerBaseProduct | Erro: ${error.message}`);
            throw new Error("Erro ao registrar o produto base.");
        }
    }

    /**
     * Registra as especificações de um produto no banco de dados
     * 
     * @param {number} baseId - ID do produto base
     * @param {Produto} mappedData - Dados de especificação do produto mapeados
     * @returns {Promise<void>}
    */
    public async registerProductEspecifications(baseId: number, mappedData: Produto) {
        try {
            // Verifica se o tipo de produto está definido
            const typeProduto: string = mappedData.tipo;

            // iniciar a query
            let query;

            // definir na query de acordo com o tipo de produto
            switch (typeProduto) {
                case 'essencia':
                    query = supabase.from(tables.essencias);
                    break;
                case 'acessorio':
                    query = supabase.from(tables.acessorios);
                    break;
                case 'carvaoAluminio':
                    query = supabase.from(tables.carvao_aluminio);
                    break;
                case 'outros':
                    query = supabase.from(tables.outros);
                    break;
                default:
                    throw new Error(`Tipo de produto desconhecido: ${typeProduto}`);
            }

            // inserir os dados de especificação
            const { error } = await query
                .insert({ ...mappedData, produto_id: baseId })
                .select('id')
                .single();
            
            // Verifica se houve erro na inserção
            if (error) {
                console.error(`[ProductController] registerProductEspecifications | Erro ao inserir especificações`);
                throw error;
            }
        } catch (error) {
            console.error(`[ProductController] registerProductEspecifications | Erro: ${error}`);
            throw new Error("Erro ao registrar as especificações do produto.");
        }
    }

    /**
     * Registra um produto no banco de dados
     * 
     * @param {any} data - Dados do produto a serem registrados
     * @returns {Promise<void>}
    */
    public async registerProduct(data: any) {
        // Obtem os dados base do produto do corpo da requisição
        let DadosBase: ProdutoBase | {} = mapProdutoBase(data, true);
        const DadosEspecificacao: Produto | {} = this.mapProductEspecification(data);

        // validar se tem os dados dentro de ambos
        if (Object.keys(DadosBase).length === 0 || Object.keys(DadosEspecificacao).length === 0) {
            throw new Error("Dados do produto inválidos ou incompletos.");
        }

        // evitar erro, adicionando o tipo
        if (Object.keys(DadosBase).length > 0) {
            if (!('tipo' in DadosBase) || !DadosBase.tipo) {
                (DadosBase as ProdutoBase).tipo = data.tipo;
            }

            if (typeof (DadosBase as ProdutoBase).imagem !== 'string') {
                (DadosBase as ProdutoBase).imagem = '';
            }

            // Remove id
            delete (DadosBase as any).id;
        }

        // Salvar os dados base do produto
        const id: number = await this.registerBaseProduct(DadosBase);

        // Salvar os dados de especificação do produto
        this.registerProductEspecifications(id, DadosEspecificacao as Produto);
    }

    /* ==================== [ DELETE ] ==================== */
}