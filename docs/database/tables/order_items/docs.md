## order_items

Tabela responsável por armazenar os itens de cada pedido.

---

### 📌 Responsabilidade

Relacionar produtos a pedidos, definindo quantidade e preço unitário no momento da compra.

---

### 🧱 Estrutura

| Campo      | Tipo    | Obrigatório | Default | Descrição                           |
| ---------- | ------- | ----------- | ------- | ----------------------------------- |
| order_id   | uuid    | sim         | —       | ID do pedido                        |
| product_id | uuid    | sim         | —       | ID do produto                       |
| quantity   | integer | sim         | —       | Quantidade do produto no pedido     |
| unit_price | numeric | sim         | —       | Preço unitário no momento da compra |

---

### ⚙️ Regras de Negócio

1. **Chave primária composta**:

   * `(order_id, product_id)`
   * Um produto não pode aparecer duas vezes no mesmo pedido

2. **Quantidade (`quantity`)**:

   * Deve ser maior que 0
   * Representa quantas unidades foram compradas

3. **Preço (`unit_price`)**:

   * Deve representar o valor no momento da compra
   * Não deve depender do valor atual em `products.valor`

4. **Imutabilidade implícita**:

   * Após o pedido ser finalizado, os itens não devem ser alterados
   * Garante consistência histórica

---

### ⚠️ Observações

* Não há constraint para garantir `quantity > 0`
* Não há validação automática para consistência com `orders.total`
* Alterações após a criação podem gerar divergência em relatórios

---

### 🔗 Dependências

* Utilizada por:

  * `get_product_conversion`

* Relacionamentos:

  * `orders.id`
  * `products.id`

---

### 💡 Boas práticas

* Sempre salvar `unit_price` no momento da compra (não usar valor atual do produto)
* Validar `quantity` na aplicação (ideal: adicionar constraint no banco futuramente)
* Garantir que `orders.total` seja consistente com:

  ```sql
  SUM(quantity * unit_price)
  ```
* Evitar updates após o pedido ser concluído

---

### 🚨 Pontos críticos

* Se `unit_price` estiver errado → faturamento fica errado
* Se `quantity` estiver errado → estoque e métricas quebram
* Se houver divergência com `orders.total` → relatórios inconsistentes

---
