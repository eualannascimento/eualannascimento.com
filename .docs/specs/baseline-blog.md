# Blog

**Status:** Concluído
**Data:** 2026-07-19

## 1. Resumo e Objetivo
Seção `/blog` que lista posts em ordem cronológica (template padrão do Hugo) e renderiza cada post individualmente. Atualmente tem um único post de apresentação.

## 2. User Stories (Requisitos Funcionais)
* **US01:** Como visitante, quero ver a lista de posts do blog, para escolher o que ler.
* **US02:** Como visitante, quero ler um post individual com data de publicação, para saber quando foi escrito.

## 3. Regras de Negócio e Casos de Falha (Edge Cases)
* **Regra 01:** A listagem usa o template genérico `layouts/_default/list.html` (não um `layout:` customizado como as outras seções) — itera `.Pages` da seção e exibe data (`2006-01-02`) + título linkado (`layouts/_default/list.html:5-11`).
* **Regra 02:** Cada post individual usa `layouts/_default/single.html`: título, data (`Jan 2, 2006`), conteúdo e tags — sem TOC, sem elementos extras além dos outros templates de seção (`layouts/_default/single.html:1-19`).
* **Regra 03:** Posts suportam `tags` no front matter, renderizadas como links para `/tags/<slug>` (`layouts/_default/single.html:9-16`), idêntico ao comportamento de `bio.html` e `certif.html`.
* **Regra 04:** Único post existente, `001-apresentacao`, tem `draft: false` e replica o texto da bio quase integralmente.

## 4. Estrutura de Dados e Componentes
* **Conteúdo:** `content/blog/001-apresentacao/index.md` + imagem própria `img/me.png` (bundle da página, cópia da imagem da bio).
* **Templates:** `layouts/_default/list.html` (listagem), `layouts/_default/single.html` (post individual, não auditado a fundo).
* **Sem CSS próprio** identificado para esta seção (usa apenas o CSS global `rose.css`).

## 5. Critérios de Aceite (verificáveis por teste)
* [ ] CA01: Dado `/blog`, quando acessada, então lista todos os posts não-draft ordenados por data decrescente, com data e título linkado.
* [ ] CA02: Dado um post individual, quando acessado, então exibe título, data e conteúdo completo.

## 6. Fora de Escopo
* Paginação (configurada globalmente em `config.toml` com `paginate = 18`, mas irrelevante com 1 post só).
* Comentários, RSS explícito (Hugo gera RSS por padrão, não customizado aqui).

## 7. Dívidas e riscos observados
* **Único post é uma duplicata da bio:** não agrega conteúdo novo, gera a impressão de blog abandonado/vazio.
* **Ausência de estratégia de conteúdo:** não há indicação de frequência de posts nem estrutura de categorias além de tags livres.
