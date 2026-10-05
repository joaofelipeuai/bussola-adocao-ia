# Bússola — resumo para compartilhar

Estamos evoluindo a Bússola, uma aplicação para ajudar lideranças de engenharia a transformar a adoção de inteligência artificial em um plano estruturado.

A base já funciona: uma home apresenta a jornada e um wizard conduz o usuário por sete fases — diagnóstico, time AI Enablers, piloto, gargalos, adoção progressiva, governança e escala. O usuário registra seu contexto, define prioridades, responsáveis e critérios e pode exportar o planejamento. É uma adaptação independente do framework do Tech Leads Club.

Hoje o acesso usa uma conta autorizada do ChatGPT e as respostas ficam no navegador. O próximo objetivo é transformar essa base em uma aplicação com backoffice e dados centralizados: cada usuário poderá criar e manter vários planos, e um administrador poderá acompanhar e editar os planos de cada pessoa.

O escopo proposto inclui gestão de usuários e permissões, criação e edição de planos, salvamento no servidor, busca, histórico de versões, proteção contra sobrescrita, duplicação, arquivamento e migração dos rascunhos atuais.

Já existe código React com Vinext/Vite e uma especificação com 56 critérios de aceite. Supabase para banco e autenticação, com hospedagem web independente, foi discutido como alternativa; essa decisão ainda precisa ser validada. O backoffice e essa migração ainda não foram implementados.

Precisamos organizar as frentes de produto, desenvolvimento e testes. O primeiro marco será demonstrar um usuário criando e salvando um plano, recuperando-o em outro navegador e sem conseguir acessar planos de outra pessoa. A partir daí, expandiremos para a gestão administrativa e os demais recursos.

Produto atual: [Bússola](https://bussola-adocao-ia.joaofelipesouza.chatgpt.site/).

Material para iniciar: [projeto](PROJETO.md), [backlog](BACKLOG.md), [requisitos](requisitos/spec.md) e [guia técnico](GUIA-TECNICO.md).

