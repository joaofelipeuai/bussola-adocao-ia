# Bússola v2 — Adoção de IA

Wizard de sete fases para planejar e acompanhar a adoção de IA em engenharia, com diagnóstico, piloto mensurável, governança, avaliações de agentes e cinco métricas DORA. Adaptação independente do framework Tech Leads Club.

Site: [Bússola](https://bussola-adocao-ia.joaofelipesouza.chatgpt.site/).

## Começar no Windows

Requisitos: Node.js 22.13 ou superior e npm. A instalação de dependências existente foi preservada na mudança de pasta.

```powershell
Set-Location 'C:\Users\Joao Souza\Desktop\dev\bussola-adocao-ia'
npm run dev
```

Abra o endereço local exibido no terminal. Para instalar novamente as dependências, use `npm ci` na raiz do projeto.

## Comandos

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Executar para desenvolvimento com atualização automática |
| `npm test` | Verificar regras, migração de backups e renderização |
| `npm run build` | Gerar a versão de produção local |
| `npm start` | Executar o build localmente com Wrangler |
| `npm run lint` | Executar as regras de análise do projeto |
| `npm run format` | Formatar os arquivos do projeto |

## Estrutura

```text
bussola-adocao-ia/
├── app/                  # Página, layout, estilos e metadados
├── components/           # Formulários e relatório
│   └── ui/               # Componentes compartilhados de interface
├── hooks/                # Hooks compartilhados
├── lib/                  # Regras de negócio, persistência e validação
├── tests/                # Testes e dados de exemplo
├── public/               # Imagens e ícones
├── docs/                 # Arquitetura, referências e framework v2
├── .openai/hosting.json  # Vínculo com a publicação existente
├── package.json          # Scripts e dependências
├── package-lock.json     # Versões fixadas das dependências
├── vite.config.ts        # Vinext, Vite e Cloudflare
└── tsconfig.json         # TypeScript e aliases
```

`node_modules`, `dist`, `.next`, `.vinext` e `.wrangler` são gerados localmente e ignorados pelo Git. O histórico e o remoto do repositório foram preservados.

## Documentação

- [Arquitetura e manutenção](docs/ARQUITETURA.md)
- [Autenticação, autorização e isolamento dos rascunhos](docs/ACESSO.md)
- [Funcionalidades e decisões da v2](docs/FRAMEWORK-V2.md)
- [Referências do framework](docs/REFERENCIAS.md)

## Dados e publicação

Os planos ficam no navegador. Use **Salvar backup** para exportar JSON e **Importar** para restaurar, inclusive ao alternar entre o site publicado e localhost. O relatório completo pode ser baixado em Markdown. A aplicação não exige uma chave de API de IA para preencher e exportar o wizard.

Mover ou editar a pasta local não altera a versão publicada. A configuração do Sites foi mantida para futuras publicações. Não armazene credenciais no repositório.
