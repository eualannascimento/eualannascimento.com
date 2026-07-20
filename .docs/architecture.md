# Arquitetura do Sistema - eualannascimento.com

Documento de baseline gerado por `/sdd-adopt` em 2026-07-19. Descreve o estado do sistema NO MOMENTO DA ADOÇÃO, antes de qualquer redesign.

## 1. Stack Tecnológica

Site estático gerado com **Hugo** (extended, versão mínima 0.55.0):

- **Gerador:** Hugo (`config.toml`), sem dependências de Node/npm no build.
- **Tema:** `red-rose` (git submodule apontando para `https://github.com/httpsecure/hugo-theme-red-rose.git`), fortemente customizado por CSS próprio em `static/css/`.
- **Bibliotecas via CDN:** Bootstrap 5.2.1 (grid e componentes), Font Awesome 6.0.0-beta3 (ícones GitHub/LinkedIn no header).
- **Fonte:** Jost, arquivos `.woff`/`.woff2` locais em `static/fonts/jost/`, carregada via `font.scss` (pipeline de assets do Hugo).
- **Sem testes, sem linter, sem bundler.**

## 2. Estrutura de Pastas

```
config.toml              # config Hugo (baseURL, título, paginação, versão mínima)
content/
  bio/index.md            # página "bio" (sobre mim)
  setup/index.md           # página "setup" (equipamentos e stack pessoal)
  certif/index.md          # página "certif*" (cursos e certificações)
  blog/001-apresentacao/   # único post do blog (duplica o texto da bio)
layouts/
  index.html               # home (renderiza partial "ava.html", herdado do tema)
  _default/
    baseof.html             # esqueleto HTML base (header/content/footer)
    single.html, list.html   # templates padrão de página única e listagem
    bio.html, setup.html, certif.html  # templates dedicados por seção (usam layout: <nome> no front matter)
  partials/
    head.html, header.html, footer.html, ava.html
static/
  css/  rose.css (tema), bio.css, certif.css, setup.css, footer.css
  js/   about.js
  fonts/jost/
  img/  avatar.png
  assets/ favicons
themes/
  red-rose/   # submodule, tema base
  paper/      # diretório presente no repo mas NÃO referenciado em nenhum lugar (órfão, ver dívidas)
.github/workflows/deploy.yml  # build Hugo + push para branch gh-pages
```

## 3. Fluxo de Dados / Renderização

1. Cada seção do site (`bio`, `setup`, `certif`) é um arquivo Markdown com front matter `layout: <nome>`, que aponta para o template correspondente em `layouts/_default/`.
2. `baseof.html` monta o esqueleto comum (header com nav para blog/bio/certif/setup + ícones GitHub/LinkedIn, bloco `main`, footer) e cada template de seção sobrescreve o bloco `main`.
3. O blog usa o template `list.html` genérico do Hugo (não um `layout:` customizado), iterando `.Pages` da seção `content/blog/`.
4. CSS por seção é carregado explicitamente via `<link>` dentro do próprio template daquela seção (ex.: `certif.html` referencia `certif.css`), não há um bundle único.
5. Deploy: GitHub Actions builda com o binário oficial do Hugo e faz push do diretório `public/` para a branch `gh-pages` (checkout duplo: fonte + destino).

## 4. Decisões Arquiteturais Observadas

- **Sem CMS/headless:** conteúdo é Markdown versionado no próprio repo, sem banco de dados.
- **CSS por página, sem sistema de design tokens:** cada seção tem seu próprio arquivo CSS, com cores/tamanhos fixos, sem variáveis CSS compartilhadas (`--color-*` etc.) — diferente da abordagem de tokens usada no projeto de referência `project-classificavagas-page-resume`.
- **Front matter homogêneo:** todas as páginas de seção usam `date: 2024-05-29` e `ShowToc: true`, herdados do tema, mesmo sem uso aparente de TOC nos templates customizados.

## 5. Fora do escopo desta varredura

Não foi inspecionado o código interno do tema `red-rose` (submodule de terceiros) além do que é sobrescrito pelos partials/CSS locais.
