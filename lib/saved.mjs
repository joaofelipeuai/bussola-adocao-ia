import {initialState,archetypes,dimensions,metrics,stages} from './framework.mjs';
export function validateSaved(value){
 const fail=()=>{throw new Error('Arquivo de rascunho inválido ou de uma versão incompatível.')};
 if(!value||value.schema!==1)fail();const s=initialState();
 for(const group of ['context','enablers','pilot','governance','scale']){if(!value[group]||typeof value[group]!=='object')fail();for(const key of Object.keys(s[group])){const base=s[group][key],v=value[group][key];if(typeof base==='string'){if(typeof v!=='string'||v.length>20000)fail();s[group][key]=v}else if(typeof base==='boolean'){if(typeof v!=='boolean')fail();s[group][key]=v}}}
 if(!['none','individual','team','organization'].includes(s.context.usage)||!archetypes[s.enablers.archetype])fail();
 if(!Number.isInteger(value.step)||value.step<0||value.step>6||!Number.isInteger(value.q)||value.q< -1||value.q>9)fail();s.step=value.step;s.q=value.q;
 if(!Array.isArray(value.reviewed)||value.reviewed.length!==7||!value.reviewed.every(x=>typeof x==='boolean'))fail();s.reviewed=value.reviewed;
 if(typeof value.bottleneck!=='string')fail();s.bottleneck=value.bottleneck;
 for(const d of dimensions){const v=value.answers?.[d.key];if(v!==undefined){if(![1,2,3].includes(v))fail();s.answers[d.key]=v}}
 if(!Array.isArray(value.pilot.scores)||value.pilot.scores.length!==5||!value.pilot.scores.every(x=>[0,1,2,3].includes(x)))fail();s.pilot.scores=value.pilot.scores;
 for(const [key,max] of [['policies',9],['standards',7],['guards',6],['runtime',4],['mcpChecks',6]]){const v=value.governance[key];if(!Array.isArray(v)||!v.every(x=>Number.isInteger(x)&&x>=0&&x<max))fail();s.governance[key]=[...new Set(v)]}
 if(!Array.isArray(value.scale.checks)||!value.scale.checks.every(x=>Number.isInteger(x)&&x>=0&&x<5))fail();s.scale.checks=[...new Set(value.scale.checks)];
 for(let i=0;i<5;i++){const v=value.scale.evidence?.[i];if(v!==undefined){if(typeof v!=='string'||v.length>20000)fail();s.scale.evidence[i]=v}}
 for(const metric of metrics){const v=value.scale.metrics?.[metric[0]];if(v){if(typeof v.baseline!=='string'||typeof v.current!=='string'||v.baseline.length>1000||v.current.length>1000)fail();s.scale.metrics[metric[0]]={baseline:v.baseline,current:v.current}}}
 for(const stage of stages){const l=value.l2?.[stage.key],t=value.targets?.[stage.key];if(l!==undefined){if(typeof l!=='string'||!/^\d{0,3}$/.test(l)||Number(l)>100)fail();s.l2[stage.key]=l}if(t!==undefined){if(![0,1,2,3].includes(t))fail();s.targets[stage.key]=t}}
 function gap(v){if(!v||typeof v!=='object')fail();const r={};for(const k of ['id','title','action','owner']){if(v[k]!==undefined){if(typeof v[k]!=='string'||v[k].length>20000)fail();r[k]=v[k]}}if(v.track!==undefined){if(!['Técnica','Organizacional','Cultura'].includes(v.track))fail();r.track=v.track}for(const k of ['impact','effort','risk'])if(v[k]!==undefined){if(![1,2,3].includes(v[k]))fail();r[k]=v[k]}return r}
 if(!Array.isArray(value.customGaps)||value.customGaps.length>100||!Array.isArray(value.removedGaps)||!value.removedGaps.every(x=>typeof x==='string'))fail();s.removedGaps=value.removedGaps;
 s.customGaps=value.customGaps.map(v=>{const r=gap(v);if(!r.id?.startsWith('custom-')||typeof r.title!=='string'||typeof r.action!=='string'||!r.track||!r.impact||!r.effort||!r.risk)fail();return {...r,owner:r.owner||''}});
 for(const d of dimensions)if(value.gapEdits?.[d.key]){const {id,...rest}=gap(value.gapEdits[d.key]);s.gapEdits[d.key]=rest}
 return s;
}
