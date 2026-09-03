import * as F from '../lib/framework.mjs';
import {contextQuestions} from '../lib/v2.mjs';
export function plannedState(){
 const s=F.initialState();
 s.context={name:'Engenharia de Catálogo',size:'24',usage:'team'};
 s.answers=Object.fromEntries(F.dimensions.map(d=>[d.key,3]));s.bottleneck='quality';
 s.v2.diagnostic={...s.v2.diagnostic,...Object.fromEntries(contextQuestions.map(x=>[x[0],'ready']))};
 s.enablers.owner='Tech Lead';s.enablers.sponsor='Diretoria';
 Object.assign(s.pilot,{name:'Catálogo',owner:'Líder',size:'6',l1:'0',scores:[2,2,2,2,2],hypothesis:'Diminuir tempo sem elevar retrabalho',start:'2026-09-10'});
 Object.assign(s.v2.experiment,{workflow:'Correções pequenas',comparison:'Tarefas equivalentes, com limitações documentadas',end:'2026-10-10',source:'PRs e apontamentos do time',expand:'Ganho verificado com qualidade e custo aceitáveis',adjust:'Sinal insuficiente ou gargalo corrigível',stop:'Regressão persistente'});
 s.v2.experiment.measures.forEach(m=>m.target='Meta definida com o time');
 s.governance.owner='Segurança';s.governance.reviewDate='2026-12-01';
 Object.assign(s.v2.regulation,{markets:'Portugal',role:'deployer',useCase:'Assistente interno de engenharia',owner:'Jurídico'});
 s.scale.owner='Gestão';s.scale.start='2026-11-01';
 return s;
}
export function executedState(){
 const s=plannedState();s.pilot.l1='6';
 s.l2=Object.fromEntries(F.stages.map(st=>[st.key,'100']));
 for(const [k,n] of [['policies',9],['standards',7],['guards',6]])s.governance[k]=Array.from({length:n},(_,i)=>i);
 s.governance.evidence='Registro das políticas e controles';
 Object.assign(s.v2.regulation,{applicability:'applies',source:'Normas oficiais',verifiedAt:'2026-09-03',notes:'Obrigações identificadas e implementadas no recorte'});
 s.v2.experiment.measures.forEach(m=>Object.assign(m,{baseline:'10',current:'8',source:'Medições e amostra'}));
 s.v2.experiment.decision='expand';s.v2.experiment.decisionEvidence='Revisão documentada do piloto';
 s.scale.checks=[0,1,2,3,4];s.scale.evidence=Object.fromEntries(s.scale.checks.map(i=>[i,'Medições, análise e decisão']));
 return s;
}
