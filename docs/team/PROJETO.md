# Bússola — organização do projeto

Data: 05/10/2026. Responsável atual pela ideia: João Souza.
Status: produto base existente; evolução do backoffice em preparação.
As escolhas identificadas como propostas aguardam revisão com a equipe.

## Objetivo e público

Permitir que tech leads, líderes de engenharia e facilitadores organizem a adoção de IA a partir da realidade do time. A próxima entrega é um backoffice que permita manter vários planos por pessoa e administrar esse trabalho com rastreabilidade.

Preencher um plano não comprova que a adoção aconteceu. As respostas e evidências são autodeclaradas; esse significado deve permanecer claro no produto.

## Situação atual e destino

| Área | Existe hoje | Entrega proposta |
| --- | --- | --- |
| Entrada | Home pública, iniciar e retomar wizard | Preservar o visual e ligar à lista de planos quando apropriado |
| Framework | Sete fases, regras e relatório | Reaproveitar o wizard como editor de cada plano |
| Login | ChatGPT e lista de quatro e-mails no servidor | Cadastro e bloqueio pelo administrador; provedor a decidir |
| Dados | Um rascunho por identidade e navegador | Vários planos por pessoa em armazenamento central |
| Administração | Não existe backoffice | Usuários, lista global e edição dos planos |
| Histórico | Backup manual e rascunho atual | Revisões com autor, data e restauração |
| Recuperação | JSON importável e exportável | Migração preservando os originais e recuperação do armazenamento central |

## Escopo proposto da primeira versão do backoffice

A referência completa é [a especificação](requisitos/spec.md). Ela contempla:

- Administrador com acesso global e usuário com acesso apenas aos próprios planos.
- Cadastro, bloqueio e reativação de usuários.
- Criação, listagem, busca, edição, salvamento e retomada de planos em outro navegador.
- Salvamento automático, confirmação visível e tratamento de falhas.
- Histórico, restauração e recusa de gravação sobre uma revisão desatualizada.
- Duplicação, arquivamento e reativação.
- Importação dos formatos v1/v2 e exportação de JSON e Markdown.
- Interface consistente, utilizável com teclado e em telas pequenas.

Não fazem parte desta versão: cobrança, organizações com vários membros, compartilhamento entre usuários comuns, colaboração em tempo real, geração de planos por IA, anexos ou editor das regras do framework. Não há compromisso de datas ou custos sem estimativa da equipe.

## Decisões a fechar na reunião inicial

| ID | Decisão | Proposta / contexto | Quem decide |
| --- | --- | --- | --- |
| DEC-01 | Repositório e quadro | Um repositório privado na ferramenta já usada pela equipe, com tickets e revisão de código | João e liderança técnica |
| DEC-02 | Autenticação e dados | Avaliar Supabase para banco e autenticação; a solução atual permanece como referência até a escolha | Liderança técnica propõe; João aprova custos e operação |
| DEC-03 | Hospedagem | Avaliar permanência no Sites ou migração para hospedagem independente, como Cloudflare Workers | Liderança técnica e João |
| DEC-04 | Perfis e entrada | Administrador inicial é João; demais usuários gerenciam só os próprios planos; entrada restrita a pessoas autorizadas | João |
| DEC-05 | Histórico e salvamento | Automático após 2 segundos, botão Salvar e histórico sem expiração no MVP, sujeito a análise de capacidade | Produto e liderança técnica |
| DEC-06 | Prioridades | Manter os 56 critérios no alvo da versão; usar marcos intermediários para demonstrar progresso | João e equipe |
| DEC-07 | Operação | Definir responsável por publicação, recuperação, região dos dados, retenção, orçamento e suporte | João e liderança técnica |

Supabase foi discutido; não há projeto provisionado nem decisão final registrada. Uma eventual troca de login exige critérios adicionais de recuperação de senha, verificação de e-mail e migração de identidade, antes da implementação. Não basta substituir um SDK.

## Pessoas e responsabilidades

Os papéis podem ser acumulados. Cada entrega deve ter um responsável nomeado e um revisor.

| Papel | Responsabilidade | Nome |
| --- | --- | --- |
| Responsável pelo produto | Priorizar, esclarecer regras e aceitar entregas | João Souza |
| Referência do framework | Validar interpretação das fases, pontuações e relatórios | A definir |
| Liderança técnica / backend | Arquitetura, autenticação, persistência, permissões e publicação | A definir |
| Frontend / experiência | Listas, editor, estados de salvamento, navegação e responsividade | A definir |
| Qualidade / homologação | Cenários de aceite, isolamento de dados, regressões e evidências | A definir |

Para duas pessoas técnicas: uma pode assumir backend/infraestrutura e outra frontend/integração; a revisão é cruzada e João faz a homologação de produto. Com uma terceira pessoa, testes e experiência podem ter atenção dedicada. A distribuição é proposta, sem atribuir trabalho a pessoas ainda não convidadas.

## Acesso para usar e acesso para desenvolver

Autorizar um e-mail no site concede uso do wizard. Isso não concede acesso ao código ou permissão para publicar.

Para desenvolver, cada colaborador precisa de acesso ao repositório privado e ao quadro. Acesso aos serviços de infraestrutura deve ser concedido conforme a função. As contas, os dados e as credenciais da aplicação ficam separados das contas de colaboração da equipe.

O código já tem histórico Git e remoto de publicação do Sites. A equipe deve escolher como receberá o código; não presumir que esse remoto funciona como um projeto compartilhado de GitHub ou Azure DevOps. Preservar o vínculo de publicação existente e definir explicitamente o novo remoto e fluxo de sincronização.

## Marcos de entrega

| Marco | Resultado demonstrável | Condição de aceite |
| --- | --- | --- |
| M0 — Base da equipe | Repositório, ambiente reproduzível, decisões iniciais e tickets | Outra pessoa consegue obter o código e executar os testes; arquitetura de identidade/dados registrada |
| M1 — Plano centralizado | Entrar, criar, salvar, editar e reabrir plano | Persistência real, isolamento entre duas contas e gravação atômica comprovados |
| M2 — Backoffice | Administrador gerencia pessoas e planos | Lista por usuário, bloqueio, busca e edição funcionam com permissões corretas |
| M3 — Recuperação e continuidade | Histórico, conflitos, arquivo e migração | Nenhuma sobrescrita silenciosa; rascunhos antigos preservados |
| M4 — Liberação | Homologação e operação preparadas | Critérios da versão atendidos, recuperação ensaiada e publicação autorizada pelo responsável |

M1 é uma demonstração intermediária, não o MVP completo. A equipe só reduz o escopo formal mediante decisão registrada por produto.

## Processo de trabalho

Quadro sugerido: Backlog → Pronto para desenvolver → Em andamento → Revisão → Homologação → Concluído.

Um item está pronto para desenvolver quando tem responsável, revisor, requisito vinculado, critério de aceite, dependências resolvidas e estimativa da equipe. Um item bloqueado deve indicar motivo, responsável pela decisão e próximo passo.

Uma entrega está concluída quando:

- Os comportamentos do ticket foram demonstrados com evidências e testes pertinentes.
- Outra pessoa revisou a alteração.
- Testes existentes relevantes e build passaram.
- Houve verificação de permissões quando dados ou autenticação foram alterados.
- Documentação, mudanças de dados e procedimento de reversão estão registrados quando aplicáveis.
- Produto aceitou o resultado na homologação.

Proposta de cadência: alinhamento breve duas vezes por semana e demonstração semanal. Ajustar à disponibilidade real. Datas devem surgir após estimativa; nenhum cronograma foi prometido.

## Reunião inicial — pauta de 45 minutos

1. Demonstrar a Bússola atual e explicar o problema do armazenamento local — 10 min.
2. Revisar escopo, perfis e alternativas de infraestrutura — 15 min.
3. Nomear responsáveis e escolher as primeiras entregas — 10 min.
4. Definir repositório, quadro, cadência e critérios para M0/M1 — 10 min.

A reunião deve terminar com DEC-01 a DEC-04 resolvidas ou com responsável e prazo para decidir, além dos primeiros tickets distribuídos.

