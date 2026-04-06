## analytics_daily_access

Tabela responsável por armazenar a quantidade de acessos ao sistema por dia, segmentados por dispositivo.

---

### 📌 Responsabilidade

Registrar o volume de acessos diários, diferenciando entre dispositivos mobile e desktop.

---

### 🧱 Estrutura

| Campo          | Tipo    | Obrigatório | Default | Descrição                                |
| -------------- | ------- | ----------- | ------- | ---------------------------------------- |
| data           | date    | sim         | now()   | Data da agregação                        |
| mobile_access  | integer | sim         | 0       | Total de acessos via dispositivos móveis |
| desktop_access | integer | sim         | 0       | Total de acessos via desktop             |

---

### ⚙️ Regras de Negócio

1. **Granularidade diária**:

   * Um único registro por dia (`data`)

2. **Chave primária**:

   * `data` é único (1 linha por dia)

3. **Segmentação por dispositivo**:

   * `mobile_access` → acessos mobile
   * `desktop_access` → acessos desktop

4. **Incremento de acessos**:

   * Atualização via upsert:

     * incrementa apenas o tipo correspondente ao acesso

5. **Origem dos dados**:

   * Alimentado pela RPC: `log_user_access`

---

### ⚠️ Observações

* Não representa usuários únicos
* Cada chamada incrementa o contador (inclusive refresh/reloads)
* Não há validação de origem (ex: bots, múltiplos acessos)

---

### 🔗 Dependências

* Utilizada por:

  * `get_dashboard_today`

---

### 💡 Boas práticas

* Garantir que a RPC seja chamada apenas uma vez por sessão/acesso relevante
* Evitar chamadas duplicadas no backend
* Considerar controle básico para evitar inflar dados (ex: debounce ou cache por requisição)

---

### 🚨 Pontos críticos

* Múltiplas chamadas → inflaciona acessos artificialmente
* Falta de controle → métricas perdem confiabilidade
* Dados não representam usuários reais, apenas eventos registrados

---

### 🧠 Interpretação correta

* Métrica útil para volume de tráfego diário
* Deve ser usada para:

  * tendências
  * comparação entre dias
* Não deve ser usada como:

  * número de usuários únicos
  * base direta para taxa de conversão real

---

### ⚠️ Limitações do modelo

* Não diferencia usuários únicos
* Não identifica sessões
* Não registra origem do acesso (ex: campanha, referrer)
* Não permite análise detalhada de comportamento

---
