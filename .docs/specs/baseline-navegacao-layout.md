# Navegação e Layout (tema visual)

**Status:** Concluído
**Data:** 2026-07-19

## 1. Resumo e Objetivo
Esqueleto visual comum a todas as páginas do site: header com navegação e ícones sociais, área de conteúdo, footer, e o tema visual (`red-rose`) que define cores, tipografia e componentes base.

## 2. User Stories (Requisitos Funcionais)
* **US01:** Como visitante, quero navegar entre blog/bio/certif/setup a partir de qualquer página, para explorar o site sem voltar à home.
* **US02:** Como visitante, quero acessar o GitHub e o LinkedIn do autor a partir do header, para conhecer mais sobre ele em outras plataformas.
* **US03:** Como visitante, quero ver um avatar, nome e subtítulo na home, para identificar rapidamente de quem é o site.

## 3. Regras de Negócio e Casos de Falha (Edge Cases)
* **Regra 01:** O header é fixo em todas as páginas via `baseof.html` (`layouts/_default/baseof.html:1`), incluído por todos os templates de seção.
* **Regra 02:** Links do header (`layouts/partials/header.html:5-13`): `/blog`, `/bio`, `/certif`, `/setup`, GitHub (`https://github.com/eualannascimento`), LinkedIn (`https://www.linkedin.com/in/eualannascimento`) — os dois últimos abrem em nova aba (`target="_blank"`).
* **Regra 03:** O título do site no header é um link para a home (`layouts/partials/header.html:3`).
* **Regra 04:** A home renderiza somente o partial `ava.html` (avatar + nome + subtítulo fixo "site pessoal e blog") — `layouts/index.html:1-3`.
* **Regra 05:** O `<title>` da aba segue a lógica: home usa `Site.Title`; páginas com `hideSiteTitle` usam só o título da página; demais páginas usam `"{Título da página} | {Título do site}"` (`layouts/partials/head.html:26-35`).
* **Decisão (usuário, 2026-07-19):** `themes/paper` é órfão e será removido no micro-commit de limpeza da adoção.

## 4. Estrutura de Dados e Componentes
* **Templates:** `layouts/_default/baseof.html`, `layouts/partials/{head,header,footer,ava}.html`, `layouts/index.html`.
* **Estilos:** `static/css/rose.css` (tema principal, 115 linhas), `static/css/footer.css` (3 linhas), carregados globalmente; CSS por seção é carregado à parte dentro de cada template.
* **Dependências externas via CDN:** Bootstrap 5.2.1, Font Awesome 6.0.0-beta3 (`layouts/partials/head.html:15-18`).
* **Fonte:** Jost, local em `static/fonts/jost/`, aplicada via pipeline SCSS→CSS do Hugo (`resources.Get "font.scss"`, `layouts/partials/head.html:21-23`) — o arquivo `font.scss` fonte não foi localizado na varredura (provavelmente dentro de `assets/`, não lido nesta rodada).
* **Meta description:** hardcoded como "Your description" (`layouts/partials/head.html:5`) — nunca customizada por página.

## 5. Critérios de Aceite (verificáveis por teste)
* [ ] CA01: Dado qualquer página do site, quando renderizada, então o header exibe os 4 links de navegação + 2 ícones sociais.
* [ ] CA02: Dado a home, quando carregada, então exibe avatar, nome "Alan Nascimento" e subtítulo "site pessoal e blog".
* [ ] CA03: Dado o link do GitHub ou LinkedIn no header, quando clicado, então abre em nova aba.

## 6. Fora de Escopo
* Comportamento interno do tema `red-rose` além do que é sobrescrito localmente (código do submodule não foi auditado).
* Responsividade mobile (não testada nesta varredura, apenas inferida das classes Bootstrap usadas).

## 7. Dívidas e riscos observados
* **Meta description genérica** ("Your description") prejudica SEO e compartilhamento em redes sociais — nunca foi customizada.
* **`themes/paper` órfão:** removido no micro-commit de limpeza (decisão do usuário na adoção).
* **CSS sem sistema de tokens:** cores e espaçamentos estão hardcoded em cada arquivo CSS de seção, sem variáveis compartilhadas — dificulta qualquer alteração de tema global (relevante para a migração de design planejada).
* **Sem meta tags Open Graph/Twitter Card:** compartilhar o link do site em redes sociais não gera preview rico.
