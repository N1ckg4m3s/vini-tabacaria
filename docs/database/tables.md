# Database

Banco utilizado: Supabase (PostgreSQL)

Este documento descreve:

- Estrutura das tabelas
- Relações entre entidades
- Regras de negócio implementadas no banco

## Tabelas: products

Armazena os produtos disponíveis na loja.

### Estrutura

| Campo      | Tipo          | Obrigatório | Default           | Descrição                                |
| ---------- | ------------- | ----------- | ----------------- | ---------------------------------------- |
| id         | uuid          | sim         | gen_random_uuid() | Identificador único do produto           |
| created_at | timestamptz   | sim         | now()             | Data de criação do registro              |
| nome       | text          | sim         | -                 | Nome do produto                          |
| marca      | text          | não         | null              | Marca do produto                         |
| valor      | numeric(10,2) | não         | null              | Preço do produto                         |
| quantidade | integer       | não         | null              | Quantidade disponível em estoque         |
| tipo       | text          | sim         | -                 | Categoria ou tipo do produto             |
| metadata   | jsonb         | sim         | `{}`              | Dados adicionais flexíveis               |
| visible    | boolean       | sim         | true              | Define se o produto está visível na loja |
| imagem     | text          | não         | null              | URL da imagem do produto                 |

### Primary Key: id

### Regras de Negócio

- Produtos com `quantidade = 0` são considerados **fora de estoque**.
- Produtos com `visible = false` não devem ser exibidos no catálogo.
- `metadata` é utilizado para armazenar propriedades variáveis do produto.

### SQL

```sql
    create table public.products (
        id uuid not null default gen_random_uuid(),
        created_at timestamp with time zone not null default now(),
        nome text not null,
        marca text null,
        valor numeric(10, 2) null,
        quantidade integer null,
        tipo text not null,
        metadata jsonb not null default '{}'::jsonb,
        visible boolean not null default true,
        imagem text null,
        constraint products_pkey primary key (id)
    );
```

---

## Tables: orders

### Table: orders

Armazena os pedidos realizados no sistema, incluindo valor total e status atual.

#### Estrutura

| Campo      | Tipo                     | Descrição                                              |
| ---------- | ------------------------ | ------------------------------------------------------ |
| id         | uuid                     | Identificador único do pedido                          |
| created_at | timestamp with time zone | Data e hora de criação do pedido                       |
| total      | integer                  | Valor total do pedido em centavos (ex: 1290 = R$12,90) |
| status     | order_status             | Status atual do pedido (ex: pending, paid, canceled)   |
| updated_at | timestamp with time zone | Data e hora da última atualização do pedido            |

#### Fonte de Dados

- Inserções diretas da aplicação ao criar um novo pedido
- Atualizações feitas durante o fluxo do pedido (ex: pagamento, cancelamento)

#### Regras de Negócio

- `id` é gerado automaticamente com `gen_random_uuid()`.
- `created_at` é definido automaticamente no momento da criação.
- `updated_at` é atualizado automaticamente a cada modificação no registro.
- `total` deve representar sempre a soma dos itens do pedido (fonte de verdade deve ser `order_items`).
- `status` utiliza o tipo `order_status` para garantir consistência de valores.
- Um pedido pode iniciar com `total = 0` e ser atualizado conforme itens são adicionados.

#### SQL

```sql
create type order_status as enum (
  'pending',
  'paid',
  'canceled'
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone not null default now(),
  total integer not null default 0,
  status order_status not null default 'pending',
  updated_at timestamp with time zone not null default now()
);

create or replace function update_orders_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_orders_updated_at
before update on public.orders
for each row
execute function update_orders_updated_at();
```

---

### Table: order_items

Armazena os itens associados a cada pedido, garantindo unicidade de produto por pedido.

#### Estrutura

| Campo      | Tipo    | Descrição                                                    |
| ---------- | ------- | ------------------------------------------------------------ |
| order_id   | uuid    | Referência ao pedido ao qual o item pertence                 |
| product_id | uuid    | Produto associado ao item                                    |
| quantity   | integer | Quantidade do produto no pedido                              |
| unit_price | integer | Preço unitário do produto no momento do pedido (em centavos) |

#### Fonte de Dados

- Inserções feitas pela aplicação ao adicionar produtos ao pedido
- Atualizações feitas ao alterar a quantidade de um produto já existente no pedido

#### Regras de Negócio

- A combinação (`order_id`, `product_id`) é única, impedindo duplicidade de produtos no mesmo pedido.
- `order_id` deve sempre referenciar um pedido válido existente em `orders`.
- `product_id` deve sempre referenciar um produto válido existente em `products`.
- `quantity` deve ser maior que zero.
- `unit_price` deve ser maior ou igual a zero.
- `unit_price` representa o valor do produto no momento da compra, não devendo depender do valor atual em `products`.
- O valor total do pedido (`orders.total`) deve ser a soma de (`quantity * unit_price`) de todos os itens associados.

#### SQL

```sql
create table public.order_items (
  order_id uuid not null,
  product_id uuid not null,
  quantity integer not null,
  unit_price integer not null,
  constraint order_items_pkey primary key (order_id, product_id),
  constraint order_items_order_id_fkey foreign KEY (order_id) references orders (id),
  constraint order_items_product_id_fkey foreign KEY (product_id) references products (id)
) TABLESPACE pg_default;
```

---

## Tables: analytics

Tabelas usadas para métricas e monitoramento de uso da aplicação.

### Table: analytics_daily_product_interest

Registra o nível de interesse dos usuários em cada produto por dia,
baseado em adições e remoções do carrinho.

#### Estrutura

| Campo         | Tipo    | Obrigatório | Default | Descrição                                                           |
| ------------- | ------- | ----------- | ------- | ------------------------------------------------------------------- |
| data          | date    | sim         | now()   | Dia do registro da métrica                                          |
| product_id    | uuid    | sim         | -       | Produto relacionado                                                 |
| added_count   | integer | sim         | 0       | Quantidade de vezes que o produto foi adicionado ao carrinho no dia |
| removed_count | integer | sim         | 0       | Quantidade de vezes que o produto foi removido do carrinho no dia   |

#### Primary Key

data, product_id

#### Foreign Keys

product_id → products.id

#### Regras de Negócio

- Cada registro representa **o interesse diário em um produto**.
- A combinação `(data, product_id)` garante **um único registro por produto por dia**.
- Quando um usuário adiciona o produto ao carrinho, o sistema incrementa `added_count`.
- Quando um usuário remove o produto do carrinho, o sistema incrementa `removed_count`.
- Cada usuário possui um limite de **5 interações por produto**, para evitar abuso ou spam nas métricas.

#### SQL

```sql
    create table public.analytics_daily_product_interest (
        data date not null default now(),
        product_id uuid not null,
        added_count integer not null default 0,
        removed_count integer not null default 0,
        constraint analytics_daily_product_interest_pkey primary key (data, product_id),
        constraint analytics_daily_product_interest_product_id_fkey
            foreign key (product_id) references products (id)
    ) TABLESPACE pg_default;
```

---

### Table: analytics_daily_product_views

Registra a quantidade de visualizações de cada produto por dia.

#### Estrutura

| Campo      | Tipo    | Obrigatório | Default | Descrição                                     |
| ---------- | ------- | ----------- | ------- | --------------------------------------------- |
| data       | date    | sim         | now()   | Dia da visualização                           |
| product_id | uuid    | sim         | -       | Produto visualizado                           |
| views      | integer | sim         | 0       | Quantidade de visualizações do produto no dia |

#### Primary Key

data, product_id

#### Foreign Keys

product_id → products.id

#### Regras de Negócio

- Cada registro representa **quantas vezes um produto foi visualizado em um determinado dia**.
- A combinação `(data, product_id)` garante que **existe apenas um registro por produto por dia**.
- Sempre que um produto é visualizado, o sistema incrementa o campo `views`.
- Caso não exista registro para `(data, product_id)`, um novo registro deve ser criado.

#### SQL

```sql
    create table public.analytics_daily_product_views (
        data date not null default now(),
        product_id uuid not null,
        views integer not null default 0,
        constraint analytics_daily_product_views_pk primary key (data, product_id),
        constraint analytics_daily_product_views_product_id_fkey
            foreign key (product_id) references products (id)
    ) TABLESPACE pg_default;
```

---

### Table: analytics_daily_access

Registra a quantidade de acessos diários na aplicação, separados por tipo de dispositivo.

#### Estrutura

| Campo          | Tipo    | Obrigatório | Default | Descrição                                     |
| -------------- | ------- | ----------- | ------- | --------------------------------------------- |
| data           | date    | sim         | now()   | Data do registro de acessos                   |
| mobile_access  | integer | sim         | 0       | Quantidade de acessos via dispositivos móveis |
| desktop_access | integer | sim         | 0       | Quantidade de acessos via desktop             |

#### Primary Key

data

#### Regras de Negócio

- Cada registro representa **um único dia**.
- A coluna `data` é única e identifica o dia da métrica.
- Quando um usuário acessa a aplicação, o sistema incrementa:
  - `mobile_access` se o acesso for via dispositivo móvel
  - `desktop_access` se o acesso for via desktop
- Caso não exista registro para o dia atual, um novo registro deve ser criado.

#### SQL

```sql
    create table public.analytics_daily_access (
        data date not null default now(),
        mobile_access integer not null default 0,
        desktop_access integer not null default 0,
        constraint analytics_daily_access_pkey primary key (data),
        constraint analytics_daily_access_data_key unique (data)
    ) TABLESPACE pg_default;
```

### View: analytics_cart_product_intention

Calcula o interesse agregado de produtos no carrinho nos últimos 7 dias.

#### Estrutura

| Campo           | Tipo    | Descrição                                                                                      |
| --------------- | ------- | ---------------------------------------------------------------------------------------------- |
| product_id      | uuid    | Produto relacionado                                                                            |
| total_added     | integer | Total de vezes que o produto foi adicionado ao carrinho nos últimos 7 dias                     |
| total_removed   | integer | Total de vezes que o produto foi removido do carrinho nos últimos 7 dias                       |
| intention_score | integer | Diferença entre adições e remoções (total_added - total_removed), indicando nível de interesse |

#### Fonte de Dados

- analytics_daily_product_interest

#### Regras de Negócio

- Somente consideram-se registros dos últimos 7 dias (`data >= current_date - interval '7 days'`).
- `intention_score` é usado para priorizar produtos com mais interesse líquido no carrinho.
- Produtos podem ter `intention_score` negativo se forem removidos mais vezes do que adicionados.

#### SQL

```sql
create view analytics_cart_product_intention as
select
  api.product_id,
  sum(api.added_count) as total_added,
  sum(api.removed_count) as total_removed,
  sum(api.added_count - api.removed_count) as intention_score
from analytics_daily_product_interest api
where api.data >= current_date - interval '7 days'
group by api.product_id;
```