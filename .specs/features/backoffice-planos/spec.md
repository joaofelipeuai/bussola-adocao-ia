# Backoffice da Bússola — especificação funcional

Data: 03/09/2026 · Versão: 0.1 · Status: proposta para revisão.
Escopo desta entrega: especificação. O backoffice ainda não foi implementado.
Os títulos estruturais e as palavras WHEN / IF / THEN / SHALL seguem o validador da skill; SHALL significa “deverá”.

## Problem Statement

A Bússola permite preencher um wizard de sete fases, mas mantém um único rascunho por identidade e navegador. O administrador não consegue consultar os planos de outros usuários e uma pessoa não consegue manter vários planos centralizados ou retomar automaticamente em outro computador.

O backoffice deverá organizar planos por proprietário, permitir criação e edição, persistir dados no servidor e controlar quem pode acessá-los. O wizard existente continuará sendo o editor do conteúdo do plano.

## Goals

- Permitir que cada usuário mantenha vários planos independentes.
- Permitir que o administrador localize, crie e edite planos de qualquer usuário autorizado.
- Retomar a última revisão confirmada em outro navegador.
- Evitar sobrescrita silenciosa e registrar quem alterou cada plano.
- Migrar os rascunhos atuais sem apagar os originais.

## Base verificada no projeto

Inspeção do código local em 03/09/2026:

| Evidência | Situação atual e implicação |
| --- | --- |
| app/chatgpt-auth.ts e lib/access-policy.mjs | Login do Sites e lista de três e-mails no servidor; autorização ainda exige alteração de código. |
| lib/browser-storage.mjs | Chave local por identidade; não existe coleção de planos na nuvem. |
| components/adoption-wizard.jsx | Estado React, salvamento em localStorage, importação substituindo o rascunho e exportações. |
| lib/framework.mjs e lib/v2.mjs | Regras das sete fases, cálculos, revisões e relatório a preservar. |
| lib/saved.mjs e lib/saved-v2.mjs | Validação dos schemas 1/2 e migração v1 → v2 já existem. |
| package.json | React, Vinext/Vite e execução em Worker; a escolha de armazenamento será validada no design. |

O código prevalece sobre a documentação desatualizada: docs/ARQUITETURA.md ainda atribui o wizard a app/page.jsx, embora ele esteja em components/adoption-wizard.jsx; docs/ACESSO.md cita middleware.ts, mas o projeto usa proxy.ts. A atualização dessas referências fará parte da futura implementação.

## Out of Scope

| Recurso | Motivo |
| --- | --- |
| Construção e publicação do backoffice nesta entrega | O pedido atual é a especificação para criá-lo. |
| Login com senha própria ou troca de provedor de identidade | Reutilizar o login existente. |
| Colaboração simultânea em tempo real e merge automático | Controle de revisão resolve o conflito no MVP. |
| Organizações com múltiplos membros, compartilhamento de plano e transferência de propriedade | No MVP, um plano pertence a um usuário e o administrador tem acesso transversal. |
| Exclusão definitiva de usuários, planos ou histórico | Usar bloqueio e arquivamento reversíveis. |
| Cobrança, assinaturas, envio de convites por e-mail, anexos e integrações externas | Não são necessários para gerenciar os planos solicitados. |
| Editor do framework, fórmulas ou geração automática com IA | Preservar as regras atuais. |
| Operação offline completa e recuperação após fechar uma aba sem salvar | MVP exige rede para persistência central; falhas preservam a edição na aba. |

## Assumptions & Open Questions

Estas são propostas explícitas, não decisões já aprovadas pelo usuário.

| Assumption / decision | Chosen default | Rationale | Confirmed? |
| --- | --- | --- | --- |
| Perfis | Administrador e usuário; a conta proprietária atual será o administrador inicial. | Separa gestão global de uso individual. | Proposto |
| Autonomia dos usuários | Usuários podem criar, editar, duplicar, arquivar e restaurar seus próprios planos. | Mantém o uso independente do wizard. | Proposto |
| Cadastro | Administrador pré-cadastra nome e e-mail; o primeiro login vincula a identidade confiável. | Evolui a lista de acesso existente sem novos logins. | Proposto |
| Administração de perfis | MVP mantém o administrador inicial; não inclui tela de promoção de outros administradores. | Evita ampliar a gestão de privilégios sem necessidade definida. | Proposto |
| Propriedade | Um proprietário imutável por plano; administrador pode criar para usuário ativo ou pendente, nunca bloqueado. | Facilita isolamento e evita transferências acidentais. | Proposto |
| Salvamento | Automático após 2 segundos sem edição e botão Salvar alterações. | Reduz perda de trabalho e mantém uma confirmação explícita. | Proposto |
| Concorrência | Revisão de base obrigatória e conflito explícito; sem “última gravação vence”. | Administrador e proprietário podem editar o mesmo plano. | Proposto |
| Histórico | Guardar todas as revisões durante a vida do plano no MVP; sem expiração automática. | Permite recuperação; limites operacionais e custo serão avaliados no design. | Proposto |
| Arquivamento | Ambos os perfis podem arquivar e reativar dentro de suas permissões. | Retira planos antigos sem apagá-los. | Proposto |
| Duplicação | Copiar o conteúdo e limpar as sete revisões; mesmo proprietário, sem copiar o histórico. | Reutiliza o material sem declarar que o novo planejamento foi revisado. | Proposto |
| Estado do planejamento | Rascunho, Planejamento revisado e Arquivado; os dois primeiros são derivados das sete revisões. | Evita confundir planejamento com execução real da adoção. | Proposto |
| Migração | Importação confirmada pelo dono; administrador não consegue buscar dados em outro navegador. | Os rascunhos atuais não existem no servidor. | Proposto |
| Retenção e recuperação operacional | Arquivamento não substitui backup; o design deverá escolher uma solução de recuperação e testar restauração antes de publicar. | O armazenamento central passa a guardar dados de todos. | Proposto |
| Tecnologia de dados | Definir no design após verificar persistência, transações, recuperação, limites e custos compatíveis com Sites. | A inspeção atual não comprova esses recursos configurados. | Pendente de verificação técnica, com direção definida |
| Escala inicial | Projetar para o grupo atual, validar com 10 usuários e 100 planos por usuário. | Cria um conjunto concreto de homologação sem prometer escala não testada. | Proposto |

**Open questions: none** — todas as ambiguidades identificadas estão registradas acima com uma proposta e justificativa. Isso não implica aprovação dessas propostas.

## Perfis e permissões

Todas as permissões devem ser verificadas no servidor, inclusive em leitura, exportação, histórico e operações em lote caso sejam adicionadas futuramente.

| Operação | Administrador | Usuário |
| --- | --- | --- |
| Listar usuários e autorizar/bloquear acesso | Sim | Não |
| Listar/abrir planos | Todos | Somente os próprios |
| Criar plano | Para si ou usuário ativo/pendente | Para si |
| Editar, renomear, duplicar | Todos os planos permitidos pelo estado | Somente os próprios |
| Exportar, ler histórico e restaurar versão | Todos | Somente os próprios |
| Arquivar e reativar | Todos | Somente os próprios |
| Alterar proprietário ou excluir definitivamente | Fora do MVP | Fora do MVP |

Bloqueio de usuário preserva seus dados. O administrador continua podendo ler e administrar os planos já existentes desse usuário. Uma conta bloqueada perde acesso na próxima requisição, não apenas no próximo login.

## Telas e fluxos propostos

| Tela | Conteúdo e ações |
| --- | --- |
| Meus planos | Lista do usuário, busca, estados, Novo plano, Importar backup e ações por linha. |
| Administração / Usuários | Nome, e-mail, perfil, estado, contagem de planos, último acesso; cadastrar, bloquear e reativar. |
| Administração / Usuário | Dados da pessoa e lista dos seus planos; Novo plano para este usuário. |
| Administração / Planos | Visão global com filtros por proprietário, título/organização e estado. |
| Editor do plano | Wizard existente, título e proprietário visíveis, indicador de salvamento, salvar, relatório e histórico. |
| Histórico do plano | Revisões com autor e horário, leitura e restauração com confirmação. |

Fluxo principal do administrador: Usuários → selecionar pessoa → abrir ou criar plano → editar no wizard → confirmar salvamento → voltar à lista.

Fluxo principal do usuário: Entrar → Meus planos → Novo plano ou continuar um existente → editar → retomar em outro dispositivo.

O visual conserva azul e gradientes da Bússola, sem logo da askblue. A navegação lateral fica fixa no desktop; a página usa a barra de rolagem na borda direita. As ações gerais permanecem no topo à direita. A lista prioriza densidade e paginação, sem um cabeçalho promocional grande. O cartão de resumo flutuante fica restrito ao editor, sem cobrir campos ou ações em telas pequenas.

## Modelo conceitual e regras de estado

Este modelo descreve as informações necessárias; não escolhe banco ou contrato de API.

| Registro | Informações |
| --- | --- |
| Usuário | Identificador interno, identidade externa vinculada, nome, e-mail normalizado único, perfil, estado, criação e último acesso. |
| Plano | Identificador, proprietário, título, organização derivada do contexto, schema do conteúdo, conteúdo do wizard, revisão atual, arquivamento, criação e atualização. |
| Revisão | Plano, número, snapshot de conteúdo/metadados, autor real, data e motivo: criação, edição, duplicação, importação ou restauração. |
| Auditoria | Ator, ação, entidade, alvo, horário UTC e identificador de operação; sem cópia integral do conteúdo. |
| Registro de operação | Ator e chave de idempotência, resultado e validade de 24 horas. |
| Migração | Identidade, origem local/backup e referência ao plano importado, para detectar repetição. |

O identificador interno do usuário e a identidade autenticada não são intercambiáveis com um e-mail fornecido em formulário. E-mail alterado externamente não deve vincular silenciosamente uma nova identidade a uma conta existente: recusar e direcionar ao administrador até definir um procedimento de recuperação.

Um novo plano começa em Rascunho. Sete revisões verdadeiras produzem Planejamento revisado; a invalidação de qualquer uma retorna a Rascunho. Arquivado prevalece sobre o estado derivado, permite leitura, histórico, exportação e duplicação, mas bloqueia edição e restauração de versão até reativação.

Duplicação solicita título, sugere “Cópia de …” limitado a 120 caracteres e preserva respostas, sem marcar fases como revisadas. Títulos repetidos são permitidos: o identificador distingue planos. Restaurar versão não altera proprietário nem identidade do plano, e reaplica validações e cálculo do estado.

Reiniciar deixa de ser um comando que apaga o único rascunho: a ação principal passa a ser Novo plano. Qualquer futura limpeza de conteúdo existente deverá ser uma nova revisão confirmada e recuperável.

## User Stories

### P1: Acesso e papéis

**User Story:** Como administrador, quero controlar quem entra e o que cada pessoa pode gerenciar.

**Acceptance Criteria**:
1. WHEN uma conta previamente autorizada entra pela identidade confiável do Sites THEN o sistema SHALL vinculá-la ao identificador autenticado, sem aceitar identidade informada pelo navegador. (AUTH-01)
2. WHEN o administrador inicial acessa o backoffice THEN o sistema SHALL permitir consultar e editar planos de todos os usuários. (AUTH-02)
3. WHEN um usuário comum lista planos THEN o sistema SHALL retornar somente os planos dos quais ele é proprietário. (AUTH-03)
4. IF um usuário comum tenta consultar, editar, exportar, duplicar, restaurar ou arquivar um plano alheio por identificador THEN o servidor SHALL responder 404 sem retornar dados do plano. (AUTH-04)
5. IF uma chamada de dados não possui sessão autenticada THEN o servidor SHALL responder 401 sem retornar dados protegidos. (AUTH-05)
6. IF uma conta bloqueada ou não cadastrada solicita dados protegidos THEN o servidor SHALL responder 403. (AUTH-06)
7. IF um usuário comum tenta executar uma operação administrativa THEN o servidor SHALL responder 403, inclusive quando o pedido é enviado fora da interface. (AUTH-07)

**Independent Test:** Entrar como administrador, usuário ativo, usuário bloqueado e visitante; repetir as operações diretamente no servidor.

### P1: Cadastro e bloqueio de usuários

**User Story:** Como administrador, quero autorizar pessoas sem precisar alterar código e publicar novamente.

**Acceptance Criteria**:
1. WHEN o administrador cadastra um nome de 1 a 120 caracteres e um e-mail válido de até 254 caracteres THEN o sistema SHALL criar um cadastro autorizado pendente de primeiro acesso. (USER-01)
2. IF o e-mail normalizado com remoção de espaços externos e conversão para minúsculas já existe THEN o sistema SHALL recusar o cadastro duplicado com erro de conflito. (USER-02)
3. WHEN uma conta pendente autentica com o e-mail cadastrado THEN o sistema SHALL ativar o cadastro e vinculá-lo uma única vez ao identificador autenticado. (USER-03)
4. WHEN o administrador bloqueia um usuário THEN o sistema SHALL recusar a próxima operação protegida desse usuário, mesmo com uma sessão ainda aberta. (USER-04)
5. WHEN o administrador reativa um usuário bloqueado THEN o sistema SHALL devolver seu acesso aos planos preservados. (USER-05)
6. IF uma operação remove ou bloqueia o último administrador ativo THEN o sistema SHALL recusá-la sem alterar o cadastro. (USER-06)

**Independent Test:** Cadastrar um e-mail, tentar duplicá-lo, efetuar o primeiro login, bloquear a conta e verificar a recusa na próxima requisição.

### P1: Lista de planos por usuário

**User Story:** Como administrador, quero localizar os planos de cada pessoa e acompanhar seu estado.

**Acceptance Criteria**:
1. WHEN o administrador abre o detalhe de um usuário THEN o sistema SHALL listar os planos desse proprietário com título, organização, estado, fases revisadas, última alteração e autor da última alteração. (LIST-01)
2. WHEN uma lista de planos é aberta THEN o sistema SHALL ordenar os resultados por atualização decrescente e desempatar pelo identificador em ordem crescente. (LIST-02)
3. WHEN o operador pesquisa título ou organização e filtra por proprietário ou estado THEN o sistema SHALL aplicar a interseção dos filtros dentro do seu conjunto autorizado, com páginas de 20 registros. (LIST-03)
4. WHEN uma lista autorizada não contém planos THEN o sistema SHALL exibir um estado vazio com a ação Novo plano. (LIST-04)
5. WHEN o administrador abre a lista de usuários THEN o sistema SHALL mostrar nome, e-mail, perfil, estado, quantidade de planos não arquivados e data do último acesso. (LIST-05)

**Independent Test:** Com planos de dois proprietários e estados diferentes, aplicar filtros e conferir os resultados e contadores.

### P1: Criar, salvar e continuar planos

**User Story:** Como usuário, quero manter vários planos e continuar o trabalho em outro dispositivo; como administrador, quero criá-los para qualquer usuário autorizado.

**Acceptance Criteria**:
1. WHEN um operador cria um plano com título entre 1 e 120 caracteres após trim e proprietário permitido THEN o sistema SHALL persistir um novo plano com identificador único, revisão 1 e estado Rascunho. (PLAN-01)
2. IF um usuário comum informa outro proprietário ao criar um plano THEN o sistema SHALL recusar a criação com 403. (PLAN-02)
3. WHEN um plano salvo é reaberto em outro navegador pela mesma conta THEN o sistema SHALL carregar do servidor o último conteúdo confirmado. (PLAN-03)
4. WHEN o operador clica em Salvar alterações e a gravação termina com sucesso THEN o sistema SHALL exibir Salvo no servidor com o horário da confirmação. (PLAN-04)
5. WHEN o conteúdo permanece alterado por dois segundos sem nova edição THEN o sistema SHALL solicitar um salvamento automático, mantendo no máximo uma gravação em voo por plano nessa aba. (PLAN-05)
6. WHEN o operador cria outro plano THEN o sistema SHALL preservar os planos anteriores. (PLAN-06)
7. WHEN o operador abre um plano THEN o sistema SHALL disponibilizar as sete fases, as validações e o relatório da Bússola v2 para aquele plano. (PLAN-07)
8. WHEN uma alteração invalida revisões posteriores pelas regras atuais do wizard THEN o sistema SHALL persistir essas invalidações no mesmo salvamento. (PLAN-08)

**Independent Test:** Criar dois planos, editar um, sair, entrar em outro navegador e verificar os conteúdos independentes e o proprietário.

### P1: Versões e edição concorrente

**User Story:** Como proprietário, quero saber quem alterou meu plano e evitar perder mudanças feitas por outra pessoa.

**Acceptance Criteria**:
1. WHEN uma alteração de conteúdo ou metadados é confirmada THEN o sistema SHALL gravar atomicamente o plano e uma revisão imutável com número crescente, autor autenticado e data UTC. (VER-01)
2. IF uma gravação usa uma revisão de base diferente da revisão atual THEN o sistema SHALL responder 409 sem substituir a revisão atual. (VER-02)
3. WHEN a interface recebe um conflito de revisão THEN o sistema SHALL preservar a edição local e oferecer baixar uma cópia e carregar a versão atual, sem sobrescrita automática. (VER-03)
4. WHEN um operador autorizado abre o histórico THEN o sistema SHALL apresentar as revisões do plano em ordem decrescente com autor, data e motivo da operação. (VER-04)
5. WHEN um operador autorizado confirma restaurar uma revisão anterior THEN o sistema SHALL criar uma nova revisão com aquele conteúdo, preservando as revisões existentes. (VER-05)
6. IF a mesma operação é repetida com a mesma chave de idempotência pelo mesmo ator em até 24 horas THEN o sistema SHALL retornar o resultado original sem criar outro plano, revisão ou evento. (VER-06)

**Independent Test:** Abrir revisão 3 em duas sessões, salvar A como 4 e tentar salvar B com base 3; conferir conflito e histórico intacto.

### P1: Duplicar e arquivar

**User Story:** Como usuário, quero reutilizar um plano e retirar planos antigos da lista principal sem perdê-los.

**Acceptance Criteria**:
1. WHEN um operador duplica um plano THEN o sistema SHALL criar um novo plano em Rascunho com novo identificador, histórico iniciado em 1 e as sete marcações de revisão desmarcadas. (LIFE-01)
2. WHEN um operador confirma arquivar um plano THEN o sistema SHALL preservá-lo em estado Arquivado e removê-lo da listagem padrão. (LIFE-02)
3. IF um plano está Arquivado THEN o sistema SHALL recusar alterações de conteúdo até que ele seja reativado. (LIFE-03)
4. WHEN um operador reativa um plano arquivado THEN o sistema SHALL recalcular seu estado entre Rascunho e Planejamento revisado a partir das sete marcações atuais. (LIFE-04)
5. WHEN as sete fases estão revisadas THEN o sistema SHALL exibir Planejamento revisado sem classificá-lo como adoção executada. (LIFE-05)

**Independent Test:** Duplicar um plano revisado e arquivar o original; conferir novos identificadores, revisões reiniciadas e restauração do original.

### P1: Migração e exportação

**User Story:** Como usuário atual, quero trazer meu rascunho e meus backups para o backoffice sem perder o original.

**Acceptance Criteria**:
1. WHEN o usuário confirma importar um rascunho local da sua identidade THEN o sistema SHALL criar um novo plano no servidor preservando o rascunho local original. (MIG-01)
2. WHEN o operador importa um backup JSON válido de schema 1 ou 2 e tamanho de até 2.000.000 bytes THEN o sistema SHALL criar um novo plano aplicando as regras existentes de validação e migração. (MIG-02)
3. IF um arquivo é inválido, incompatível ou excede o limite THEN o sistema SHALL apresentar a causa da recusa sem criar ou alterar planos. (MIG-03)
4. WHEN um operador exporta um plano salvo THEN o sistema SHALL produzir JSON e relatório Markdown baseados na revisão confirmada escolhida. (MIG-04)
5. WHEN o usuário solicita novamente importar a mesma origem local já migrada THEN o sistema SHALL indicar o plano criado e exigir uma ação explícita Criar outra cópia para uma nova importação. (MIG-05)

**Independent Test:** Importar exemplos v1 e v2, repetir uma importação e tentar um arquivo inválido; conferir que não houve sobrescrita.

### P1: Falhas, segurança e rastreabilidade

**User Story:** Como usuário, quero saber se minhas alterações foram realmente salvas e manter meus dados separados dos demais.

**Acceptance Criteria**:
1. IF uma gravação falha ou excede 15 segundos sem confirmação THEN a interface SHALL mostrar Não salvo no servidor mantendo a edição na aba. (SAFE-01)
2. WHEN o operador tenta navegar para outro plano com alterações não confirmadas THEN a interface SHALL pedir que ele salve, descarte ou permaneça na edição. (SAFE-02)
3. IF o armazenamento central fica indisponível THEN o sistema SHALL responder erro temporário sem substituir dados existentes por um plano vazio. (SAFE-03)
4. WHEN o servidor recebe conteúdo de plano THEN o sistema SHALL validá-lo contra o schema e limites dos validadores atuais antes de persistir. (SAFE-04)
5. WHEN texto fornecido pelo usuário é exibido THEN a interface SHALL renderizá-lo como texto sem executar HTML ou scripts. (SAFE-05)
6. WHEN uma operação muda usuário, estado ou propriedade de plano THEN o sistema SHALL registrar atomicamente ator, ação, alvo, data UTC e identificador da operação em auditoria imutável. (SAFE-06)
7. The sistema SHALL excluir conteúdos de planos, tokens de sessão e cabeçalhos de identidade dos logs operacionais. (SAFE-07)
8. IF uma identidade excede 60 mutações por minuto THEN o servidor SHALL responder 429 com Retry-After sem persistir a operação excedente. (SAFE-08)
9. IF uma mutação de navegador provém de origem diferente da aplicação ou não apresenta a proteção CSRF definida no design THEN o servidor SHALL recusá-la com 403. (SAFE-09)
10. The sistema SHALL impedir que respostas de planos e usuários sejam reutilizadas em cache público ou compartilhado entre identidades. (SAFE-10)

**Independent Test:** Simular queda de rede, falha no banco, sessão expirada e conteúdo malicioso; conferir que não existe falso sucesso nem vazamento.

### P1: Experiência do backoffice

**User Story:** Como administrador, quero trabalhar em uma interface compacta e consistente com a Bússola.

**Acceptance Criteria**:
1. WHEN o administrador navega pelo backoffice em desktop THEN a interface SHALL manter menu lateral fixo e a rolagem principal na borda direita da janela. (UX-01)
2. WHEN a tela tem largura de 390 pixels THEN a interface SHALL recolher o menu e manter ações de criar, abrir e salvar acessíveis sem sobreposição. (UX-02)
3. WHEN o administrador edita um plano alheio THEN a interface SHALL mostrar permanentemente o nome do proprietário junto ao título do plano. (UX-03)
4. WHEN um usuário utiliza apenas teclado THEN a interface SHALL permitir percorrer lista, formulário, salvamento e diálogos com foco visível e retorno ao acionador ao fechar um diálogo. (UX-04)

**Independent Test:** Navegar por teclado e verificar os fluxos em larguras de 1440 e 390 pixels, incluindo zoom de 200%.

## Edge Cases

- Usuário com plano aberto quando é bloqueado: próxima chamada retorna 403 e a interface não confirma salvamento; mudanças já exibidas não podem ser apagadas remotamente do navegador.
- Duas abas do mesmo usuário também concorrem; cada gravação precisa informar revisão de base.
- Resposta de salvamento perdida: repetir a mesma operação recupera seu resultado sem duplicar uma revisão.
- Falha entre plano, revisão e auditoria: nenhuma parte da mutação pode ser confirmada isoladamente.
- Plano arquivado por outra sessão durante a edição: a gravação seguinte é recusada; não desarquivar implicitamente.
- Rascunho legado sem identidade: manter a exceção atual que só permite migração pelo proprietário original.
- Importação pode converter v1 para v2 e invalidar revisões conforme os validadores atuais; não reinterpretar como planejamento concluído.
- O administrador não pode visualizar localStorage remoto. Cada pessoa precisa migrar no navegador original ou enviar um backup por um canal escolhido por ela.
- Exportar com mudanças pendentes exige salvar antes ou escolher explicitamente a última revisão confirmada; a cópia de recuperação de conflito fica identificada como não salva.
- Se a interface não consegue carregar uma lista, mostrar erro e ação de tentar novamente; não mostrar lista vazia como se fosse resultado válido.

## Dimensões implícitas

| Dimensão | Cobertura |
| --- | --- |
| Validação e limites | USER-01/02, PLAN-01, MIG-02/03, SAFE-04/05; payload de até 2.000.000 bytes e limites de campos atuais. |
| Falhas e falhas parciais | VER-01, SAFE-01/03; atomicidade também se aplica à auditoria e idempotência. |
| Repetição e duplicação | VER-06, MIG-05; mesma chave com conteúdo diferente deve retornar conflito. |
| Autenticação e limites | AUTH-01 a AUTH-07, USER-04, SAFE-08/09/10; consultas verificam proprietário no servidor. |
| Concorrência e ordem | VER-02/03, LIST-02, revisão crescente por plano. |
| Ciclo de vida | LIFE-01 a LIFE-05; sem exclusão automática; revisão de custo e recuperação no design. |
| Observabilidade | SAFE-06/07; registrar erros e correlação sem conteúdo pessoal dos planos. |
| Dependências indisponíveis | SAFE-01/03; falha do login mantém acesso fechado, falha de persistência não produz sucesso. |
| Integridade de transições | USER-03/04/05/06, LIFE-03/04/05, PLAN-08; sem mudança de estado por campo livre do cliente. |

## Requirement Traceability

Todos os critérios abaixo são requisitos propostos de MVP. “Pending” significa não implementado e não validado funcionalmente.

| Requirement ID | Story | Phase | Status |
| --- | --- | --- | --- |
| AUTH-01 | Acesso e papéis | Specify | Pending |
| AUTH-02 | Acesso e papéis | Specify | Pending |
| AUTH-03 | Acesso e papéis | Specify | Pending |
| AUTH-04 | Acesso e papéis | Specify | Pending |
| AUTH-05 | Acesso e papéis | Specify | Pending |
| AUTH-06 | Acesso e papéis | Specify | Pending |
| AUTH-07 | Acesso e papéis | Specify | Pending |
| USER-01 | Cadastro e bloqueio de usuários | Specify | Pending |
| USER-02 | Cadastro e bloqueio de usuários | Specify | Pending |
| USER-03 | Cadastro e bloqueio de usuários | Specify | Pending |
| USER-04 | Cadastro e bloqueio de usuários | Specify | Pending |
| USER-05 | Cadastro e bloqueio de usuários | Specify | Pending |
| USER-06 | Cadastro e bloqueio de usuários | Specify | Pending |
| LIST-01 | Lista de planos por usuário | Specify | Pending |
| LIST-02 | Lista de planos por usuário | Specify | Pending |
| LIST-03 | Lista de planos por usuário | Specify | Pending |
| LIST-04 | Lista de planos por usuário | Specify | Pending |
| LIST-05 | Lista de planos por usuário | Specify | Pending |
| PLAN-01 | Criar, salvar e continuar planos | Specify | Pending |
| PLAN-02 | Criar, salvar e continuar planos | Specify | Pending |
| PLAN-03 | Criar, salvar e continuar planos | Specify | Pending |
| PLAN-04 | Criar, salvar e continuar planos | Specify | Pending |
| PLAN-05 | Criar, salvar e continuar planos | Specify | Pending |
| PLAN-06 | Criar, salvar e continuar planos | Specify | Pending |
| PLAN-07 | Criar, salvar e continuar planos | Specify | Pending |
| PLAN-08 | Criar, salvar e continuar planos | Specify | Pending |
| VER-01 | Versões e edição concorrente | Specify | Pending |
| VER-02 | Versões e edição concorrente | Specify | Pending |
| VER-03 | Versões e edição concorrente | Specify | Pending |
| VER-04 | Versões e edição concorrente | Specify | Pending |
| VER-05 | Versões e edição concorrente | Specify | Pending |
| VER-06 | Versões e edição concorrente | Specify | Pending |
| LIFE-01 | Duplicar e arquivar | Specify | Pending |
| LIFE-02 | Duplicar e arquivar | Specify | Pending |
| LIFE-03 | Duplicar e arquivar | Specify | Pending |
| LIFE-04 | Duplicar e arquivar | Specify | Pending |
| LIFE-05 | Duplicar e arquivar | Specify | Pending |
| MIG-01 | Migração e exportação | Specify | Pending |
| MIG-02 | Migração e exportação | Specify | Pending |
| MIG-03 | Migração e exportação | Specify | Pending |
| MIG-04 | Migração e exportação | Specify | Pending |
| MIG-05 | Migração e exportação | Specify | Pending |
| SAFE-01 | Falhas, segurança e rastreabilidade | Specify | Pending |
| SAFE-02 | Falhas, segurança e rastreabilidade | Specify | Pending |
| SAFE-03 | Falhas, segurança e rastreabilidade | Specify | Pending |
| SAFE-04 | Falhas, segurança e rastreabilidade | Specify | Pending |
| SAFE-05 | Falhas, segurança e rastreabilidade | Specify | Pending |
| SAFE-06 | Falhas, segurança e rastreabilidade | Specify | Pending |
| SAFE-07 | Falhas, segurança e rastreabilidade | Specify | Pending |
| SAFE-08 | Falhas, segurança e rastreabilidade | Specify | Pending |
| SAFE-09 | Falhas, segurança e rastreabilidade | Specify | Pending |
| SAFE-10 | Falhas, segurança e rastreabilidade | Specify | Pending |
| UX-01 | Experiência do backoffice | Specify | Pending |
| UX-02 | Experiência do backoffice | Specify | Pending |
| UX-03 | Experiência do backoffice | Specify | Pending |
| UX-04 | Experiência do backoffice | Specify | Pending |

Cobertura: 56 critérios identificados; 0 implementados. A decomposição em tarefas e testes executáveis pertence às próximas fases.

## Success Criteria

- [ ] Administrador cria um plano para um usuário e ambos veem a mesma revisão confirmada.
- [ ] Usuário mantém pelo menos três planos independentes e os recupera em outro navegador.
- [ ] Usuário A não consegue acessar dados de B por listas, identificadores diretos, histórico ou exportações.
- [ ] Duas sessões não sobrescrevem silenciosamente o trabalho uma da outra.
- [ ] Bloqueio de acesso passa a valer na próxima requisição protegida.
- [ ] Rascunhos v1 e v2 podem ser migrados com originais preservados.
- [ ] Arquivamento, reativação e restauração de revisão preservam a rastreabilidade.
- [ ] Falhas de gravação nunca aparecem como Salvo no servidor.
- [ ] Fluxos essenciais funcionam com teclado e em telas de 390 e 1440 pixels.
- [ ] Antes de publicar, um procedimento de recuperação do armazenamento central é demonstrado com dados de homologação.

## Sequência sugerida para a implementação futura

1. Aprovar ou ajustar as propostas de perfis, salvamento e histórico desta especificação.
2. Elaborar o design com armazenamento compatível com a hospedagem, autenticação, transações, proteção CSRF, recuperação e custos.
3. Decompor o MVP em tarefas com testes vinculados aos IDs acima.
4. Implementar primeiro a fatia completa: usuário autenticado cria, salva e reabre um plano no servidor.
5. Acrescentar visão administrativa, controle de acesso e gestão de usuários.
6. Acrescentar histórico, conflitos, arquivamento e migração.
7. Homologar com as contas atuais, conferir isolamento e preparar a publicação.

Nenhum serviço, banco de dados ou plano pago foi contratado ou provisionado por esta especificação. A aprovação do documento não deve ser confundida com uma implementação já entregue.

