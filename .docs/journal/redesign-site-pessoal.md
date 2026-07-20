# Diário - redesign-site-pessoal

**Fase atual:** 5 - Micro-commits (spec Pronto para Commit)
**Último passo:** dados do LinkedIn coletados via Chrome (headline, sobre, experiência, formação, 10 certificações, foto de perfil salva em `/var/folders/lm/k8whgkn92jg9_8l83fmf04hm0000gn/T/claude-chrome-screenshots-aGheVJ/screenshot-1784517610598-0.png`, recorte circular 558x556, precisa virar arquivo definitivo em `img/`). Duas contradições resolvidas com o usuário (ver "Dados coletados do LinkedIn" abaixo).
**Próxima ação:** propor divisão de micro-commits ao usuário e, após aprovação, executar (Fase 5) e seguir para Fase 6 (Deploy/PR).

## Fase 4 - Review (concluído)
Subagent `reviewer` (contexto limpo) auditou o diff completo. 13 achados (1 crítico, 2 altos, 2 médios, 8 baixos). Triagem:
- **F2 (Crítica) corrigido:** faltava `CNAME` na raiz — sem ele, ao mover o GitHub Pages de `gh-pages` para `main` (Regra 13) o domínio customizado cairia. Criado `CNAME` com `eualannascimento.com`.
- **F1 (Alta) corrigido:** Regra 12 (dados estruturados) não tinha sido implementada — certif/setup estavam hardcoded em HTML. Criados `js/certif-data.js`, `js/setup-data.js`, `js/render.js`; `certif.html`/`setup.html` agora renderizam via JS a partir desses dados.
- **F3 (Alta) corrigido:** `img/avatar.png`/`img/me.png` eram screenshot bruto do modal do LinkedIn (cantos pretos, fundo do modal visível fora do círculo) — afetava principalmente o `og:image` cru em previews de compartilhamento. Recortado com PIL para um PNG circular com alfa transparente (556x556).
- **F4 (Média) corrigido:** testes de "fato preservado" usavam substring frágil (`ETEC` e `HTML5 e CSS3` aparecem em múltiplas entradas, uma remoção real não seria detectada). Reescrito para checar itens exatos via `js/certif-data.js` + contagem de ocorrências.
- **F5 (Média) corrigido:** faltava asserção de `twitter:card` no smoke-test apesar de estar no CA07. Adicionada.
- **F8 (Baixa) corrigido:** imagem órfã (`2020.24-alura-linkedin-...png`, nunca referenciada) removida.
- **F9 (Baixa) corrigido:** contraste do link no modo escuro (`--color-accent` sobre `--color-bg` escuro ≈4.29:1, abaixo do AA) trocado para `--color-accent-2` (≈5.28:1, dentro do AA).
- **F6, F7, F10, F11, F12 (Baixa, aceitos como dívida, não corrigidos nesta rodada:** caminho de screenshot local no diário (ruído, não é segredo); alguns tokens CSS não utilizados (`--radius-sm`, `--radius`, `--color-neutral-*`, `.pending-badge`); favicon sem múltiplos tamanhos/apple-touch-icon; classe `.time` reaproveitada com semântica diferente em `setup.html`; reordenação cosmética de emoji/data num item de certificação. Nenhum afeta funcionalidade, segurança ou os critérios de aceite do spec.
- Suíte final: **114/114 testes passando** (`node tests/smoke-test.js`).
- Verificação visual no navegador (index/bio/certif/setup) confirmada, incluindo dark mode.

## Dados coletados do LinkedIn (2026-07-20)
- **Headline:** "BI e Insights | Engenheiro de Dados no Bradesco | 4x Microsoft Certified (PL-300, PL-900, DP-900, AZ-900) | Power BI, Looker Studio, SQL, Databricks (PySpark) | IA aplicada a dados"
- **Localização:** São Paulo, Brasil
- **Sobre (texto integral do LinkedIn, para inspirar/complementar a bio, sem copiar literalmente por ser 1a pessoa "de currículo" e não o tom do site):**
  "Transformo dados em decisões: 12 anos de Banco Bradesco, 5 anos em Business Intelligence, atuando ponta a ponta: da ingestão e validação de dados à entrega de insights que orientam decisões executivas. Hoje, como Engenheiro de Dados, construo pipelines em Databricks (PySpark) e SQL. Isso me dá algo raro: falar a língua da engenharia e do negócio.
  O que eu entrego: dashboards executivos em Power BI e Looker Studio (do requisito à adoção); definição de indicadores, regras de negócio e camadas de KPIs documentadas; pipelines e rotinas de ETL/ELT confiáveis com atualização diária; automação low-code (Power Apps, Power Automate) integrada a dados; análises com estatística descritiva, identificação de padrões e tendências.
  Resultados: 15+ dashboards ativos para cerca de 50 usuários executivos de Vendas Digitais; solução em Power Apps que levou relatórios de atualização semanal para diária, economizando 1 semana de trabalho manual por mês; mentoria técnica de estagiários, com padronização de rotinas e boas práticas.
  Stack: BI (Power BI/DAX, Looker Studio); Dados (SQL - Teradata e Hive, Python, Databricks/PySpark, SAS e Git); IA generativa aplicada a análises e automação (Claude e Copilot), com formação contínua pela Anthropic Academy; Low-code e scripts (Power Apps, Power Automate, SharePoint e PowerShell).
  Formação e certificações: 4x Microsoft Certified (PL-300, PL-900, DP-900, AZ-900); Pós-graduando em Inteligência de Mercado (FIA)."
- **Experiência (Bradesco, tempo integral, 12a):**
  1. Data Engineer  -  mai/2025-atual (1a3m)  -  Osasco, SP, Híbrido. Pipelines de dados/fluxos analíticos (Databricks+SQL), automação/padronização ETL/ELT, otimização de queries/jobs, interface com áreas de negócio para KPIs, governança de dados.
  2. Business Intelligence Analyst  -  mar/2021-abr/2025 (4a2m)  -  SP, Híbrido. Dashboards executivos ponta a ponta em Power BI, automação ETL (SQL/Python/SAS), 15+ dashboards, mentoria de estagiários, análises ad hoc. Projeto de destaque: PowerApps para centralização de acesso a relatórios (~50 usuários ativos, economia de ~1 semana/mês, dados diários antes semanais).
  3. IT Infrastructure Engineer  -  fev/2019-mar/2021 (2a2m)  -  SP, Híbrido. Suporte técnico, automação via PowerShell/Python/VBA, indicadores de qualidade. Projeto: CLI em PowerShell para orquestração de scripts.
  4. Project Analyst  -  mar/2016-fev/2019 (3a)  -  SP, presencial. Condução de projetos/processos de atendimento ao cliente, reuniões com stakeholders, relatórios executivos. Projeto: redesenho dos fluxos do SAC Alô Bradesco.
  5. Customer Service  -  ago/2014-mar/2016 (1a8m)  -  SP, presencial. Atendimento transacional bancário.
- **Formação acadêmica (LinkedIn):** FATEC - Tecnólogo em Análise e Desenvolvimento de Sistemas (2014-2018); ETEC Camargo Aranha - Técnico em Informática para Internet (2011-2012); ETEC José Rocha Mendes - Ensino Médio (2010-2012). **Não há PUC Minas listada.**
- **Pós-graduação atual (só aparece no texto "Sobre", não como item de Formação acadêmica estruturado):** Inteligência de Mercado, FIA  -  em andamento ("Pós-graduando").
- **Decisão do usuário sobre a contradição de cargo:** atualizar a bio para refletir Data Engineer (mai/2025-atual) como cargo atual, mantendo o histórico de BI Analyst e cargos anteriores.
- **Decisão do usuário sobre a contradição de pós-graduação:** REMOVER a menção à Pós-Graduação em Engenharia de Dados da PUC Minas (autorização explícita, item a item, conforme Regra 07 do spec) e substituir pela pós atual: Inteligência de Mercado (FIA), em andamento.
- **Certificações/badges no LinkedIn (10, com link "Exibir credencial" cada uma = evidência, equivalente ao 📄 mesmo sem imagem local):**
  1. Power Platform Fundamentals (PL-900)  -  Microsoft  -  mai/2026  -  NOVA
  2. Generative AI Fundamentals  -  Databricks  -  mai/2026  -  NOVA
  3. Power BI Data Analyst (PL-300)  -  Microsoft  -  abr/2026 (expira abr/2027)  -  NOVA
  4. Azure Data Fundamentals (DP-900)  -  Microsoft  -  mar/2026  -  NOVA
  5. Azure Fundamentals (AZ-900)  -  Microsoft  -  fev/2026  -  NOVA
  6. COBIT 5 Foundation  -  APMG International  -  jul/2019  -  já existe no site
  7. Notion Workflows  -  Notion  -  dez/2025 (expira dez/2027)  -  NOVA
  8. Notion Essentials  -  Notion  -  dez/2025 (expira dez/2027)  -  NOVA
  9. Databricks Fundamentals  -  Databricks  -  dez/2025 (expira dez/2026)  -  NOVA
  10. Scrum Foundation Professional Certification (SFPC)  -  Certiprof  -  jul/2020 (expirou jul/2022)  -  já existe no site
  - **Decisão de mapeamento (minha, dentro do escopo já autorizado, não precisou perguntar):** como as 8 certificações novas têm link verificável "Exibir credencial", elas contam como COM comprovante (uso o link como equivalente ao 📄), não entram em `.docs/pendencias-certificados.md`. Esse arquivo fica reservado para itens futuros sem nenhuma evidência (nem imagem, nem link).
- **Foto de perfil:** salva via screenshot (recorte circular, já com fundo azul do LinkedIn e bordas pretas fora do círculo) em `/var/folders/lm/k8whgkn92jg9_8l83fmf04hm0000gn/T/claude-chrome-screenshots-aGheVJ/screenshot-1784517610598-0.png`. Precisa ser recortada/tratada antes de virar `img/avatar.png` e `img/me.png` definitivos (a versão atual tem cantos pretos do modal, não é um arquivo retangular limpo).

## Contexto
- Feature pedida pelo usuário logo após aprovar a baseline SDD (`/sdd-adopt` concluído em 2026-07-19).
- Escopo: redesign visual copiando tokens do `project-classificavagas-page-resume` (Barlow/Barlow Condensed, paleta neutra+accent azul-acinzentado, radius pequenos, sombras suaves), decisão de stack em aberto (usuário autorizou abandonar Hugo), atualização de conteúdo via LinkedIn (só adicionar, nunca remover), e endereçar as dívidas listadas nos specs baseline (`.docs/specs/baseline-*.md`, seção 7 de cada um).
- Repo alvo: `/Users/eualannascimento/Development/eualannascimento.com`.
- Repo de referência de design: `/Users/eualannascimento/Development/project-classificavagas-page-resume`.

## Decisões do Grilling
1. Stack: HTML/CSS/JS vanilla, sem build, substituindo Hugo.
2. Blog: removido (fora de escopo nesta feature).
3. Design: tokens copiados de `project-classificavagas-page-resume/css/base.css` (Barlow/Barlow Condensed, paleta, radius, sombras).
4. Dados via LinkedIn: só adicionar, nunca remover.
5. Conflito de dados: parar e perguntar item a item, nunca presumir.
6. Certificações novas sem comprovante: listar sem 📄, registrar em `.docs/pendencias-certificados.md`.
7. Setup: mantém conteúdo atual, atualização fica para depois.
8. Foto: atualizar avatar/bio com foto atual do LinkedIn.
9. Melhorias da baseline (meta description, Open Graph, dados estruturados): implementadas nesta mesma feature.
10. Deploy: GitHub Pages direto da `main`, sem workflow de build.
11. URLs: arquivos `.html` (bio.html, certif.html, setup.html).
