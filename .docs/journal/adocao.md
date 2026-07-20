# Diário de Adoção SDD — eualannascimento.com

## Contexto da adoção
- Repo alvo: https://github.com/eualannascimento/eualannascimento.com (clonado em `/Users/eualannascimento/Development/eualannascimento.com`)
- Pedido do usuário vai além do `/sdd-adopt` padrão:
  1. Baseline SDD do estado atual (Hugo).
  2. Copiar design/layout/fonte do projeto `project-classificavagas-page-resume` (clonado em `/Users/eualannascimento/Development/project-classificavagas-page-resume`) — stack: HTML/CSS/JS vanilla, tokens em `css/base.css`, fontes Barlow/Barlow Condensed, design system "Industry" em `.docs/design-reference/`.
  3. Atualizar dados olhando o LinkedIn do usuário (via Chrome), sem excluir nada — só adicionar.
  4. Identificar pontos a melhorar.
- Usuário liberou: **não precisa continuar em Hugo** — pode adaptar/reescrever tudo se necessário para acomodar o novo design.
- Decisão de escopo: a skill `/sdd-adopt` documenta o estado ATUAL (Hugo) como baseline, sem alterar código de produção. A reescrita de design + stack + atualização de dados via LinkedIn será conduzida como a primeira feature via `/sdd`, depois da baseline aprovada.

## Etapa A — Inventário (concluído)
- Stack atual: Hugo (extended, min 0.55.0), tema `red-rose` (git submodule) customizado com CSS próprio (`static/css/*.css`), Bootstrap 5 via CDN, Font Awesome via CDN, fonte Jost local (`static/fonts/jost`).
- Diretório `themes/paper` está no repo mas não é referenciado em lugar nenhum (nem em config.toml, nem em partials) — parece resíduo não utilizado.
- Deploy: GitHub Actions (`.github/workflows/`) builda com Hugo e publica em branch `gh-pages`.
- Sem testes, sem linter, sem CI de qualidade — só o workflow de deploy.
- Domínios funcionais identificados (5): Bio, Certificações/Cursos, Setup, Blog, Navegação/Layout (tema visual).
- Projeto pequeno (poucas dezenas de arquivos) — sem necessidade de fan-out de subagents por domínio.

## Etapa B — Engenharia reversa (concluído)
- 5 specs baseline gerados em `.docs/specs/`: navegacao-layout, bio, certificacoes-cursos, setup, blog.
- `architecture.md` gerado.
- Único `[INCERTO]` restante: destino do diretório `themes/paper` (órfão, não referenciado).

## Etapa C — Instalação do template (concluído)
- Copiado de `/Users/eualannascimento/Development/ai-workflow-template`: `.rules/`, `.prompts/`, `.claude/skills/{sdd,sdd-adopt}`, `.claude/settings.json`, `.claude/hooks/check-style.sh`, `.claude/agents/reviewer.md`, `.github/workflows/style-gate.yml`, `CLAUDE.md`, `AGENTS.md`, `.cursorrules`.
- Copiado `_TEMPLATE.md` de `project-classificavagas-page-resume/.docs/specs/`.
- `.rules/global.md` adaptado com stack real (Hugo, sem testes, deploy via `gh-pages`) e nota sobre a migração de stack em aberto.
- Nenhum código de produção foi alterado.

## Próximos passos
- Gate: resolver o `[INCERTO]` do `themes/paper` com o usuário.
- Gate: usuário aprova a baseline.
- Propor micro-commits da adoção (docs/config apenas).
- Depois da baseline aprovada: iniciar `/sdd` para a feature de redesign (copiar design do `project-classificavagas-page-resume`) + atualização de dados via LinkedIn + lista de melhorias identificadas.
