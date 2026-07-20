# Bio (sobre mim)

**Status:** Concluído
**Data:** 2026-07-19

## 1. Resumo e Objetivo
Página `/bio` com a biografia profissional do autor: trajetória de carreira, formação acadêmica e interesses pessoais, acompanhada de uma foto.

## 2. User Stories (Requisitos Funcionais)
* **US01:** Como visitante, quero ler a trajetória profissional do autor, para entender sua experiência antes de um contato.
* **US02:** Como visitante, quero ver uma foto do autor junto ao texto, para associar o conteúdo a uma pessoa real.

## 3. Regras de Negócio e Casos de Falha (Edge Cases)
* **Regra 01:** Conteúdo vem de `content/bio/index.md`, renderizado pelo template `layout: bio` (`layouts/_default/bio.html:1`).
* **Regra 02:** O template injeta um texto fixo acima do conteúdo Markdown: "Página destinada a escrever um pouco da minha biografia profissional." (`layouts/_default/bio.html:10`).
* **Regra 03:** A data exibida no topo do artigo é a `date` do front matter, formatada como `Jan 2, 2006` (`layouts/_default/bio.html:9`) — atualmente fixa em 2024-05-29, sem relação com a última edição real do texto.
* **Regra 04:** Imagem do autor referenciada como `img/me.png`, relativa ao bundle da página (`content/bio/img/me.png`).

## 4. Estrutura de Dados e Componentes
* **Conteúdo (dados a preservar/atualizar):**
  - Formação em andamento: Pós-Graduação em Engenharia de Dados (PUC Minas).
  - Formações concluídas: Tecnólogo em Análise e Desenvolvimento de Sistemas (FATEC), Técnico em Desenvolvimento Web (ETEC).
  - Experiência: 10 anos no Banco Bradesco S.A., mais de 5 anos com automações e análise de dados.
  - Linha do tempo de cargos: 2014 atendimento ao cliente → 2016 gerenciamento de projetos (SAC/Ouvidoria) → 2019 suporte técnico de infraestrutura (3000+ estações) → 2021-atual analista de dados/BI.
  - Interesses pessoais: sair com amigos, restaurantes, tecnologia, música/podcasts, jogos online, automação residencial.
* **Estilo:** `static/css/bio.css` (36 linhas), carregado só nesta página.
* **Template:** `layouts/_default/bio.html`.

## 5. Critérios de Aceite (verificáveis por teste)
* [ ] CA01: Dado `/bio`, quando acessada, então exibe título "bio", data, foto e o texto completo da biografia.
* [ ] CA02: Dado o Markdown de `content/bio/index.md`, quando renderizado, então preserva a formatação em negrito/itálico dos trechos de destaque (anos, cargos, instituições).

## 6. Fora de Escopo
* Tradução para outros idiomas.
* Versão em PDF/currículo formal (isso existe separadamente no projeto `project-classificavagas-page-resume`).

## 7. Dívidas e riscos observados
* **Dado desatualizado (confirmado pelo usuário):** a bio provavelmente não reflete o cargo/formação atuais — é um dos motivos da adoção. A atualização via LinkedIn está planejada como feature pós-baseline.
* **Duplicação de conteúdo:** o único post do blog (`content/blog/001-apresentacao/`) repete o texto da bio quase literalmente, incluindo a mesma imagem. Motivo aparente: usado como post de "apresentação" inicial do blog.
* **Data do front matter não reflete a última atualização real do texto** — se o objetivo é mostrar "atualizado em", esse campo precisa de disciplina de manutenção ou ser removido da UI.
