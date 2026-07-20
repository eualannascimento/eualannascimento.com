# Setup (equipamentos e stack pessoal)

**Status:** Concluído
**Data:** 2026-07-19

## 1. Resumo e Objetivo
Página `/setup` que lista o equipamento físico de trabalho do autor e as ferramentas de software (stack pessoal) que ele usa no dia a dia.

## 2. User Stories (Requisitos Funcionais)
* **US01:** Como visitante curioso sobre setup de trabalho, quero ver os equipamentos físicos usados pelo autor, para me inspirar ou comparar.
* **US02:** Como visitante, quero ver as ferramentas de software usadas no dia a dia, para entender o fluxo de trabalho do autor.

## 3. Regras de Negócio e Casos de Falha (Edge Cases)
* **Regra 01:** Conteúdo vem de `content/setup/index.md`, template `layout: setup` (`layouts/_default/setup.html:1`).
* **Regra 02:** Dividido em 2 blocos manuais: "Setup" (hardware) e "Stack" (software) — texto Markdown simples, sem estrutura de dados.
* **Regra 03:** Não há imagens/fotos do setup físico, só texto (item + marca/modelo).

## 4. Estrutura de Dados e Componentes
* **Hardware (8 itens):** Cadeira Flexform Uni All Black, Mesa Kabum! Tech DT900, Macbook Air 13 256GB Silver, Teclado Logitech MX Keys US Wireless, Mouse Logitech MX Master 3, Monitor Dell P2721Q, Suporte Zinnia Nimbo 200N Pro, Webcam Logitech C270.
* **Software (6 itens):** VSCode, Things 3, Notion, Notion Calendar, Figma, Github.
* **Estilo:** `static/css/setup.css` (25 linhas).
* **Template:** `layouts/_default/setup.html`.

## 5. Critérios de Aceite (verificáveis por teste)
* [ ] CA01: Dado `/setup`, quando acessada, então exibe os blocos "Setup" e "Stack" com todos os itens listados.

## 6. Fora de Escopo
* Links afiliados ou de compra para os itens listados.
* Fotos do ambiente de trabalho.

## 7. Dívidas e riscos observados
* **Sem estrutura de dados**, mesma observação do domínio de certificações — dificulta layout mais rico (cards com ícone por categoria, por exemplo) sem reescrever o conteúdo.
* **Possivelmente desatualizado:** não há como confirmar sem input do usuário se o hardware/stack listado ainda é o atual; marcar como ponto a confirmar na fase de Grilling da próxima feature.
