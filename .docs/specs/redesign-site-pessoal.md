# Redesign do site pessoal (design + stack + dados)

**Status:** Pronto para Commit
**Data:** 2026-07-20

## 1. Resumo e Objetivo
Migrar `eualannascimento.com` de Hugo para HTML/CSS/JS vanilla, adotando o design (cores, tipografia, espaçamentos) do projeto `project-classificavagas-page-resume`, atualizando o conteúdo com base no LinkedIn do autor e corrigindo as dívidas técnicas identificadas na baseline, sem nunca remover fatos já publicados.

## 2. User Stories (Requisitos Funcionais)
* **US01:** Como visitante, quero navegar por home, bio, certif e setup com um visual consistente (cores, fontes, espaçamentos) inspirado no design do currículo do autor, para uma experiência mais profissional.
* **US02:** Como mantenedor do site, quero publicar o site sem etapa de build, para simplificar o deploy e reduzir dependências.
* **US03:** Como visitante, quero ver a bio e a lista de certificações/cursos com dados atualizados (cargo atual, formação, certificações recentes), para ter uma visão fiel da trajetória do autor.
* **US04:** Como mantenedor, quero que dados novos vindos do LinkedIn sejam adicionados sem apagar nada que já existia, para preservar o histórico completo mesmo se algo for removido no LinkedIn.
* **US05:** Como mantenedor, quero saber quais certificações novas ainda não têm imagem de comprovante anexada, para lembrar de completá-las depois.
* **US06:** Como mantenedor, quero que o link do site tenha uma prévia rica ao ser compartilhado (Open Graph), para melhorar a apresentação em redes sociais e apps de mensagem.

## 3. Regras de Negócio e Casos de Falha (Edge Cases)
* **Regra 01 (stack):** Nenhuma dependência de build (Hugo, bundler, transpiler). HTML/CSS/JS servidos como estão, seguindo o padrão do `project-classificavagas-page-resume` (ver `.docs/architecture.md` desse projeto de referência).
* **Regra 02 (páginas):** 4 páginas: `index.html` (home), `bio.html`, `certif.html`, `setup.html`. Navegação (header) idêntica em todas: links para as 4 páginas + ícones GitHub/LinkedIn abrindo em nova aba, replicando as Regras 01-03 de `.docs/specs/baseline-navegacao-layout.md`.
* **Regra 03 (blog):** removido do menu e do deploy. `content/blog/` e os templates associados não são portados. O spec `baseline-blog.md` permanece como registro histórico, não como trabalho a fazer.
* **Regra 04 (design tokens):** paleta, tipografia (Barlow para corpo, Barlow Condensed para headings), radius e sombras copiados de `project-classificavagas-page-resume/css/base.css` como variáveis CSS (`--color-*`, `--font-*`, `--radius-*`, `--shadow-*`), adaptando a paleta para a identidade do site pessoal (não precisa ser pixel-perfect ao gerador de currículo, mas usar o mesmo sistema de tokens).
* **Regra 05 (fontes):** substituir a fonte Jost pela dupla Barlow/Barlow Condensed. Reaproveitar os arquivos de fonte do projeto de referência (`js/vendor/fonts-barlow.js` ou equivalente) ou hospedar localmente, sem depender de CDN externo de fontes.
* **Regra 06 (dados - regra de ouro):** ao atualizar bio/certif/setup com base no LinkedIn, é PROIBIDO remover qualquer fato, cargo, curso ou certificação já presente no conteúdo atual. Só é permitido adicionar itens novos ou corrigir status/datas de itens já existentes quando não houver contradição.
* **Regra 07 (conflito de dados):** se um dado do LinkedIn contradisser o conteúdo atual (ex.: status "em andamento" que já deveria estar "concluído"), a atualização PARA nesse item específico e pergunta ao usuário antes de alterar qualquer texto existente. Não presumir.
* **Regra 08 (certificações sem comprovante):** itens novos de certificação/curso vindos do LinkedIn sem imagem de comprovante são listados SEM o emoji 📄 (mesma convenção já usada hoje para cursos sem certificado, ex. os da Caelum) e registrados em `.docs/pendencias-certificados.md` (arquivo interno, não publicado no site) com nome do curso/instituição e data.
* **Regra 09 (setup):** a página `/setup` é portada para o novo design com o conteúdo atual inalterado (cadeira, mesa, Macbook Air, teclado/mouse, monitor, suporte, webcam, stack de software). Atualização de conteúdo do setup fica fora desta feature.
* **Regra 10 (foto):** avatar da home e foto da bio são substituídos pela foto de perfil atual do LinkedIn do autor, baixada via automação de navegador.
* **Regra 11 (SEO/melhorias):** `<meta name="description">` deixa de ser genérica ("Your description") e passa a ter um resumo real por página; adicionar tags Open Graph (`og:title`, `og:description`, `og:image`, `og:url`) e Twitter Card básicas em todas as páginas.
* **Regra 12 (estrutura de dados):** listas de certificações e do setup deixam de ser só prosa em Markdown e passam a ser dados estruturados (array JS ou JSON) consumidos por um template/render simples, para facilitar manutenção e futura reformatação visual (mesmo padrão de `js/config.js` do projeto de referência).
* **Regra 13 (deploy):** workflow `.github/workflows/deploy.yml` (build Hugo + push para `gh-pages`) é substituído/removido; GitHub Pages passa a servir direto da branch `main`. `style-gate.yml` (gate de estilo anti-IA) é preservado.
* **Falha 01:** se a extração de algum dado do LinkedIn falhar ou o perfil estiver com uma seção oculta/privada, a feature prossegue com o que foi coletado e relata explicitamente o que não pôde ser confirmado, sem inventar conteúdo.

## 4. Estrutura de Dados e Componentes
* **Arquivos novos:** `index.html`, `bio.html`, `certif.html`, `setup.html`, `css/tokens.css` (ou equivalente), `css/base.css`, `js/certif-data.js` (ou similar), `.docs/pendencias-certificados.md`.
* **Arquivos removidos/deprecados:** `config.toml`, `layouts/`, `themes/red-rose` (submodule), `content/` (Markdown), `static/css/*.css` antigos, `static/fonts/jost/`, `.gitmodules`, `.github/workflows/deploy.yml` (versão Hugo).
* **Arquivos preservados como histórico:** `.docs/specs/baseline-*.md` e `.docs/architecture.md` continuam descrevendo o estado pré-redesign; não são reescritos.
* **Origem dos tokens de design:** `project-classificavagas-page-resume/css/base.css` (paleta, fontes, radius, sombras) e `.docs/design-reference/` desse mesmo projeto (referência visual "Industry").
* **Origem dos dados atualizados:** LinkedIn do autor (`https://www.linkedin.com/in/eualannascimento/`), coletado via automação de navegador (Chrome).

## 5. Critérios de Aceite (verificáveis por teste)
* [ ] CA01: Dado o site publicado, quando qualquer página é aberta, então nenhum arquivo depende de Hugo, submodule ou build step para renderizar.
* [ ] CA02: Dado o header em qualquer página, quando renderizado, então usa a mesma paleta/tipografia (Barlow/Barlow Condensed) definida nos tokens CSS.
* [ ] CA03: Dado o conteúdo atual da bio/certif, quando comparado ao novo conteúdo, então todo fato antigo (cargo, curso, certificação) ainda está presente, mesmo que reformatado.
* [ ] CA04: Dado um dado novo do LinkedIn sem contradição com o existente, quando processado, então é adicionado ao conteúdo sem remover nada.
* [ ] CA05: Dado um dado do LinkedIn que contradiz o conteúdo atual, quando detectado, então a atualização automática para nesse item e uma pergunta é feita ao usuário antes de qualquer alteração.
* [ ] CA06: Dado um curso/certificação novo sem imagem de comprovante, quando listado, então aparece sem o emoji 📄 e consta em `.docs/pendencias-certificados.md`.
* [ ] CA07: Dado o `<head>` de qualquer página, quando inspecionado, então contém meta description específica da página e tags Open Graph válidas (title, description, image, url).
* [ ] CA08: Dado um push na branch `main`, quando processado pelo GitHub Pages, então o site é publicado sem workflow de build.

## 6. Fora de Escopo
* Seção de blog (removida nesta feature; reintrodução é feature futura, se desejada).
* Atualização de conteúdo da página `/setup` (mantido como está; usuário atualizará depois, à parte).
* Anexação retroativa de imagens de comprovante para certificações pendentes (fica registrado em `.docs/pendencias-certificados.md`, mas o anexo em si é ação manual futura do usuário).
* Internacionalização (site continua só em PT-BR).
* Redesign de identidade visual do zero (a paleta/fontes são herdadas do projeto de referência, não criadas do zero).
