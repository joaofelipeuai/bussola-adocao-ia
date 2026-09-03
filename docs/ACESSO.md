# Acesso à Bússola

O login usa o fluxo Entrar com o ChatGPT gerenciado pelo Sites. Não há senha própria nem credenciais no código do navegador.

## Autenticação e autorização

- O Sites gerencia `/signin-with-chatgpt`, `/signout-with-chatgpt` e a sessão. A aplicação não implementa essas rotas.
- `app/chatgpt-auth.ts` é exclusivo do servidor. Contém a lista explícita dos três e-mails autorizados e identifica o proprietário original.
- `app/page.jsx` é dinâmico e verifica a identidade encaminhada pelo Sites a cada resposta HTML/RSC. Visitantes anônimos veem apenas o login; contas não autorizadas recebem a tela de acesso negado.
- `middleware.ts` desabilita cache compartilhado da página.
- Nunca confiar em e-mail enviado por formulário, query string ou armazenamento do navegador. Esta implantação confia nos cabeçalhos autenticados do dispatcher do Sites; outra hospedagem exigiria substituir essa integração e bloquear cabeçalhos forjados.
- A lista de acesso não é entregue ao cliente. Cada alteração exige publicação de uma nova versão.

## Acesso de contas externas

A política privada da plataforma continua aplicada antes desta verificação. Para permitir que contas externas cheguem ao login, é necessário autorizar explicitamente a mudança da audiência da plataforma para pública. Isso expõe a página de entrada; o wizard continua sujeito à lista no servidor. Não alterar a audiência antes de validar e publicar a proteção.

## Dados locais

Os rascunhos são separados pelo identificador autenticado do usuário, no mesmo navegador. Apenas o proprietário pode importar automaticamente o rascunho legado anterior ao login; o original é preservado. Exportação/importação continua disponível. Isso não é um banco de dados na nuvem nem criptografia dos arquivos locais. Não use um mesmo perfil do navegador entre pessoas que precisam manter seus dados locais confidenciais.

## Desenvolvimento e testes

O servidor local não fornece o login do Sites: visitantes locais veem a página de entrada. Não há bypass automático de desenvolvimento. Os testes HTTP locais podem fornecer cabeçalhos de identidade sintéticos exclusivamente para verificar as decisões da aplicação; isso não testa o login real da plataforma. `npm test` cobre recusas, correspondência exata de e-mail, isolamento de rascunhos e renderização. Valide o login real no endereço publicado antes de liberar o acesso externo.
