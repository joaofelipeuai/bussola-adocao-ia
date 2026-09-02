# Bússola — Adoção de IA

Wizard independente baseado no Guia Completo de Adoção de IA do Tech Leads Club, Beta v0.5 (37 páginas). Dados do usuário ficam exclusivamente no localStorage do navegador. Backup/importação JSON e exportação Markdown.

## Uso e validação
- npm run dev
- npm run build
- node --test lib/framework.test.mjs

Regras de pontuação, pesos, limites de rollout, gates de proficiência, importação e exportação cobertos por testes de domínio. Compilação de produção validada. Testes de interação/visuais no navegador não foram solicitados. WebMCP registra read_adoption_plan e stage_diagnostic_answers quando document.modelContext está disponível; não foi possível verificar o contrato em um contexto WebMCP compatível nesta sessão.

## Decisões da adaptação
- Mantida a fórmula de prioridade (impacto × 3 + (4 − esforço) × 2 + risco × 2), cuja faixa real é 7–21; o guia informa máximo 15. Limiar crítico preservado em 11.
- Alternativas do diagnóstico resumidas; perguntas, dimensões, pesos e thresholds preservados.
- Desempate do gargalo por avaliação humana do impacto operacional.
- Arquétipos escolhidos explicitamente, pois o guia não define limites numéricos para pequeno/médio/grande.
- Níveis iniciais dos templates e marcos por esforço são sugestões da adaptação; calibrações e gates seguem o guia.
- Planejamento separado de execução. Checklists e evidências são autodeclarados.
- Todos os 9 itens de política e 11 indicadores listados no guia foram incluídos, apesar dos títulos divergentes.
- Não foram reproduzidas estatísticas não verificadas nem afirmações regulatórias ou comerciais do guia.

## Identidade visual
Layout adaptado às imagens askblue fornecidas pelo usuário: azul royal #030cef, ciano #00e6ef e fundos claros. O logotipo original é exibido por enquadramento CSS da imagem fornecida, sem redesenhar sua tipografia.

