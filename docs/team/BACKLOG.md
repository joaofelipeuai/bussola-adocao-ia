# Bússola — backlog para distribuir à equipe

Data: 05/10/2026. Todos os itens estão em Backlog; não implementados por este documento.
Este é um backlog de entregas para estimativa e decomposição. Cada item pode gerar vários tickets atômicos depois do design, e não equivale a um plano técnico de execução já aprovado.

Os responsáveis abaixo são funções, não pessoas designadas. Nomes, estimativas e prazos serão preenchidos pela equipe. Critérios detalhados: [especificação](requisitos/spec.md).

## Ordem e paralelismo

ENT-01 → ENT-02 → ENT-03 → ENT-04.

Depois da base de contratos de ENT-02, UX pode preparar listas e qualidade pode preparar os cenários. A integração das telas depende das entregas reais, sem considerar mocks como persistência pronta.

Depois de ENT-04, listagem (ENT-05) e salvamento/conflitos (ENT-06) podem evoluir em paralelo se houver responsáveis distintos. ENT-07 depende de ENT-06; ENT-08 e ENT-09 dependem de ENT-05. ENT-10 reúne verificações de segurança que começam junto da implementação. ENT-11 integra tudo e ENT-12 libera.

Primeiro marco funcional: ENT-03 + ENT-04, com as garantias mínimas de isolamento e atomicidade desde o início. A primeira versão completa inclui todos os itens.

## Entregas

### ENT-01 — Preparar a colaboração e o ambiente

- **Responsável sugerido:** Liderança técnica + João.
- **Dependências:** Nenhuma.
- **Requisitos:** Organização ou condição operacional de entrega; sem novo requisito funcional.
- **Entregável:** Repositório privado escolhido, código e documentos versionados, quadro criado, versão de Node padronizada e instruções de ambiente verificadas por outro desenvolvedor.
- **Aceite:** Outra pessoa obtém o checkout e executa os testes sem depender da máquina de João. Não há credenciais no conteúdo compartilhado.
- **Verificação / evidência:** Registrar sistema, versão de Node, resultado de npm ci, npm test e npm run build.
- **Limite ou observação:** Pode começar agora; convites dependem da escolha da plataforma e das contas dos participantes.

### ENT-02 — Fechar arquitetura de dados, identidade e operação

- **Responsável sugerido:** Liderança técnica, com decisão de João.
- **Dependências:** ENT-01.
- **Requisitos:** AUTH-01, VER-01, VER-06, SAFE-09
- **Entregável:** Documento de design com modelo de dados, contratos de operações, autenticação, autorização, transações, revisão de base, CSRF, configuração por ambiente e plano de recuperação.
- **Aceite:** Escolha explícita entre a evolução no ambiente atual e a alternativa discutida com Supabase. Custos, região, limites, fluxo de login e migração são verificados antes de contratar ou provisionar.
- **Verificação / evidência:** Apresentar uma sequência completa de criação/gravação e demonstrar como falha parcial, repetição e conflito serão tratados; registrar a aprovação das decisões.
- **Limite ou observação:** Não é implementar toda a infraestrutura. Atualizar requisitos específicos do novo login, caso adotado, e criar tarefas técnicas menores.

### ENT-03 — Entregar acesso e gestão de usuários

- **Responsável sugerido:** Backend + frontend, com revisão de segurança.
- **Dependências:** ENT-02.
- **Requisitos:** AUTH-01, AUTH-02, AUTH-03, AUTH-04, AUTH-05, AUTH-06, AUTH-07, USER-01, USER-02, USER-03, USER-04, USER-05, USER-06
- **Entregável:** Identidade validada no servidor, papéis, cadastro autorizado, vínculo inicial, bloqueio e reativação pela interface administrativa.
- **Aceite:** Conta comum não executa operação administrativa; conta bloqueada perde acesso na próxima requisição; último administrador ativo não pode ser removido ou bloqueado.
- **Verificação / evidência:** Usar administrador, duas contas comuns, visitante, conta pendente e bloqueada. Tentar as chamadas diretamente sem depender de botões ocultos.
- **Limite ou observação:** Não incluir promoção de administradores nem cadastro público sem uma decisão de produto.

### ENT-04 — Criar e editar planos com persistência central

- **Responsável sugerido:** Backend + frontend do wizard.
- **Dependências:** ENT-02, ENT-03.
- **Requisitos:** PLAN-01, PLAN-02, PLAN-03, PLAN-06, PLAN-07, PLAN-08, VER-01, VER-06, SAFE-04, SAFE-06
- **Entregável:** Criação e edição de planos independentes usando o wizard existente, dados persistidos, revisão inicial e gravação atômica com histórico e auditoria.
- **Aceite:** Criar três planos e reabrir em outro navegador com os mesmos conteúdos; um usuário não escolhe outro proprietário; repetir uma operação não duplica dados.
- **Verificação / evidência:** Executar criação, edição, reabertura, payload inválido e falha parcial. Confirmar pontuações e invalidação de revisões conforme o framework existente.
- **Limite ou observação:** Inclui a revisão e auditoria mínimas desde o primeiro save. A tela de histórico virá depois; não adiar a consistência dos dados.

### ENT-05 — Navegar pelos planos e pelo backoffice

- **Responsável sugerido:** Frontend + backend de consultas.
- **Dependências:** ENT-03, ENT-04.
- **Requisitos:** LIST-01, LIST-02, LIST-03, LIST-04, LIST-05, UX-03
- **Entregável:** Meus planos, lista global administrativa, detalhe do usuário e filtros com paginação.
- **Aceite:** Listas mostram somente dados autorizados, ordenam por atualização com desempate determinístico e combinam filtros. O proprietário fica visível ao editar plano alheio.
- **Verificação / evidência:** Popular usuários com planos diferentes e conferir filtros, páginas de 20 registros, estado vazio e erro de carregamento.
- **Limite ou observação:** Não confundir erro de consulta com ausência de planos.

### ENT-06 — Salvar automaticamente e tratar conflitos

- **Responsável sugerido:** Frontend + backend.
- **Dependências:** ENT-04.
- **Requisitos:** PLAN-04, PLAN-05, VER-02, VER-03, SAFE-01, SAFE-02, SAFE-03
- **Entregável:** Botão Salvar, salvamento após dois segundos sem edição, estados de confirmação e erro, proteção ao sair e conflito de revisão.
- **Aceite:** Duas abas abertas na mesma revisão não sobrescrevem alterações silenciosamente. Falha ou timeout mantém edição na aba e nunca mostra Salvo no servidor.
- **Verificação / evidência:** Testar gravação lenta, resposta perdida, indisponibilidade, revisão 3 em duas sessões e tentativa concorrente após a primeira gravar revisão 4.
- **Limite ou observação:** Não incluir edição colaborativa em tempo real nem merge automático.

### ENT-07 — Consultar e restaurar histórico

- **Responsável sugerido:** Frontend + backend.
- **Dependências:** ENT-04, ENT-06.
- **Requisitos:** VER-04, VER-05
- **Entregável:** Lista das revisões com autoria e data, leitura do conteúdo anterior e confirmação de restauração.
- **Aceite:** Restaurar cria uma nova revisão e conserva as antigas; a operação preserva identidade e proprietário do plano.
- **Verificação / evidência:** Editar um plano três vezes, restaurar a primeira revisão e conferir o novo snapshot, sequência e autoria.
- **Limite ou observação:** Revisões são imutáveis; arquivados precisam ser reativados antes de restauração de conteúdo.

### ENT-08 — Duplicar, arquivar e reativar planos

- **Responsável sugerido:** Frontend + backend.
- **Dependências:** ENT-04, ENT-05.
- **Requisitos:** LIFE-01, LIFE-02, LIFE-03, LIFE-04, LIFE-05
- **Entregável:** Ações reversíveis e estado derivado das revisões do planejamento.
- **Aceite:** Cópia tem novo ID, revisão 1 e fases desmarcadas. Arquivado sai da lista padrão e não aceita edição. Sete fases revisadas não significam execução comprovada.
- **Verificação / evidência:** Duplicar um plano completo; arquivar e tentar editar por chamada direta; reativar e conferir estado e conteúdo.
- **Limite ou observação:** Sem exclusão definitiva, transferência de propriedade ou cópia do histórico para a duplicata.

### ENT-09 — Migrar rascunhos e manter exportações

- **Responsável sugerido:** Backend + frontend + qualidade.
- **Dependências:** ENT-04, ENT-05.
- **Requisitos:** MIG-01, MIG-02, MIG-03, MIG-04, MIG-05
- **Entregável:** Importação confirmada dos rascunhos e backups v1/v2, detecção de repetição e exportação de revisão salva em JSON/Markdown.
- **Aceite:** Importação cria um plano sem apagar o original; repetição aponta o plano existente; arquivo inválido não altera dados.
- **Verificação / evidência:** Usar fixtures válidas e inválidas, limite de 2.000.000 bytes e caso de mudança de origem ou identidade. Conferir migração v1 e revisões invalidadas.
- **Limite ou observação:** Se mudar o provedor de login ou domínio, definir o vínculo seguro; não assumir acesso aos dados locais do domínio antigo.

### ENT-10 — Completar controles de segurança e falhas

- **Responsável sugerido:** Backend + qualidade.
- **Dependências:** ENT-03, ENT-04, ENT-06.
- **Requisitos:** SAFE-05, SAFE-07, SAFE-08, SAFE-09, SAFE-10
- **Entregável:** Renderização segura, logs sem conteúdo sensível, limitação de mutações, proteção CSRF e política de cache.
- **Aceite:** Texto não executa scripts; identidade acima do limite de 60 mutações por minuto recebe 429; origem inválida recebe 403; cache não serve dados de outra pessoa.
- **Verificação / evidência:** Executar cenários negativos e inspecionar logs de homologação para confirmar que tokens, cabeçalhos de identidade e conteúdo de planos não foram registrados.
- **Limite ou observação:** Esses controles devem acompanhar o desenvolvimento; este item concentra o fechamento e as evidências, não autoriza liberar antes deles.

### ENT-11 — Homologar a experiência e os fluxos completos

- **Responsável sugerido:** Qualidade + frontend + João.
- **Dependências:** ENT-05, ENT-06, ENT-07, ENT-08, ENT-09, ENT-10.
- **Requisitos:** UX-01, UX-02, UX-03, UX-04
- **Entregável:** Roteiro de homologação, defeitos corrigidos e matriz de evidências para todos os 56 critérios.
- **Aceite:** Fluxos essenciais funcionam por teclado, em larguras de 390/1440 pixels e com zoom de 200%; sidebar, rolagem e cartão preservam os ajustes combinados.
- **Verificação / evidência:** Cenário ponta a ponta com administrador e dois usuários; criar, editar, bloquear, restaurar, migrar e exportar. Validar regressões das sete fases.
- **Limite ou observação:** Testar também com o volume proposto de 10 usuários e 100 planos por usuário, sem tratar isso como promessa de escala ilimitada.

### ENT-12 — Preparar operação e liberar a versão

- **Responsável sugerido:** Liderança técnica + João.
- **Dependências:** ENT-11.
- **Requisitos:** Organização ou condição operacional de entrega; sem novo requisito funcional.
- **Entregável:** Procedimento de publicação, backup/recuperação, reversão e responsáveis de suporte.
- **Aceite:** Recuperação demonstrada em homologação, aceite de produto registrado e autorização de publicação obtida. Versão anterior e dados necessários à reversão preservados.
- **Verificação / evidência:** Ensaiar restauração com dados fictícios e executar os fluxos críticos após a publicação autorizada.
- **Limite ou observação:** Não alterar produção nem migrar os rascunhos das pessoas sem preparar previamente o caminho de recuperação.

## Modelo de ticket

Copiar para a ferramenta escolhida:

```text
Título: resultado concreto para o usuário
Entrega de origem: ENT-xx
Requisitos: IDs da especificação
Responsável:
Revisor:
Prioridade:
Dependências:
Objetivo:
Dentro do escopo:
Fora do escopo:
Critérios de aceite:
Cenários de teste:
Evidências esperadas:
Estimativa da equipe:
Risco ou decisão pendente:
Link da alteração:
Resultado da homologação:
```

Um ticket não está concluído porque “a tela ficou pronta”. O comportamento previsto precisa funcionar com a autorização, a persistência e o tratamento de falhas exigidos para aquela entrega.

