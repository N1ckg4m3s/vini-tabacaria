## products

Tabela principal do catálogo de produtos.

---

### 📌 Responsabilidade

Armazenar os produtos disponíveis no sistema, incluindo informações básicas, atributos dinâmicos e controle de visibilidade.

---

### 🧱 Estrutura

| Campo      | Tipo          | Obrigatório | Default           | Descrição                                     |
| ---------- | ------------- | ----------- | ----------------- | --------------------------------------------- |
| id         | uuid          | sim         | gen_random_uuid() | Identificador único do produto                |
| created_at | timestamptz   | sim         | now()             | Data de criação do registro                   |
| nome       | text          | sim         | —                 | Nome do produto                               |
| marca      | text          | não         | —                 | Marca do produto                              |
| valor      | numeric(10,2) | não         | —                 | Preço unitário                                |
| quantidade | integer       | não         | —                 | Estoque disponível                            |
| tipo       | text          | sim         | —                 | Categoria do produto                          |
| metadata   | jsonb         | sim         | `{}`              | Atributos dinâmicos (ex: sabor, cor, tamanho) |
| visible    | boolean       | sim         | true              | Define se o produto aparece no catálogo       |
| imagem     | text          | não         | —                 | URL da imagem do produto                      |

---

### ⚙️ Regras de Negócio

1. **Visibilidade**:

   * Apenas produtos com `visible = true` devem ser exibidos no catálogo.

2. **Identificação**:

   * `id` é a única referência confiável para operações internas.

3. **Label de exibição**:

   * Normalmente construído como: `marca + nome`
   * Se `marca` for nula, usar apenas `nome`

4. **Metadata**:

   * Estrutura flexível para filtros dinâmicos
   * Esperado formato:

     ```json
     {
       "sabor": ["menta", "uva"],
       "tamanho": ["grande"]
     }
     ```

5. **Estoque (`quantidade`)**:

   * Não há validação automática de estoque nesta tabela
   * Controle deve ser feito na lógica de aplicação

---

### ⚠️ Observações

* Não armazenar lógica de negócio diretamente nesta tabela
* Filtros complexos devem ser feitos via RPC (`catalog_products`, `catalog_filters`)
* `metadata` deve manter consistência de estrutura para evitar filtros inconsistentes

---

### 🔗 Dependências

* Utilizada por:

  * `catalog_products`
  * `catalog_filters`
  * `get_product_conversion`

* Relacionamentos:

  * `order_items.product_id`
  * `analytics_daily_product_views.product_id`
  * `analytics_daily_product_interest.product_id`

---

### 💡 Boas práticas

* Evitar campos duplicados que já existem em `metadata`
* Manter `marca` e `tipo` padronizados (evitar variações de texto)
* Validar dados antes de inserção (principalmente `metadata`)

---