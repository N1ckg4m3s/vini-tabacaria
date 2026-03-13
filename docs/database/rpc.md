# Funções RCP

Banco utilizado: Supabase (PostgreSQL)

Este documento descreve:

- Estrutura das funções
- Funções RPC utilizadas pela aplicação

## RPC: catalog_products

Retorna os produtos disponíveis no catálogo com base nos filtros fornecidos.  
A paginação é feita pelo backend (fora da função).

### Parâmetros

| Nome     | Tipo   | Default | Descrição                                                                                                   |
| -------- | ------ | ------- | ----------------------------------------------------------------------------------------------------------- |
| p_tipos  | text[] | NULL    | Lista de tipos/categorias de produtos para filtrar. Se NULL, inclui todos.                                  |
| p_marcas | text[] | NULL    | Lista de marcas para filtrar. Se NULL, inclui todas.                                                        |
| p_meta   | jsonb  | NULL    | Filtros adicionais armazenados no campo `metadata`. Deve ser no formato `{ "chave": ["valor1","valor2"] }`. |

### Retorno

- SETOF products  
Todos os campos da tabela `products` que atendem aos filtros.

### Regras de Negócio

1. **Visibilidade**: retorna apenas produtos com `visible = true`.  
2. **Hierarquia de filtros**:  
   - `p_tipos` filtra a categoria do produto.  
   - `p_marcas` filtra marcas, **mas só dentro dos tipos selecionados**.  
   - `p_meta` filtra atributos do JSON, **mas só dentro dos produtos que passaram pelos filtros anteriores**.  
3. Se qualquer parâmetro for NULL, o filtro correspondente é ignorado.  
4. O filtro `metadata` faz correspondência entre cada chave do JSON e os valores permitidos (usando `?|` para arrays).  

### SQL

```sql
    CREATE FUNCTION catalog_products(
        p_tipos text[] DEFAULT NULL,
        p_marcas text[] DEFAULT NULL,
        p_meta jsonb DEFAULT NULL
    )
        RETURNS SETOF products
        LANGUAGE sql
        AS $$
        SELECT * FROM products p
        WHERE p.visible = true
        AND (
            p_tipos IS NULL
            OR p.tipo = ANY(p_tipos)
        )
        AND (
            p_marcas IS NULL
            OR p.marca = ANY(p_marcas)
        )
        AND (
            p_meta IS NULL
            OR NOT EXISTS (
                SELECT 1
                FROM jsonb_each(p_meta) f
                WHERE NOT (
                    p.metadata -> f.key ?| (
                    SELECT array_agg(value)
                    FROM jsonb_array_elements_text(f.value)
                    )
                )
            )
        );
    $$;
```

---

## RPC: catalog_filters

Retorna a contagem de produtos agrupados por chave/valor para montar filtros no front, respeitando a hierarquia: tipos → marcas → metadata.

### Parâmetros

| Nome     | Tipo   | Default | Descrição                               |
| -------- | ------ | ------- | --------------------------------------- |
| p_tipos  | text[] | NULL    | Lista de tipos/categorias para filtrar. |
| p_marcas | text[] | NULL    | Lista de marcas para filtrar.           |

### Retorno

| Campo | Tipo   | Descrição                                              |
| ----- | ------ | ------------------------------------------------------ |
| key   | text   | Nome da chave de filtro (tipo, marca ou metadata).     |
| value | text   | Valor correspondente à chave.                          |
| count | bigint | Quantidade de produtos que correspondem a esse filtro. |

### Regras de Negócio

1. Retorna apenas produtos com `visible = true`.  
2. **Hierarquia de filtros**:
   - `p_tipos` filtra primeiro a categoria.  
   - `p_marcas` filtra marcas **dentro dos tipos selecionados**.  
   - Filtros de metadata são agregados e retornados **apenas para produtos que passaram pelos filtros acima**.  
3. O resultado é usado para montar o front-end de filtros dinâmicos, com contagem de produtos.  
4. Metadata considera apenas campos do tipo array (`jsonb_typeof(value) = 'array'`).  

### SQL

```sql
    CREATE OR REPLACE FUNCTION catalog_filters (
        p_tipos text[] default null,
        p_marcas text[] default null
    ) 
        RETURNS TABLE (key text, value text, count bigint)
        LANGUAGE sql
        AS $$
            WITH filtered_products AS (
            SELECT * FROM products
            WHERE visible = true
            AND (
                p_tipos IS NULL
                OR array_length(p_tipos,1) IS NULL
                OR tipo = ANY(p_tipos)
            )
            AND (
                p_marcas IS NULL
                OR array_length(p_marcas,1) IS NULL
                OR marca = ANY(p_marcas)
            )
        ),

        metadata_values AS (
            SELECT
                key,
                jsonb_array_elements_text(value) AS value
                FROM filtered_products,
            jsonb_each(metadata)
            WHERE jsonb_typeof(value) = 'array'
        ),

        column_values AS (
            SELECT 'marca' as key, marca as value
                FROM filtered_products
            WHERE marca IS NOT NULL

            UNION ALL

            SELECT 'tipo' as key, tipo as value
                FROM filtered_products
            WHERE tipo IS NOT NULL
        )

        SELECT
            key,
            value,
            COUNT(*) as count
        FROM (
            SELECT * FROM metadata_values
            UNION ALL
            SELECT * FROM column_values
        ) all_filters
        GROUP BY key, value
        ORDER BY key, count DESC;
    $$;
```

---
