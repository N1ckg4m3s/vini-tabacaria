## orders

Tabela responsável por armazenar os pedidos realizados no sistema.

---

### 📌 Responsabilidade

Registrar cada pedido efetuado, incluindo valor total, status e momento da criação.

---

### 🧱 Estrutura

| Campo      | Tipo        | Obrigatório | Default           | Descrição                        |
| ---------- | ----------- | ----------- | ----------------- | -------------------------------- |
| id         | uuid        | sim         | gen_random_uuid() | Identificador único do pedido    |
| created_at | timestamptz | sim         | now()             | Data e hora de criação do pedido |
| total      | numeric     | não         | —                 | Valor total do pedido            |
| status     | text        | não         | —                 | Status atual do pedido           |

---

### ⚙️ Regras de Negócio

1. **Identificação**:

   * `id` é a única referência confiável do pedido.

2. **Valor (`total`)**:

   * Representa o valor final do pedido
   * Deve ser consistente com a soma dos itens em `order_items`
   * Não é recalculado automaticamente

3. **Status**:

   * Define o estado do pedido (ex: `pending`, `completed`, `canceled`)
   * Apenas pedidos com `status = 'completed'` devem ser considerados em métricas e relatórios

4. **Data (`created_at`)**:

   * Utilizada como base para:

     * relatórios diários
     * métricas de faturamento
     * gráficos de evolução

---

### ⚠️ Observações

* Não há validação automática de consistência entre `orders.total` e `order_items`
* O campo `status` não possui enum definido → risco de inconsistência de valores
* Alterações de status devem ser controladas pela aplicação (não diretamente no banco)

---

### 🔗 Dependências

* Utilizada por:

  * `get_dashboard_today`
  * `get_week_revenue`
  * `get_weekly_funnel`
  * `get_product_conversion`

* Relacionamentos:

  * `order_items.order_id`

---

### 💡 Boas práticas

* Padronizar valores de `status` (ideal: enum ou validação na aplicação)
* Garantir que `total` seja atualizado corretamente no momento da finalização do pedido
* Evitar alterações diretas após o pedido ser concluído
* Validar timezone ao usar `created_at` para relatórios

---
