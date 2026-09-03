# Arquitetura e manutenção

## Organização

- `app/page.jsx`: coordenação das sete fases, navegação, gravação local, importação e ferramentas WebMCP.
- `app/layout.tsx`: idioma e metadados da página.
- `app/*.css`: estilos da aplicação e identidade visual.
- `components/`: formulários por fase, relatório e componentes de interface.
- `components/ui/`: componentes compartilhados baseados em shadcn/Base UI.
- `lib/framework.mjs`: diagnóstico, pontuação, regras de avanço e relatório Markdown.
- `lib/v2.mjs`: complementos da v2, autonomia, avaliações, métricas e fontes.
- `lib/saved.mjs` e `lib/saved-v2.mjs`: validação de backups e migração do formato v1.
- `tests/`: testes de domínio, compatibilidade e renderização no servidor; dados de exemplo em `fixtures.mjs`.
- `public/`: imagens, ícone e prévia social existentes.
- `docs/`: documentação de desenvolvimento, referências e decisões da adaptação.
- `.openai/hosting.json`: vínculo com o projeto existente no Sites; preservar o identificador.

## Fluxo de dados

O estado do wizard fica no React e é salvo no localStorage. Os formulários chamam as funções de domínio para calcular diagnóstico, pendências e recomendações. Alterações relevantes invalidam revisões posteriores. O relatório usa o mesmo estado e pode ser exportado como Markdown ou JSON.

Não há banco de dados nem serviço próprio para armazenar os planos. Os valores são autodeclarados; a aplicação não executa agentes ou testes das organizações e não valida evidências externas.

## Desenvolvimento e build

React 19 com Vinext/Vite, componentes JSX/TSX e regras de negócio em módulos JavaScript ESM. O alias `@/` aponta para a raiz do projeto.

`npm run dev` inicia o ambiente local. `npm run build` produz os arquivos estáticos em `dist/client` e o Worker em `dist/server`. `npm start` executa o build localmente com Wrangler e exige um build anterior.

`node_modules`, `dist`, `.next`, `.vinext` e `.wrangler` são diretórios gerados e não entram no versionamento. As dependências são controladas pelo `package-lock.json`; use `npm ci` para reproduzir a instalação.

## Publicação

O site existente continua em https://bussola-adocao-ia.joaofelipesouza.chatgpt.site/.

A mudança de pasta e a execução local não publicam alterações. A publicação usa Sites: build validado, envio do código, versão salva e implantação. O repositório Git e seu remoto foram preservados. Credenciais de envio são temporárias, obtidas pelo Sites e usadas por comando, sem gravar tokens no projeto.

## Cuidados de manutenção

- Alterações no estado persistido precisam de validação e migração compatíveis com os backups antigos.
- Mantenha o planejamento separado da execução e das evidências autodeclaradas.
- Atualize a data das referências quando o conteúdo for novamente verificado.
- O acesso ao site publicado e o armazenamento no navegador são mecanismos separados.
- Dados salvos no endereço publicado não aparecem automaticamente em localhost: use exportação e importação JSON para transferi-los.
