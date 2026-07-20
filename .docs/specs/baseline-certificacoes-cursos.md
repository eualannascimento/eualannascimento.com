# Certificações e Cursos

**Status:** Concluído
**Data:** 2026-07-19

## 1. Resumo e Objetivo
Página `/certif` que lista cursos em andamento, certificações conquistadas e cursos concluídos, com link para a imagem do certificado quando disponível.

## 2. User Stories (Requisitos Funcionais)
* **US01:** Como visitante, quero ver os cursos que o autor está fazendo atualmente, para entender em que ele está investindo agora.
* **US02:** Como visitante, quero ver as certificações formais conquistadas, com evidência (imagem), para validar a credencial.
* **US03:** Como visitante, quero ver o histórico completo de cursos concluídos em ordem cronológica decrescente, para entender a evolução de aprendizado do autor.

## 3. Regras de Negócio e Casos de Falha (Edge Cases)
* **Regra 01:** Conteúdo vem de `content/certif/index.md`, template `layout: certif` (`layouts/_default/certif.html:1`).
* **Regra 02:** A página é dividida em 3 blocos manuais no Markdown: "Cursos em Andamento", "Certificações Conquistadas", "Cursos Concluídos" — não há um schema de dados estruturado (JSON/YAML), é tudo texto Markdown com convenção de emojis.
* **Regra 03:** Legenda fixa explicando os emojis usados: 🎓 = formação acadêmica, 📄 = link para imagem do certificado (`layouts/_default/certif.html:11-12`).
* **Regra 04:** Nem todo item tem certificado/imagem (ex.: cursos da Caelum e o item "Trainning - BI e Big Data" não têm link 📄) — o emoji 📄 só aparece quando existe evidência.
* **Regra 05:** Imagens de curso ficam em `content/certif/img/courses/`, imagens de certificação formal em `content/certif/img/certification/`, nomeadas com padrão `AAAA.MM-instituicao-slug_do_curso.png`.
* **Regra 06:** Ordem cronológica é mantida manualmente (mais recente primeiro) — não há ordenação automática por data.

## 4. Estrutura de Dados e Componentes
* **Itens "Em Andamento" (2):** Jornada de Dados (Luciano Vasconcelos) desde mai/2024; PUC Minas Pós-Graduação em Engenharia de Dados desde abr/2024.
* **Certificações formais (2):** CertiProf SFPC Scrum Foundation (jul/2020); APMG International COBIT 5 Foundation (jun/2019).
* **Cursos concluídos:** 25 itens de 2012 a 2024, instituições incluem Alura, Coursera, Caelum, Conquer, Estabilis Academy, Jornada de Dados, FATEC, ETEC.
* **Estilo:** `static/css/certif.css` (25 linhas).
* **Template:** `layouts/_default/certif.html`.

## 5. Critérios de Aceite (verificáveis por teste)
* [ ] CA01: Dado `/certif`, quando acessada, então exibe os 3 blocos na ordem Em Andamento → Certificações → Cursos Concluídos.
* [ ] CA02: Dado um item com emoji 📄, quando clicado, então abre a imagem do certificado correspondente.
* [ ] CA03: Dado um item de formação (🎓), quando exibido, então está visualmente distinguível dos demais itens.

## 6. Fora de Escopo
* Validação automática de links quebrados de imagem.
* Filtro/busca por instituição ou tipo.

## 7. Dívidas e riscos observados
* **Sem estrutura de dados:** tudo é Markdown em prosa com convenção de emoji — qualquer mudança de layout (ex.: cards, timeline visual) exige reescrever o conteúdo, não só o template. Se o redesign for adotar o estilo do projeto de referência, vale considerar extrair isso para um formato estruturado (lista JS/JSON) como o `js/config.js` do projeto de referência faz com seções do currículo.
* **Lista desatualizada (confirmado pelo usuário):** cursos concluídos após mai/2024 não estão listados (ex.: a Pós-Graduação na PUC Minas que aparecia "em andamento" pode já ter concluído). Atualização via LinkedIn está planejada como feature pós-baseline, com regra explícita de só adicionar, nunca remover.
* **Sem paginação/colapso:** a lista de 25 cursos concluídos é longa e cresce a cada novo curso, sem agrupamento por ano nem "ver mais".
