document.addEventListener("DOMContentLoaded", function() {
    fetch('https://github.com/eualannascimento/eualannascimento/blob/main/README.md')
        .then(response => response.text())
        .then(text => {
            document.getElementById('github-content').innerHTML = marked(text);
        })
        .catch(error => {
            console.error('Erro ao carregar o conteúdo do GitHub:', error);
            document.getElementById('github-content').innerHTML = 'Erro ao carregar o conteúdo.';
        });
});

function fetchMarkdown(url) {
    fetch(url)
      .then(response => response.text())
      .then(markdown => {
        // Converter o Markdown para HTML (você pode usar uma biblioteca como o showdown.js)
        const converter = new showdown.Converter();
        const html = converter.makeHtml(markdown);
  
        // Inserir o HTML no elemento selecionado
        const contentElement = document.getElementById('markdown-content');
        contentElement.innerHTML = html;
      })
      .catch(error => {
        console.error("Erro ao buscar o Markdown:", error);
      });
  }
  
  // Exemplo de uso
  fetchMarkdown('https://github.com/eualannascimento/eualannascimento/blob/main/README.md');