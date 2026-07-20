/* Dados estruturados da pagina certif.html (Regra 12 do spec redesign-site-pessoal) */
const CertifData = {
  cursosAndamento: [
    { date: "Início - Mai 2024", text: "Jornada de Dados (Luciano Vasconcelos) - Workshops + Bootcamps (SQL e Python)" },
    { badge: "🎓", text: "FIA - Pós-Graduação em Inteligência de Mercado" }
  ],

  certificacoes: [
    { date: "Mai 2026", text: "Power Platform Fundamentals (PL-900) - Microsoft", evidence: { type: "link", href: "https://lnkd.in/dRDkkKyE" } },
    { date: "Mai 2026", text: "Generative AI Fundamentals - Databricks", evidence: { type: "link", href: "https://lnkd.in/dDfYtBGU" } },
    { date: "Abr 2026", text: "Power BI Data Analyst (PL-300) - Microsoft", evidence: { type: "link", href: "https://lnkd.in/dcRJht_F" } },
    { date: "Mar 2026", text: "Azure Data Fundamentals (DP-900) - Microsoft", evidence: { type: "link", href: "https://lnkd.in/dcxnitEg" } },
    { date: "Fev 2026", text: "Azure Fundamentals (AZ-900) - Microsoft", evidence: { type: "link", href: "https://lnkd.in/d3pgz79p" } },
    { date: "Dez 2025", text: "Notion Workflows - Notion Academy", evidence: { type: "link", href: "https://lnkd.in/dTKys7Jb" } },
    { date: "Dez 2025", text: "Notion Essentials - Notion Academy", evidence: { type: "link", href: "https://lnkd.in/dVDCRe_J" } },
    { date: "Dez 2025", text: "Databricks Fundamentals - Databricks", evidence: { type: "link", href: "https://lnkd.in/dGUkWCPg" } },
    { date: "Jul 2020", text: "CertiProf - SFPC Scrum Foundation Professional Certificate", evidence: { type: "image", href: "/img/certification/2020.07-certiprof-sfpc_scrum_foundation_professional_certificate.png" } },
    { date: "Jun 2019", text: "APMG International - COBIT 5 Foundation", evidence: { type: "image", href: "/img/certification/2019.07-apmg_international-cobit-5-foundation.png" } }
  ],

  cursosConcluidos: [
    { date: "Mai 2024", text: "Jornada de Dados - Workshop 7: Estratégia Event Driven e Filas com Amazon SQS", evidence: { type: "image", href: "/img/courses/2024.05-jornada_de_dados-workshop_7_estrategia_event_driven_e_filas_com_amazon_sqs.png" } },
    { date: "Mai 2024", text: "Jornada de Dados - Workshop Aberto: Pipeline ETL com Python do Zero", evidence: { type: "image", href: "/img/courses/2024.05-jornada_de_dados-workshop_aberto_pipeline_etl_com_python_do_zero.png" } },
    { date: "Mai 2024", text: "Alura - Imersão Inteligência Artificial 2ª Edição", evidence: { type: "image", href: "/img/courses/2024.05-alura-imersao_ia_2_edicao.png" } },
    { date: "Set 2022", text: "Alura - Python e TDD: explorando testes unitários", evidence: { type: "image", href: "/img/courses/2022.09-alura-python_e_tdd-explorando_testes_unitarios.png" } },
    { date: "Jul 2021", text: "Alura - Power BI Desktop: carregue, analise e visualize dados", evidence: { type: "image", href: "/img/courses/2021.07-alura-power_bi_desktop-carregue_analise_e_visualize_dados.png" } },
    { date: "Fev 2021", text: "Alura - Python: começando com a linguagem", evidence: { type: "image", href: "/img/courses/2021.02-alura-python-comecando_com_a_linguagem.png" } },
    { date: "Fev 2021", text: "Alura - Dashboard com Tableau: visualize e analise os seus dados", evidence: { type: "image", href: "/img/courses/2021.02-alura-dashboard_com_tableau-visualize_e_analise_os_seus_dados.png" } },
    { date: "Jan 2021", text: "Alura - Git e GitHub: controle e compartilhe seu código", evidence: { type: "image", href: "/img/courses/2021.01-alura-git_e_github-controle_e_compartilhe_seu_codigo.png" } },
    { date: "Out 2020", text: "Coursera - Crash Course on Python", evidence: { type: "image", href: "/img/courses/2020.10-coursera-crash_course_on_python.png" } },
    { date: "Out 2020", text: "Alura - PowerShell parte 1: A linguagem de scripting moderna", evidence: { type: "image", href: "/img/courses/2020.10-alura-powershell_parte_1-a_linguagem_de_scripting_moderna.png" } },
    { date: "Set 2020", text: "Alura - Modelagem de Banco de Dados: Entidades, Relacionamentos e Atributos", evidence: { type: "image", href: "/img/courses/2020.09-alura-modelagem_de_banco_de_dados-entidades_relacionamentos_e_atributos.png" } },
    { date: "Set 2020", text: "Alura - HTML5 e CSS3 parte 4: Avançando no CSS", evidence: { type: "image", href: "/img/courses/2020.09-alura-html5_e_css3_parte_4-avancando_no_css.png" } },
    { date: "Ago 2020", text: "Alura - Personal Branding: entenda o que é e como você pode usá-la a favor da sua carreira", evidence: { type: "image", href: "/img/courses/2020.08-alura-personal_branding-entenda_o_que_e_e_como_voce_pode_usa_la_a_favor_da_sua_carreira.png" } },
    { date: "Ago 2020", text: "Alura - HTML5 e CSS3 parte 3: Trabalhando com formulários e tabelas", evidence: { type: "image", href: "/img/courses/2020.08-alura-html5_e_css3_parte_3-trabalhando_com_formularios_e_tabelas.png" } },
    { date: "Ago 2020", text: "Alura - HTML5 e CSS3 parte 2: Posicionamento, listas e navegação", evidence: { type: "image", href: "/img/courses/2020.08-alura-html5_e_css3_parte_2-posicionamento_listas_e_navegacao.png" } },
    { date: "Ago 2020", text: "Alura - Currículo: como chamar a atenção dos entrevistadores", evidence: { type: "image", href: "/img/courses/2020.08-alura-curriculo-como_chamar_a_atencao_dos_entrevistadores.png" } },
    { date: "Ago 2020", text: "Conquer - Inteligência Financeira", evidence: { type: "image", href: "/img/courses/2020.08-conquer-inteligencia_financeira.png" } },
    { date: "Jul 2020", text: "Estabilis Academy - Agile Scrum Foundation", evidence: { type: "image", href: "/img/courses/2020.07-estabilis_academy-agile_scrum_foundation.png" } },
    { date: "Mai 2020", text: "Alura - HTML5 e CSS3 parte 1: A primeira página da Web", evidence: { type: "image", href: "/img/courses/2020.07-alura-html5_e_css3_parte_1-crie_uma_pagina_da_web.png" } },
    { date: "Abr 2020", text: "Conquer - Inteligência Emocional", evidence: { type: "image", href: "/img/courses/2020.04-conquer-inteligencia_emocional.png" } },
    { date: "Nov 2019", text: "Alura - Fundamentos do Storytelling: Visão de negócios e desenvolvimento pessoal", evidence: { type: "image", href: "/img/courses/2019.11-alura-storytelling-visao_de_negocios_e_desenvolvimento_pessoal.png" } },
    { date: "Out 2019", text: "Caelum - Java Spring e Testes na Prática" },
    { date: "Ago 2019", text: "Caelum - Java para Desenvolvimento Web" },
    { date: "Jul 2019", text: "Caelum - Java e Orientação a Objetos" },
    { date: "Out 2018", text: "Alura - Produtividade: hábitos e práticas para o dia a dia", evidence: { type: "image", href: "/img/courses/2018.10-alura-produtividade-habitos_e_praticas_para_o_dia_a_dia.png" } },
    { date: "Set 2018", text: "Trainning - BI e Big Data utilizando Power BI" },
    { date: "Ago 2018", badge: "🎓", text: "FATEC - Tecnólogo em Análise e Desenvolvimento de Sistemas" },
    { date: "Ago 2017", text: "Caelum - Gerenciamento Ágil de Projetos de Software com Scrum" },
    { date: "Dez 2012", badge: "🎓", text: "ETEC - Técnico em Desenvolvimento Web" },
    { date: "Dez 2012", badge: "🎓", text: "ETEC - Ensino Médio" }
  ]
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = CertifData;
}
