# Bússola v2 — Adoção de IA

Adaptação independente das sete fases do Guia Tech Leads Club Beta v0.5, com referências revistas em 2026-09-03. A versão v2 pertence à aplicação; não é uma edição oficial do framework.

## Uso e verificação

- npm run dev
- npm run build
- npm test

Testes cobrem pontuação original, migração v1, resultados incompletos, autonomia, falhas de avaliações, transporte MCP, calibrações, exportação e renderização no servidor dos formulários. Interações e verificações visuais no navegador não foram solicitadas. WebMCP preserva read_adoption_plan e stage_diagnostic_answers quando document.modelContext está disponível; o contrato não foi validado em um cliente WebMCP nesta atualização.

## Novidades

- Quatro avaliações complementares de documentação, dados, ambiente e resultado para o usuário. Não alteram a média das nove dimensões; geram ações no plano de gargalos.
- Prioridade calculada em 7–21. Limiar crítico (11) e percentual L2+ (60%) ajustáveis, com justificativa quando alterados.
- Piloto com fluxo, comparação, datas, fonte, indicadores, metas e decisões de expandir, ajustar ou encerrar. Variações são descritivas, sem inferência causal automática.
- Abrangência da adoção separada da autonomia: sugerir, alterar em ambiente isolado, executar ferramentas, atuar em produção. Controles proporcionais por estágio, escopo, responsável e evidências de avaliação.
- Casos de avaliação com configuração versionada, tarefas, critérios, execuções e evidências. Trocas na configuração invalidam os resultados; mudanças no experimento invalidam a decisão de expansão.
- Governança baseada no risco da mudança, OWASP 2026, MCP por transporte, privacidade/retenção e análise regulatória por mercado, papel e caso de uso.
- Cinco métricas DORA separadas de adoção e resultados. Ondas ajustáveis ao risco e à capacidade.
- Exportação Markdown com todos os campos e fontes. JSON editável com validação de dados e versão.

## Persistência e compatibilidade

Estado exclusivamente local no navegador, sem envio das respostas ao servidor. Chave atual: bussola-ai-adoption-v2. Na ausência dela, a chave bussola-ai-adoption-v1 é lida e migrada; a original permanece intacta. Backups JSON schema 1 são importáveis. Alterações de significado invalidam revisões e checklists afetados. Métricas ambíguas e evidências dos critérios antigos são preservadas como histórico no backup e no relatório, sem conversão automática. Um rascunho inválido não é sobrescrito automaticamente.

Finalizar o planejamento não comprova execução. Resultados, verificações e análises regulatórias são autodeclarados; a Bússola não executa agentes ou testes, não verifica links e não certifica conformidade.

## Identidade e fontes

Mantido o layout azul royal/ciano definido pelo usuário. O logotipo da Askblue continua removido da interface. A imagem social existente foi preservada.

Fontes oficiais, descrição e data de revisão estão em lib/v2.mjs e são exibidas na metodologia e na exportação.
