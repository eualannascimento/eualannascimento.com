# eualannascimento.com

Código-fonte do site pessoal de Alan Nascimento: bio, certificações e setup de trabalho, publicado em [eualannascimento.com](https://eualannascimento.com).

Serve como referência para quem quer montar um site pessoal simples, sem framework nem build, hospedado como página estática.

## Stack

HTML, CSS e JavaScript puros. Sem framework, sem bundler, sem dependências de build.

## Estrutura

- `index.html`, `bio.html`, `certif.html`, `setup.html`: páginas do site.
- `css/`: estilos, incluindo o tema claro/escuro.
- `js/`: dados de certificações e setup, alternância de tema.
- `assets/`: fontes e imagens fonte.
- `tests/smoke-test.js`: teste de fumaça das páginas.

## Rodando localmente

Basta servir a pasta como arquivos estáticos, por exemplo:

```bash
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Testes

```bash
node tests/smoke-test.js
```
