# 📌 Convenção de Commits

Padrão para organizar e categorizar commits de forma clara e rastreável.

---

## 🎯 Estrutura recomendada

[TAG] módulo: descrição resumida da alteração


**Exemplo:**


---

## 🏷️ Tags disponíveis

| Tag          | Uso                                                                 | Exemplo                                        |
|--------------|---------------------------------------------------------------------|------------------------------------------------|
| `[FEAT]`     | Nova funcionalidade, lógica ou fluxo                                | `[FEAT] login: lógica de autenticação`         |
| `[FIX]`      | Correção de bug ou comportamento inesperado                         | `[FIX] navbar: erro ao clicar`                 |
| `[STYLE]`    | Mudança visual (CSS, styled-components, layout, cores)              | `[STYLE] button: hover e responsividade`       |
| `[DOCS]`     | Comentários, documentação, README, JSDoc                            | `[DOCS] home: explicação da estrutura`         |
| `[REFACTOR]` | Refatoração sem mudança de comportamento                            | `[REFACTOR] form: organização interna`         |
| `[TEST]`     | Adição ou ajuste de testes                                          | `[TEST] produto: testando card hover`          |
| `[CHORE]`    | Configurações, scripts, dependências, tarefas auxiliares            | `[CHORE] eslint: ajuste de regras`             |
| `[BUILD]`    | Alterações que afetam build ou processo de deploy                   | `[BUILD] vercel: ajuste de variáveis de env`   |

---

## ✅ Boas práticas

- Sempre use **letras maiúsculas** nas tags (`[FEAT]`, não `[feat]`).
- Prefira descrever **o módulo afetado** antes da descrição.
- Escreva a descrição de forma breve, clara e objetiva.
- Use **verbos no infinitivo** ou como ação no presente (`adicionar`, `criar`, `corrigir`, `melhorar`...)
