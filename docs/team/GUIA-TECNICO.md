# Bússola — entrada da equipe técnica

Inspeção do código em 05/10/2026, revisão 7c9e02b9d3bd1c3c9fc5852a78793c4e5694caff.
Código local: `C:\Users\Joao Souza\Desktop\dev\bussola-adocao-ia`.
Este pacote contém documentação; obter o código pelo repositório que João disponibilizar.

## Stack e mapa do código

A aplicação usa React 19, Vinext/Vite, módulos JavaScript/TypeScript e componentes shadcn/Base UI. O build gera assets e um Worker. Não tratar o projeto como uma instalação convencional de Next.js sem conferir os scripts.

| Local | Responsabilidade |
| --- | --- |
| app/page.jsx e components/home-page.jsx | Home pública |
| app/wizard/page.jsx | Verificação de acesso no servidor e entrada do wizard |
| app/chatgpt-auth.ts | Identidade do Sites e lista de e-mails autorizados |
| proxy.ts | Política de cache das páginas |
| components/adoption-wizard.jsx | Estado, navegação, gravação local e integração das fases |
| components/diagnostic.jsx e demais componentes de fase | Formulários |
| components/plan-report.jsx | Visualização do plano |
| lib/framework.mjs e lib/v2.mjs | Pontuações, validações de avanço, critérios e relatório |
| lib/saved.mjs e lib/saved-v2.mjs | Validação e migração dos dados importados |
| lib/browser-storage.mjs | Isolamento do rascunho e abertura na primeira etapa |
| app/home.css, shell.css, askblue.css e demais CSS | Visual e comportamento de rolagem |
| tests/ | Testes de domínio, acesso, migração e renderização |
| .openai/hosting.json | Vínculo do projeto com a hospedagem Sites |
| .specs/features/backoffice-planos/spec.md | Especificação original; substituir pela cópia revisada deste pacote após revisão |

## Primeiro ambiente

Pré-requisito declarado no projeto: Node.js >=22.13 e npm. Usar uma versão compatível padronizada pela equipe; a versão exata deve entrar no ticket de ambiente.

Após obter o código e entrar na raiz do checkout:

```powershell
npm ci
npm test
npm run dev
```

Abrir o endereço emitido pelo processo. Para verificar o pacote de produção:

```powershell
npm run build
npm start
```

O login local não equivale ao login real do site. O plugin pode fornecer uma identidade de desenvolvimento que a lista da aplicação não autoriza. Não remover a proteção para conseguir editar telas. Usar fixtures e testes locais; a estratégia de identidade de homologação deve ser definida pela liderança técnica. Cabeçalhos sintéticos em testes locais não provam o funcionamento do login de produção.

Na última alteração publicada foram executados build e quatro testes de acesso com sucesso. Na entrega da home, a suíte tinha 24 testes passando. Essas são evidências históricas, não execução nova em 05/10/2026: a equipe deve rodar novamente no seu ambiente.

## Fluxo atual

Home → rota protegida /wizard → identidade do Sites → verificação de e-mail → wizard → rascunho local por identidade.

Começar meu plano abre /wizard?start=1 e redefine somente a posição da navegação para o contexto inicial, preservando as respostas. Retomar planejamento usa a etapa salva. O armazenamento não depende do caminho da rota, mas depende da origem do site e da identidade.

Não existe coleção central de planos. Um administrador não consegue extrair rascunhos de navegadores de outras pessoas.

## Cuidados de integração do backoffice

- Reaproveitar os schemas e validadores atuais; não duplicar as fórmulas em frontend e backend com comportamentos diferentes.
- Separar proprietário, autor da alteração e identidade do operador.
- Versionar o schema de conteúdo além do número da revisão do plano.
- Gravar plano, revisão, auditoria e deduplicação de forma consistente; definir a transação antes de paralelizar os tickets.
- Verificar permissão em todas as operações, incluindo exportação e histórico.
- Nunca aceitar papel de administrador ou proprietário fornecido pelo navegador como prova de autorização.
- Se houver mudança de identidade ou domínio, não contar com leitura automática do localStorage antigo. O fluxo de exportação/importação deve estar pronto antes da migração.
- Uma conta Supabase teria identidade diferente da identidade atual do Sites. O vínculo e a migração exigem procedimento explícito e verificável.
- Separar desenvolvimento, homologação e produção; não testar migrações com o único conjunto de dados existente.

## Código e colaboração

O histórico local já existe. O repositório colaborativo e a plataforma ainda precisam ser escolhidos. Preservar o histórico, usar branches por ticket e revisão por pull request. Proteger a branch principal contra publicação acidental.

Não compartilhar node_modules, builds, sessões de ferramentas ou arquivos de credenciais. O projeto contém e-mails da lista de acesso no código do servidor; isso reforça a escolha de um repositório privado para o repasse inicial.

A especificação existente está fora do versionamento no checkout inspecionado (`.specs/` aparece como não rastreado). Ela precisa ser incluída no repositório da equipe; caso contrário, quem obtiver o código não receberá os requisitos.

Acesso ao site, repositório e infraestrutura são concessões distintas. Contas dos colegas e destino dos convites ainda não foram informados neste pedido.

## Publicação

Atualmente a publicação usa Sites e exige o vínculo em .openai/hosting.json. Editar o código local não altera o site.

Na eventual migração, preparar ambiente de homologação, validar acesso e dados, ensaiar importação, registrar rollback e só então trocar o endereço de entrada. A decisão de provedor ainda está pendente; este documento não provisiona infraestrutura nem muda a produção.

