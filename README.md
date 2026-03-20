# 🛍️ Vini-Tabacaria – Catálogo Digital

Catálogo online desenvolvido para a Vini-Tabacaria, onde clientes podem visualizar produtos, montar uma cotação através de um carrinho e encaminhar o pedido diretamente para o WhatsApp.

O sistema também possui uma área administrativa com controle de produtos e métricas de acesso.

---

## 🚀 Funcionalidades

### 👤 Área do Cliente

* Visualização de produtos
* Carrinho para simulação de cotação
* Envio do pedido diretamente para o WhatsApp
* Interface responsiva

### 🔐 Área Administrativa

* Cadastro, edição e exclusão de produtos
* Controle de produtos visualizados
* Controle de intenções de compra
* Número de acessos ao sistema
* Dashboard com métricas

---

## 🛠️ Tecnologias Utilizadas

* Next.js
* TypeScript
* Supabase
* Styled Components
* API própria utilizando rotas do Next.js

---

## 🏗️ Arquitetura e Padrões

### 📌 Front-end

* Organização baseada em **Feature-Based Structure**
* Aplicação do princípio **SRP (Single Responsibility Principle)**

### 📌 Back-end

Arquitetura em camadas:

* Controller
* DTO (Data Transfer Object)
* Service
* Repository

Separação clara de responsabilidades, facilitando manutenção e escalabilidade.

---

## 📦 Como executar o projeto

```bash
# Clonar o repositório
git clone git@github.com:N1ckg4m3s/vini-tabacaria.git

# Entrar na pasta
cd vini-tabacaria

# Instalar dependências
npm install

# Rodar o projeto
npm run dev
```

O projeto estará disponível em:

```
http://localhost:3000
```

---

## 📊 Objetivo do Projeto

Criar uma solução simples e eficiente para:

* Facilitar a visualização de produtos
* Automatizar o processo de cotação
* Gerar intenção de compra via WhatsApp
* Fornecer dados estratégicos para o administrador

---

## 📌 Status do Projeto

🚧 Em desenvolvimento

---

## 📎 Melhorias Futuras

* Relatórios avançados
* Exportação de métricas
* Painel com gráficos detalhados