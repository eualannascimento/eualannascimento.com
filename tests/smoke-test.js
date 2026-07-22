/**
 * Smoke tests - executar com: node tests/smoke-test.js
 * Verifica os criterios de aceite do spec .docs/specs/redesign-site-pessoal.md
 */

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const exists = (p) => fs.existsSync(path.join(root, p));

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
    console.log(`  ✓ ${message}`);
  } else {
    failed++;
    console.error(`  ✗ ${message}`);
  }
}

console.log('\n=== eualannascimento.com - Smoke Tests ===\n');

// --- CA01: sem dependencia de Hugo/build ---
console.log('Sem Hugo/build step:');
assert(!exists('config.toml'), 'config.toml (Hugo) removido');
assert(!exists('layouts'), 'pasta layouts/ (Hugo) removida');
assert(!exists('.gitmodules'), '.gitmodules (submodule do tema) removido');
assert(!exists('themes'), 'pasta themes/ removida');
assert(!exists('content'), 'pasta content/ (Markdown Hugo) removida');
assert(exists('index.html'), 'index.html existe na raiz (site vanilla)');

const pages = ['index.html', 'bio.html', 'certif.html', 'setup.html'];

// --- CA02: header com tokens de design (Barlow/Barlow Condensed) ---
console.log('\nDesign tokens (Barlow/Barlow Condensed):');
assert(exists('css/base.css'), 'css/base.css existe');
const baseCss = read('css/base.css');
assert(baseCss.includes('--font-body') && baseCss.includes('Barlow'), 'token --font-body usa Barlow');
assert(baseCss.includes('--font-heading') && baseCss.includes('Barlow Condensed'), 'token --font-heading usa Barlow Condensed');
assert(baseCss.includes('--color-'), 'tokens de cor definidos em variaveis CSS');

pages.forEach((page) => {
  const html = read(page);
  assert(html.includes('css/base.css'), `${page} referencia css/base.css`);
  assert(html.includes('<a class="brand" href="/">'), `${page} tem link de volta para a home (brand)`);
  assert(html.includes('linkedin.com/in/eualannascimento'), `${page} tem link de LinkedIn`);
  assert(/href="https:\/\/www\.linkedin\.com\/in\/eualannascimento"[^>]*target="_blank"/.test(html), `${page} abre o link do LinkedIn em nova aba`);
});

const homeHtml = read('index.html');
assert(
  /href="\/?bio\.html"/.test(homeHtml) && /href="\/?certif\.html"/.test(homeHtml) && /href="\/?setup\.html"/.test(homeHtml),
  'index.html oferece navegacao para bio/certif/setup (nav-cards)'
);

// --- Regra 12: certif.html e setup.html consomem dados estruturados via JS ---
console.log('\nDados estruturados (Regra 12):');
assert(exists('js/certif-data.js'), 'js/certif-data.js existe');
assert(exists('js/setup-data.js'), 'js/setup-data.js existe');
const certifHtml = read('certif.html');
const setupHtml = read('setup.html');
assert(certifHtml.includes('/js/certif-data.js') && certifHtml.includes('/js/render.js'), 'certif.html carrega certif-data.js e render.js');
assert(setupHtml.includes('/js/setup-data.js') && setupHtml.includes('/js/render.js'), 'setup.html carrega setup-data.js e render.js');
assert(!/<li>.*Alura.*<\/li>/s.test(certifHtml), 'certif.html nao tem mais itens hardcoded (renderizados via JS)');

const CertifData = require(path.join(root, 'js/certif-data.js'));
const SetupData = require(path.join(root, 'js/setup-data.js'));
const allCertifEntries = [...CertifData.cursosAndamento, ...CertifData.certificacoes, ...CertifData.cursosConcluidos];
const certifTexts = allCertifEntries.map((e) => e.text);

// --- CA03: fatos antigos preservados ---
console.log('\nFatos preservados (bio):');
const bioHtml = read('bio.html');
assert(bioHtml.includes('Bradesco'), 'bio menciona Bradesco');
assert(bioHtml.includes('FATEC'), 'bio menciona FATEC');
assert(bioHtml.includes('ETEC'), 'bio menciona ETEC');
assert(bioHtml.includes('2014'), 'bio menciona inicio em 2014 (atendimento ao cliente)');
assert(bioHtml.includes('2016') && bioHtml.includes('2019') && bioHtml.includes('2021'), 'bio preserva marcos da trajetoria (2016, 2019, 2021)');

console.log('\nFatos preservados (certif-data.js), por item exato:');
const preservedCerts = [
  'CertiProf - SFPC Scrum Foundation Professional Certificate',
  'APMG International - COBIT 5 Foundation',
  'Alura - Fundamentos do Storytelling: Visão de negócios e desenvolvimento pessoal',
  'Alura - Dashboard com Tableau: visualize e analise os seus dados',
  'Alura - Power BI Desktop: carregue, analise e visualize dados',
  'Alura - Git e GitHub: controle e compartilhe seu código',
  'Coursera - Crash Course on Python',
  'Alura - PowerShell parte 1: A linguagem de scripting moderna',
  'Alura - Modelagem de Banco de Dados: Entidades, Relacionamentos e Atributos',
  'Alura - HTML5 e CSS3 parte 1: A primeira página da Web',
  'Alura - HTML5 e CSS3 parte 2: Posicionamento, listas e navegação',
  'Alura - HTML5 e CSS3 parte 3: Trabalhando com formulários e tabelas',
  'Alura - HTML5 e CSS3 parte 4: Avançando no CSS',
  'Alura - Personal Branding: entenda o que é e como você pode usá-la a favor da sua carreira',
  'Alura - Currículo: como chamar a atenção dos entrevistadores',
  'Conquer - Inteligência Financeira',
  'Estabilis Academy - Agile Scrum Foundation',
  'Conquer - Inteligência Emocional',
  'Caelum - Java Spring e Testes na Prática',
  'Caelum - Java para Desenvolvimento Web',
  'Caelum - Java e Orientação a Objetos',
  'Alura - Produtividade: hábitos e práticas para o dia a dia',
  'Trainning - BI e Big Data utilizando Power BI',
  'FATEC - Tecnólogo em Análise e Desenvolvimento de Sistemas',
  'Caelum - Gerenciamento Ágil de Projetos de Software com Scrum',
  'ETEC - Técnico em Desenvolvimento Web',
  'ETEC - Ensino Médio',
  'Alura - Python: começando com a linguagem',
  'Alura - Python e TDD: explorando testes unitários',
  'Alura - Imersão Inteligência Artificial 2ª Edição'
];
preservedCerts.forEach((item) => {
  assert(certifTexts.includes(item), `certif-data.js preserva item existente: "${item}"`);
});
assert(certifTexts.filter((t) => t.includes('ETEC')).length === 2, 'as 2 entradas distintas de ETEC continuam presentes (nao apenas uma)');
assert(certifTexts.filter((t) => t.includes('HTML5 e CSS3')).length === 4, 'as 4 partes do curso de HTML5 e CSS3 continuam presentes');

// --- CA04: dados novos do LinkedIn adicionados ---
console.log('\nDados novos do LinkedIn:');
assert(bioHtml.includes('Data Engineer') || bioHtml.includes('Engenheiro de Dados'), 'bio reflete o cargo atual (Data Engineer)');
assert(bioHtml.includes('2025'), 'bio menciona a mudança de cargo em 2025');
const newCerts = [
  'Power Platform Fundamentals', 'Generative AI Fundamentals', 'Power BI Data Analyst',
  'Azure Data Fundamentals', 'Azure Fundamentals', 'Notion Workflows', 'Notion Essentials',
  'Databricks Fundamentals'
];
newCerts.forEach((item) => {
  assert(certifTexts.some((t) => t.includes(item)), `certif-data.js inclui certificacao nova do LinkedIn: "${item}"`);
});
assert(CertifData.certificacoes.filter((c) => c.evidence && c.evidence.type === 'link').length === 8, '8 certificacoes novas tem evidencia por link de credencial');

// --- CA05: conflito de dados resolvido (PUC Minas removida, FIA adicionada) ---
console.log('\nConflito de dados resolvido:');
assert(!bioHtml.includes('PUC Minas') && !certifTexts.some((t) => t.includes('PUC Minas')), 'menção à PUC Minas removida (autorizado explicitamente pelo usuário)');
assert(bioHtml.includes('FIA') || certifTexts.some((t) => t.includes('FIA')), 'pós-graduação atual (FIA - Inteligência de Mercado) presente');

// --- CA06: certificacoes sem comprovante ---
console.log('\nControle de certificacoes pendentes:');
assert(exists('.docs/pendencias-certificados.md'), 'arquivo de controle .docs/pendencias-certificados.md existe');
assert(SetupData.hardware.length === 8 && SetupData.stack.length === 6, 'setup-data.js preserva os 8 itens de hardware e 6 de stack originais');

// --- CA07: SEO (meta description + Open Graph) ---
console.log('\nSEO (meta description + Open Graph):');
pages.forEach((page) => {
  const html = read(page);
  assert(!html.includes('Your description'), `${page} nao usa mais a meta description generica`);
  assert(/<meta\s+name="description"\s+content="[^"]{10,}"/.test(html), `${page} tem meta description especifica`);
  assert(/<meta\s+property="og:title"/.test(html), `${page} tem og:title`);
  assert(/<meta\s+property="og:description"/.test(html), `${page} tem og:description`);
  assert(/<meta\s+property="og:image"/.test(html), `${page} tem og:image`);
  assert(/<meta\s+property="og:url"/.test(html), `${page} tem og:url`);
  assert(/<meta\s+name="twitter:card"/.test(html), `${page} tem twitter:card`);
});

// --- CA08: deploy sem build ---
console.log('\nDeploy sem build:');
assert(!exists('.github/workflows/deploy.yml') || !read('.github/workflows/deploy.yml').toLowerCase().includes('hugo'), 'workflow de deploy nao builda mais com Hugo');
assert(exists('CNAME') && read('CNAME').trim() === 'eualannascimento.com', 'CNAME preserva o dominio customizado ao migrar o Pages para a branch main');

// --- Estilo anti-IA: sem travessao ---
console.log('\nTextos sem travessao:');
const withDash = pages.filter((p) => /\u2014|\u2013/.test(read(p)));
assert(withDash.length === 0, `Nenhum travessao nas paginas HTML${withDash.length ? ' (falha: ' + withDash.join(', ') + ')' : ''}`);

// --- Summary ---
console.log(`\n=== Resultado: ${passed} passou, ${failed} falhou ===\n`);
if (failed > 0) {
  process.exit(1);
}
