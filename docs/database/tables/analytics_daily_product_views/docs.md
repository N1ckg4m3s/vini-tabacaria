## analytics_daily_product_views

Tabela responsável por armazenar a quantidade de visualizações de produtos por dia.

---

### 📌 Responsabilidade

Registrar o número de visualizações de cada produto, agregadas por dia.

---

### 🧱 Estrutura

| Campo      | Tipo    | Obrigatório | Default | Descrição                          |
| ---------- | ------- | ----------- | ------- | ---------------------------------- |
| data       | date    | sim         | now()   | Data da agregação                  |
| product_id | uuid    | sim         | —       | ID do produto                      |
| views      | integer | sim         | 0       | Quantidade de visualizações no dia |

---

### ⚙️ Regras de Negócio

1. **Granularidade diária**:

   * Os dados são agregados por dia (`data`)
   * Não há registro de horário individual

2. **Chave primária composta**:

   * `(data, product_id)`
   * Garante um único registro por produto por dia

3. **Incremento de views**:

   * Deve ser feito via upsert (incremental)
   * Ex: `views = views + 1`

4. **Origem dos dados**:

   * Alimentado pela RPC: `log_product_view`

---

### ⚠️ Observações

* Não há validação para evitar múltiplos registros artificiais (ex: refresh de página)
* Não diferencia usuários únicos (cada acesso conta como 1 view)
* Dependente da correta implementação do tracking

---

### 🔗 Dependências

* Utilizada por:

  * `get_product_conversion`
  * `get_weekly_funnel`

* Relacionamentos:

  * `products.id`

---

### 💡 Boas práticas

* Evitar chamadas duplicadas desnecessárias no frontend/backend
* Considerar debounce ou controle de repetição para evitar inflar dados
* Validar origem da chamada (ex: evitar bots simples)

---

### 🚨 Pontos críticos

* Se inflar `views` → conversão cai artificialmente
* Se perder eventos → conversão sobe artificialmente
* Dados não representam usuários únicos, apenas eventos brutos

---

### 🧠 Interpretação correta

* Métrica útil para volume e tendência
* Não deve ser usada isoladamente para decisões críticas
* Deve ser combinada com:

  * `adds` (interesse)
  * `orders` (conversão real)

---
