import { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import { supabase } from "./dataBase/supraConnection";
import { mapProduto, mapProdutoAcessorio, mapProdutoBase, mapProdutoCarvaoAluminio, mapProdutoEssencia, mapProdutoOutros } from "./mapProducts";
import { ExpecificacaoAcessorio, ExpecificacaoCarvaoAluminio, ExpecificacaoEssencia, Filtro, Produto, ProdutoAcessorio, ProdutoBase, ProdutoCarvaoAluminio } from "./types";
import regisController from "./dataBase/regisController";

/* ========== [ types com nomes legiveisa ] ========== */

type ProdutoQueryBuilder = PostgrestFilterBuilder<any, any, ProdutoBase[], string, unknown>;

type QueryPromise = Promise<Produto[] | null>

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
                return data.map((e) => mapProduto(e, true));
            }

            // Se for objeto único, mapeia 
            const mapData = mapProduto(data, true);

            return Array.isArray(mapData) ? mapData : [mapData];;
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

    /**
     * Tenta obter todos os produtos do cache
     * @param productId 
     */
    private async getCachedProducts(productId: string): Promise<Produto[]> {
        const Produtos = await regisController.getCache({ key: `produtos:all` })

        return Produtos ? (Array.isArray(Produtos) ? Produtos : [Produtos]) : [];
    }

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

    /* ==================== [ GET ] ==================== */
    /**
     * Obtem todos os produtos do Banco
     * 
     * @cache {1 hora}
     * 
     * @param {string} productType? - tipo do produto a se obter 
     * @returns 
    */
    public async getAllProducts(productType?: string) {
        const cacheKey = productType ? `produtos:all:${productType}` : `produtos:all`;

        try {
            const cached = await this.getCachedProducts(cacheKey)
            if (cached) {
                return Array.isArray(cached) ? cached : [cached];
            }
            const produtos = await this.fetchProdutos(productType ? { tipo: productType } : undefined);

            // Salva no cache (se achar relevante)
            if (produtos) {
                await regisController.setCache({
                    key: cacheKey,
                    value: produtos,
                    ttlSeconds: 3600 // 1 hora
                });
            }

            return Array.isArray(produtos) ? produtos : [];
        } catch (e) {
            console.error(`[ProductController] getAllProducts | Erro: ${e}`);
            return [];
        }
    }

    /**
     * Obtem os itens do cache e retorna os produtos paginados
     * 
     * @cache {1 hora}
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

            const Produtos = await this.getAllProducts(productType);
            if (Produtos.length === 0) {
                return [];
            }

            const paginado = Produtos.slice(from, to + 1);
            if (paginado.length === 0) {
                return []
            }

            return Array.isArray(paginado) ? paginado : [];
        } catch (e) {
            console.error(`[ProductController] getAllProductsByPage | Erro: ${e}`);
            return [];
        }
    }

    /**
     * Obtem  um produto especifico com base no id
     * 
     * @cache {1 hora}
     * 
     * @param {number} productId -- id do produto a se obter
     * @returns {Produto[] | null}
    */
    public async getProductById(productId: string) {
        const cacheKey = `produto:${productId}`;
        try {
            // Tenta obter do cache
            const cached = await regisController.getCache({ key: cacheKey });
            if (cached) {
                return Array.isArray(cached) ? cached : [cached];
            }

            const produto = await this.fetchProdutos({ id: productId });

            if (produto) {
                await regisController.setCache({ key: cacheKey, value: produto });
            }

            return produto;
        } catch (e) {
            console.error(`[ProductController] getProductById | Erro: ${e}`);
            return null;
        }
    }

    /**
     * Gera os dados do Filtro com base no tipo de produto.
     * 
     * @cache {10 minutos}
     * 
     * @param {string?} tipo - o tipo do produto 
     * @returns 
     */
    public async getFilterData(tipo?: string): Promise<Record<string, Set<string>> | [] | Filtro[]> {
        const cacheKey = `filtros:tipo:${tipo ?? 'todos'}`;

        try {
            const cached = await regisController.getCache({ key: cacheKey });
            if (cached) return cached;

            const produtos = await this.getAllProducts(tipo);
            const filtros: Record<string, Set<string>> = {};

            if (!produtos || produtos.length === 0) return [];

            for (const produto of produtos) {
                // [BASE] Marca
                filtros['Marca'] ??= new Set();
                filtros['Marca'].add(produto.marca);

                switch (produto.tipo) {
                    case 'essencia':
                        if (tipo == 'essencias') {
                            filtros['Tipo'] ??= new Set();
                            filtros['Sabor'] ??= new Set();
                            filtros['Mix'] ??= new Set();

                            filtros['Tipo'].add(produto.especificacao.tipo);
                            filtros['Sabor'].add(produto.especificacao.sabor);

                            const isMix = produto.especificacao.sabor.includes(',');
                            filtros['Mix'].add(isMix ? 'Sim' : 'Não');
                            break;
                        }

                    case 'acessorio':
                        if (tipo == 'acessorio') {
                            filtros['Tipo'] ??= new Set();
                            filtros['Cor'] ??= new Set();
                            filtros['Tamanho'] ??= new Set();

                            filtros['Tipo'].add(produto.especificacao.tipo);
                            filtros['Cor'].add((produto as ProdutoAcessorio).especificacao.cor);
                            filtros['Tamanho'].add((produto as ProdutoAcessorio).especificacao.tamanho);
                            break;
                        }

                    case 'carvaoAluminio':
                        if (tipo == 'carvaoAluminio') {
                            filtros['Kit'] ??= new Set();
                            filtros['Kit'].add((produto as ProdutoCarvaoAluminio).especificacao.kit);
                            break;
                        }
                }
            }

            // Converte o objeto de sets para array de Filtros
            const resultado: Filtro[] = Object.entries(filtros).map(([titulo, set]) => ({
                titulo,
                opcoes: Object.fromEntries([...set].map(opcao => [opcao, false])),
            }));

            // 3. Armazena no cache
            await regisController.setCache({ key: cacheKey, value: resultado, ttlSeconds: 600 }); // 10 min, ajustável

            return resultado;

        } catch (error) {
            console.error(`[ProductController] obterDadosDoFiltro | Erro: ${error}`);
        }
        return []
    }

    /**
     * Obtem os produtos relativos a Marca
     * 
     * @cache {10 minutos}
     * 
     * @param {string} marca - nome da marca
     * @returns {Promise<Produto[]>} - lista de produtos relativos a marca
    */
    public async getProductsByMarca(marca: string): Promise<Produto[]> {
        const cacheKey = `produtos:marca:${marca}`;

        try {
            // 1. Verifica se já está no cache
            const cached = await regisController.getCache({ key: cacheKey });
            if (cached) return Array.isArray(cached) ? cached : [cached];

            // 2. Gera query para produtos da marca (sem limitar a 'essencia')
            let query = this.generateQueryWithFiltro(tables.produtos);
            query = query.eq('marca', marca);

            const data = await this.executeProdutoQuery(query);

            console.log(`[ProductController] getProductsByMarca | Marca: ${marca}, Produtos encontrados: ${data?.length || 0}`);

            if (!data) return [];

            const produtos = Array.isArray(data) ? data : [data];

            // 3. Salva no cache
            await regisController.setCache({ key: cacheKey, value: produtos, ttlSeconds: 600 }); // 10 min

            return produtos;
        } catch (error) {
            console.error(`[ProductController] getProductsByMarca | Erro: ${error}`);
            return [];
        }
    }

    /**
     * Obtem os produtos relativos a Acessorio
     * 
     * @param {ExpecificacaoAcessorio} especificacoes - especificações do acessório
     * @returns {Promise<Produto[]>} - lista de produtos relativos ao acessório
    */
    public async getRelaciveProductsByAcessorio(especificacoes: ExpecificacaoAcessorio): Promise<Produto[]> {
        try {
            // Obtém acessórios do cache
            const produtos = await this.getAllProducts('acessorio');

            const filtrados = produtos.filter((produto: Produto) => {
                if (produto.tipo !== 'acessorio') return false;

                const matchTipo = !especificacoes.tipo || produto.especificacao.tipo === especificacoes.tipo;
                const matchCor = !especificacoes.especificacao.cor || produto.especificacao.cor === especificacoes.especificacao.cor;
                const matchTamanho = !especificacoes.especificacao.tamanho || produto.especificacao.tamanho === especificacoes.especificacao.tamanho;
                return matchTipo && matchCor && matchTamanho;
            });

            if (filtrados.length === 0) {
                console.warn(`[ProductController] getRelaciveProductsByAcessorio | Nenhum produto encontrado com as especificações fornecidas.`);
            }

            return filtrados;
        } catch (error) {
            console.error(`[ProductController] getRelaciveProductsByAcessorio | Erro: ${error}`);
            return [];
        }
    }

    /**
     * Obtem os produtos relativos a Essencia
     * 
     * @param {ExpecificacaoEssencia} especificacoes - especificações da essência
     * @returns {Promise<Produto[]>} - lista de produtos relativos a essência
    */
    public async getRelaciveProductsByEssencia(especificacoes: ExpecificacaoEssencia): Promise<Produto[]> {
        try {
            const produtos = await this.getAllProducts('essencia');

            const filtrados = produtos.filter((produto: Produto) => {
                if (produto.tipo !== 'essencia') return false;

                const tipo = produto.especificacao.tipo;
                const sabor = produto.especificacao.sabor;

                const matchTipo = !especificacoes.especificacao.tipo
                    || (especificacoes.especificacao.tipo.includes(',')
                        ? tipo.includes(especificacoes.especificacao.tipo)
                        : tipo === especificacoes.especificacao.tipo);

                const matchSabor = !especificacoes.especificacao.sabor
                    || (especificacoes.especificacao.sabor.includes(',')
                        ? sabor.includes(especificacoes.especificacao.sabor)
                        : sabor === especificacoes.especificacao.sabor);

                return matchTipo && matchSabor;
            });

            if (filtrados.length === 0) {
                console.warn(`[ProductController] getRelaciveProductsByEssencia | Nenhum produto encontrado com as especificações fornecidas.`);
            }

            return filtrados;
        } catch (error) {
            console.error(`[ProductController] getRelaciveProductsByEssencia | Erro: ${error}`);
            return [];
        }
    }

    /**
     * Obtem os produtos relativos a Carvão Alumínio
     * 
     * @param {ExpecificacaoCarvaoAluminio} especificacoes - especificações do carvão alumínio
     * @returns {Promise<Produto[]>} - lista de produtos relativos ao carvão alumínio
    */
    public async getRelaciveProductsByCarvaoAluminio(especificacoes: ExpecificacaoCarvaoAluminio): Promise<Produto[]> {
        try {
            const produtos = await this.getAllProducts('carvaoAluminio');

            const filtrados = produtos.filter((produto: Produto) => {
                if (produto.tipo !== 'carvaoAluminio') return false;

                const matchKit = !especificacoes.especificacao.kit || produto.especificacao.kit === especificacoes.especificacao.kit;
                return matchKit;
            });

            if (filtrados.length === 0) {
                console.warn(`[ProductController] getRelaciveProductsByCarvaoAluminio | Nenhum produto encontrado com as especificações fornecidas.`);
            }

            return filtrados;
        } catch (error) {
            console.error(`[ProductController] getRelaciveProductsByCarvaoAluminio | Erro: ${error}`);
            return [];
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