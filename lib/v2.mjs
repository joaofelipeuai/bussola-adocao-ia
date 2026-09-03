export const reviewedAt = '2026-09-03';
export const sources = [
  ['DORA · Cinco métricas de entrega', 'https://dora.dev/guides/dora-metrics/', 'Definições de fluxo, estabilidade e retrabalho de deploy.'],
  ['DORA · Capacidades para adoção de IA', 'https://dora.dev/ai/capabilities-model/questions/', 'Dados internos, plataforma, contexto e foco no usuário.'],
  ['DORA · Retorno do investimento em IA', 'https://dora.dev/ai/roi/report/', 'Avaliação de custos e benefícios da adoção.'],
  ['METR · Atualização do estudo de produtividade', 'https://metr.org/blog/2026-02-24-uplift-update/', 'Resultados dependem de tarefas, ferramentas e população; não são promessas de ganho.'],
  ['OWASP · LLM Top 10 2026', 'https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/', 'Referência atualizada para riscos de aplicações com LLMs.'],
  ['OWASP · Aplicações com agentes 2026', 'https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/', 'Riscos de sistemas que usam ferramentas e executam ações.'],
  ['MCP · Autorização (2025-11-25)', 'https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization', 'Autorização HTTP e credenciais locais têm mecanismos distintos.'],
  ['Anthropic · Avaliações de agentes', 'https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents', 'Tarefas reais, critérios verificáveis, repetições e regressões.'],
  ['Comissão Europeia · AI Act', 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai', 'Aplicação faseada por papel e caso de uso; consultar o calendário vigente.'],
];
export const contextQuestions = [
  ['documentation', 'Documentação e contexto', 'As regras de negócio, decisões e instruções de desenvolvimento estão atualizadas e têm responsáveis?', 'Revisar documentação das áreas do piloto e definir responsáveis pela atualização.'],
  ['data', 'Conhecimento interno acessível', 'As pessoas e ferramentas autorizadas conseguem encontrar dados confiáveis, com permissões e origem conhecidas?', 'Mapear fontes internas, qualidade dos dados e permissões antes de conectá-las à IA.'],
  ['environment', 'Ambiente reproduzível', 'Uma pessoa ou agente consegue preparar o ambiente, executar testes e reproduzir falhas com instruções claras?', 'Documentar e automatizar a preparação do ambiente e a execução dos testes.'],
  ['outcome', 'Resultado para o usuário', 'O time sabe qual problema do usuário quer resolver e como verificar se a entrega ajudou?', 'Definir o resultado esperado pelo usuário e a forma de verificar o benefício.'],
];
export const autonomyLevels = [
  ['suggest', 'Só sugerir', 'A IA lê o contexto autorizado e propõe; uma pessoa aplica as mudanças.'],
  ['edit', 'Alterar em ambiente isolado', 'Pode alterar arquivos em escopo definido; uma pessoa revisa antes da integração.'],
  ['execute', 'Executar ferramentas', 'Pode executar comandos e integrações autorizadas, com limites e registros.'],
  ['production', 'Atuar em produção', 'Acesso produtivo delimitado, com aprovação para ações críticas, interrupção e recuperação testadas.'],
];
export const autonomyChecks = [
  ['scope', 'Escopo e permissões mínimas definidos'],
  ['isolation', 'Ambiente isolado e credenciais protegidas'],
  ['logging', 'Ações registradas e atribuídas a um responsável'],
  ['approval', 'Aprovação humana para ações críticas e irreversíveis'],
  ['recovery', 'Interrupção de emergência e recuperação testadas'],
  ['evaluation', 'Avaliações do agente aprovadas para a configuração atual'],
];
export function requiredControls(level) {
  return level === 'suggest' ? [] : level === 'edit' ? ['scope','isolation','approval'] : level === 'execute' ? ['scope','isolation','logging','approval','evaluation'] : ['scope','isolation','logging','approval','recovery','evaluation'];
}
export const metricGroups = {
  adoption: 'Adoção e capacitação', outcome: 'Resultado do trabalho', dora: 'DORA · por aplicação ou serviço',
};
export const modernMetrics = [
  ['MET-A01','Uso semanal de IA','%','Acompanhar adesão; não comprova produtividade.','adoption'],
  ['MET-A02','Ferramentas ativas','nº','Acompanhar portfólio aprovado e sobreposição.','adoption'],
  ['MET-A03','Squads com adoção','%','Relacionar a objetivos e capacidade de suporte.','adoption'],
  ['MET-A04','Proficiência L0 / L1 / L2 / L3','distribuição','Validar competências por atividade prática.','adoption'],
  ['MET-A05','Tempo para atingir L1','semanas','Medir aprendizagem no contexto do time.','adoption'],
  ['MET-E01','SDLC com uso no time ou organização','%','Abrangência não representa autonomia nem benefício.','adoption'],
  ['MET-E02','Sessões por pessoa por semana','nº','Indicador de atividade, sem meta de volume.','adoption'],
  ['MET-E03','PRs com revisão assistida','%','Avaliar junto com a qualidade da revisão.','adoption'],
  ['OUT-01','Tempo total até entrega aceita','horas','Da entrada da demanda ao aceite; manter o mesmo recorte.','outcome'],
  ['OUT-02','Esforço humano de revisão','horas/entrega','Incluir verificação, correções e aprovação.','outcome'],
  ['OUT-03','Entregas que exigem retrabalho','%','Definir a janela e o que conta como retrabalho.','outcome'],
  ['OUT-04','Custo por entrega aceita','moeda/entrega','Incluir licenças, uso de modelos e esforço humano; registrar a moeda.','outcome'],
  ['OUT-05','Benefício para o usuário','definida pelo time','Ex.: sucesso na tarefa, satisfação ou tempo economizado.','outcome'],
  ['MET-I02','Defeitos em produção','definida pelo time','Registrar denominador e severidade; não equivale à taxa de falha de deploy.','outcome'],
  ['DORA-01','Frequência de deploy','deploys/período','Número de deploys ou intervalo entre deploys.','dora'],
  ['DORA-02','Tempo da alteração até produção','horas','Do commit no controle de versão ao deploy em produção.','dora'],
  ['DORA-03','Recuperação de deploy com falha','horas','Tempo para recuperar um deploy que exige intervenção imediata.','dora'],
  ['DORA-04','Taxa de falha das mudanças','%','Deploys que exigem intervenção imediata ÷ total de deploys.','dora'],
  ['DORA-05','Taxa de deploys de retrabalho','%','Deploys não planejados em resposta a incidentes ÷ total de deploys.','dora'],
];
export function newMeasure(id) { return {id,name:'',unit:'',direction:'lower',baseline:'',current:'',target:'',source:''}; }
export function newEval(id) { return {id,task:'',expected:'',trials:'',passed:'',evidence:''}; }
export function updateSection(v,section,key,value){
  const next={...v,[section]:{...v[section],[key]:value}};
  if(section==='experiment'&&!['decision','decisionEvidence'].includes(key))next.experiment={...next.experiment,decision:'pending',decisionEvidence:''};
  if(section==='evaluations'&&key==='system'&&value!==v.evaluations.system)next.evaluations.cases=v.evaluations.cases.map(c=>({...c,trials:'',passed:'',evidence:''}));
  if(section==='regulation'&&['markets','role','useCase'].includes(key)&&value!==v.regulation[key])next.regulation.applicability='pending';
  return next;
}
export function initialV2() {
  return {
    migratedFrom:'', diagnostic:{documentation:'',data:'',environment:'',outcome:'',evidence:''},
    criteria:{l2Threshold:'60',criticalPriority:'11',reason:''},
    experiment:{workflow:'',comparison:'',end:'',source:'',expand:'',adjust:'',stop:'',decision:'pending',decisionEvidence:'',measures:[{...newMeasure('measure-delivery'),name:'Tempo total até entrega aceita',unit:'horas'},{...newMeasure('measure-quality'),name:'Entregas com retrabalho',unit:'%'}]},
    autonomy:{}, evaluations:{system:'',owner:'',cadence:'A cada alteração de modelo, instruções ou ferramentas',cases:[]},
    regulation:{markets:'',role:'',useCase:'',applicability:'pending',source:'',verifiedAt:'',owner:'',notes:''},
    mcp:{transport:'',evidence:''}, rollout:{count:'',capacity:'',reason:''},
    measurement:{service:'',baselinePeriod:'',currentPeriod:'',source:''}, legacyMetrics:{},legacyCompletion:{checks:[],evidence:{}},
  };
}
export function measureDelta(m) {
  if(m.baseline.trim()===''||m.current.trim()==='')return null;
  const before=Number(m.baseline),after=Number(m.current);
  if(!Number.isFinite(before)||!Number.isFinite(after)||before<0||after<0)return null;
  return {absolute:after-before,percent:before===0?null:(after-before)/before*100,improved:m.direction==='higher'?after>before:after<before};
}
export function evalStatus(v) {
  const configured=!!v.system.trim()&&!!v.owner.trim()&&!!v.cadence.trim()&&v.cases.length>0;
  const complete=configured&&v.cases.every(c=>c.task.trim()&&c.expected.trim()&&/^\d+$/.test(c.trials)&&Number(c.trials)>0&&/^\d+$/.test(c.passed)&&Number(c.passed)<=Number(c.trials)&&c.evidence.trim());
  const passed=complete&&v.cases.every(c=>Number(c.trials)===Number(c.passed));
  return {configured,complete,passed,label:passed?'Aprovada · resultado declarado':complete?'Falhas registradas': 'Avaliação pendente'};
}
export function autonomyStatus(s,stage) {
  const a=s.v2.autonomy[stage]||{level:'suggest',scope:'',owner:'',checks:[]},req=requiredControls(a.level);
  const missing=req.filter(k=>k==='evaluation'?!evalStatus(s.v2.evaluations).passed:!a.checks.includes(k));
  if(a.level!=='suggest'){if(!a.scope.trim())missing.push('Escopo por escrito');if(!a.owner.trim())missing.push('Responsável');}
  if(a.level!=='suggest'&&stage==='deploy'&&s.answers.delivery===1)missing.push('Automação de entrega antes da autonomia em deploy');
  return {...a,required:req,missing,ready:missing.length===0};
}
export function pilotDesignErrors(s) {
  const e=s.v2.experiment;
  return [!e.workflow.trim()&&'Defina o fluxo e as tarefas do experimento.',!e.comparison.trim()&&'Defina como comparar tarefas e períodos.',!s.pilot.start&&'Defina o início do piloto.',!e.end&&'Defina o fim da avaliação.',s.pilot.start&&e.end&&e.end<s.pilot.start&&'O fim da avaliação deve ser posterior ou igual ao início.',!e.source.trim()&&'Defina a fonte das medições.',!e.expand.trim()&&'Defina o critério para expandir.',!e.adjust.trim()&&'Defina o critério para ajustar.',!e.stop.trim()&&'Defina o critério para encerrar.',!e.measures.length&&'Inclua ao menos um indicador do piloto.',e.measures.some(m=>!m.name.trim()||!m.unit.trim()||!m.target.trim())&&'Dê nome, unidade e meta contextual a cada indicador.'].filter(Boolean);
}
export function expansionStatus(s) {
  const e=s.v2.experiment;
  return !pilotDesignErrors(s).length&&e.decision==='expand'&&!!e.decisionEvidence.trim()&&e.measures.every(m=>measureDelta(m)!==null&&m.source.trim());
}
export function v2Markdown(s,stageNames) {
  const v=s.v2,e=v.experiment,r=v.regulation;
  return ['## Complementos da Bússola v2',`Referências revisadas em ${reviewedAt}. Adaptação independente; v2 é a versão da Bússola, não uma edição oficial do guia.`,
    '### Contexto complementar (fora da média original)',...contextQuestions.map(([k,n])=>`- ${n}: ${{fragile:'Frágil',partial:'Parcial',ready:'Disponível e validado',unknown:'A verificar'}[v.diagnostic[k]]||'Pendente'}`),`Evidência: ${v.diagnostic.evidence||'Pendente'}`,
    '### Parâmetros de decisão',`L2+ para abrangência time: ${v.criteria.l2Threshold}%. Prioridade crítica: ${v.criteria.criticalPriority}/21. Justificativa: ${v.criteria.reason||'Valores sugeridos pelo guia; validar no contexto.'}`,
    '### Desenho e decisão do piloto',`Fluxo/tarefas: ${e.workflow||'Pendente'}. Comparação: ${e.comparison||'Pendente'}.`, `Período: ${s.pilot.start||'Pendente'} a ${e.end||'Pendente'}. Fonte: ${e.source||'Pendente'}.`,
    ...['expand','adjust','stop'].map((k,i)=>`${['Expandir','Ajustar','Encerrar'][i]}: ${e[k]||'Pendente'}`),...e.measures.map(m=>`- ${m.name||'Indicador sem nome'} (${m.unit}): baseline ${m.baseline||'pendente'}; atual ${m.current||'pendente'}; direção ${m.direction==='lower'?'reduzir':'aumentar'}; meta ${m.target||'pendente'}; fonte ${m.source||'pendente'}.`),`Decisão: ${{pending:'pendente',expand:'expandir',adjust:'ajustar',stop:'encerrar'}[e.decision]}. Evidência/justificativa: ${e.decisionEvidence||'Pendente'}. Uma variação antes/depois não demonstra causalidade.`,
    '### Autonomia por estágio',...stageNames.map(st=>{const a=autonomyStatus(s,st.key);return `- ${st.name}: ${autonomyLevels.find(x=>x[0]===a.level)[1]}. Escopo: ${a.scope||'a definir'}; responsável: ${a.owner||'a definir'}; controles ${a.ready?'declarados atendidos':'pendentes: '+a.missing.map(k=>autonomyChecks.find(x=>x[0]===k)?.[1]||k).join('; ')}.`}),
    '### Avaliações reproduzíveis',`Configuração: ${v.evaluations.system||'Pendente'}. Responsável: ${v.evaluations.owner||'Pendente'}. Cadência: ${v.evaluations.cadence}. ${evalStatus(v.evaluations).label}.`,...v.evaluations.cases.map(c=>`- Tarefa: ${c.task}. Aceite: ${c.expected}. Execuções aprovadas: ${c.passed||'pendente'}/${c.trials||'pendente'}. Evidência: ${c.evidence||'pendente'}.`),
    '### Enquadramento regulatório',`Países/mercados: ${r.markets||'Pendente'}. Papel: ${r.role||'Pendente'}. Caso de uso: ${r.useCase||'Pendente'}.`,`Situação: ${r.applicability}. Responsável: ${r.owner||'Pendente'}. Verificação: ${r.verifiedAt||'Pendente'}. Fonte: ${r.source||'Pendente'}. Análise: ${r.notes||'Pendente'}.`,
    `MCP: transporte ${v.mcp.transport||'não definido'}; evidência: ${v.mcp.evidence||'Pendente'}.`,
    '### Medição e capacidade de escala',`Aplicação/serviço: ${v.measurement.service||'Pendente'}. Baseline: ${v.measurement.baselinePeriod||'Pendente'}. Atual: ${v.measurement.currentPeriod||'Pendente'}. Fonte: ${v.measurement.source||'Pendente'}.`,`Ondas ajustadas: ${v.rollout.count||'sugestão por tamanho'}. Capacidade de suporte: ${v.rollout.capacity||'Pendente'}. Justificativa: ${v.rollout.reason||'Pendente'}.`,
    ...(Object.keys(v.legacyMetrics).length?['### Registros históricos da v1 (reclassificar)',...Object.entries(v.legacyMetrics).map(([id,m])=>`- ${id}: baseline ${m.baseline}; atual ${m.current}. Preservado sem conversão automática para DORA.`)]:[]),
    ...(Object.keys(v.legacyCompletion.evidence).length?['### Evidências dos critérios antigos da v1',...Object.entries(v.legacyCompletion.evidence).map(([i,evidence])=>`- Critério anterior ${Number(i)+1}: ${evidence}. Marcado na v1: ${v.legacyCompletion.checks.includes(Number(i))?'sim':'não'}. Reavaliar com os critérios v2.`)]:[]),
    '### Fontes da atualização',...sources.map(([title,url,desc])=>`- [${title}](${url}) — ${desc}`),
  ].join('\n\n');
}
