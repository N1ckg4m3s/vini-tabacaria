import { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import { supabase } from "./dataBase/supraConnection";
import { mapProduto } from "./mapProducts";
import { Produto, ProdutoBase } from "./types";

/* ========== [ types com nomes legiveisa ] ========== */

type ProdutoQueryBuilder = PostgrestFilterBuilder<any, any, ProdutoBase[], string, unknown>;

type QueryPromise = Promise<Produto[] | Produto | null>

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

export class ProductController {
    /* Executa a quety e transforma o retorno */
    private async executeProdutoQuery(query: ProdutoQueryBuilder): QueryPromise {
        const { data, error } = await query;

        if (error) throw error;

        if (Array.isArray(data)) return data.map(mapProduto);
        if (data) return mapProduto(data);

        return null
    }
    /* Gera uma query com os dados do filtro retornando a query */
    private generateQueryWithFiltro(filtro?: Partial<{ tipo: string; id: string }>):
        ProdutoQueryBuilder {

        let query = supabase.from('produtos').select(selectAllItens);

        if (filtro?.tipo) query = query.eq('tipo', filtro.tipo);
        if (filtro?.id) query = query.eq('id', filtro.id);

        return query;
    }

    /**
     * padroniza a obtenção de todos os itens do Banco
     * 
     * @param {Partial<{ tipo: string; id: string }>} filtro -- filtro da busca dos produtos 
     * @returns {QueryPromise}
     *  - lista com produtos
     *  - produto unico
     *  - null // nada encontrado
     */
    private async fetchProdutos(filtro?: Partial<{ tipo: string; id: string }>): QueryPromise {
        let query = this.generateQueryWithFiltro(filtro);

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

            let query = this.generateQueryWithFiltro(productType ? { tipo: productType } : undefined);

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

    /* ==================== [ DELETE ] ==================== */
}