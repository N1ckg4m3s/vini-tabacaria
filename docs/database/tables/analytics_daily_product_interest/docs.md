## analytics_daily_product_interest

Tabela responsável por armazenar interações de interesse por produto, agregadas por dia.

---

### 📌 Responsabilidade

Registrar ações de intenção de compra, como adição e remoção de produtos, por dia.

---

### 🧱 Estrutura

| Campo         | Tipo    | Obrigatório | Default | Descrição                     |
| ------------- | ------- | ----------- | ------- | ----------------------------- |
| data          | date    | sim         | now()   | Data da agregação             |
| product_id    | uuid    | sim         | —       | ID do produto                 |
| added_count   | integer | sim         | 0       | Quantidade de adições no dia  |
| removed_count | integer | sim         | 0       | Quantidade de remoções no dia |

---

### ⚙️ Regras de Negócio

1. **Granularidade diária**:

   * Dados agregados por dia (`data`)
   * Não há registro individual de evento

2. **Chave primária composta**:

   * `(data, product_id)`
   * Um único registro por produto por dia

3. **Incremento de eventos**:

   * Atualização via upsert:

     * `added_count = added_count + 1`
     * `removed_count = removed_count + 1`

4. **Origem dos dados**:

   * Alimentado pela RPC: `log_product_intention`

5. **Tipos de evento**:

   * `add` → incremento em `added_count`
   * `remove` → incremento em `removed_count`

---

### ⚠️ Observações

* Não há distinção entre usuários únicos
* Não há garantia de ordem dos eventos (add/remove)
* Pode haver múltiplos eventos do mesmo usuário em sequência

---

### 🔗 Dependências

* Utilizada por:

  * `get_product_conversion`
  * `get_weekly_funnel`

* Relacionamentos:

  * `products.id`

---

### 💡 Boas práticas

* Garantir que eventos `add` e `remove` sejam disparados corretamente no backend
* Evitar chamadas duplicadas (ex: múltiplos cliques)
* Validar fluxo de carrinho para não gerar eventos inconsistentes

---

### 🚨 Pontos críticos

* Alto `added_count` com baixo `orders` → problema de conversão
* Alto `removed_count` → possível fricção no carrinho
* Dados inflados → decisões erradas sobre interesse real

---

### 🧠 Interpretação correta

* `added_count` indica interesse inicial
* `removed_count` indica desistência ou indecisão
* Diferença entre ambos pode indicar:

  ```txt
  interesse líquido ≈ added_count - removed_count
  ```

⚠️ Essa métrica é aproximada, não representa estado real do carrinho.

---

### ⚠️ Limitações do modelo

* Não representa estado atual do carrinho
* Não permite reconstruir jornada do usuário
* Não diferencia sessões ou usuários únicos

---
