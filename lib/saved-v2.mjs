import {initialV2,autonomyLevels,autonomyChecks,contextQuestions,newMeasure,newEval} from './v2.mjs';
const stageKeys=['planning','coding','review','testing','deploy','observability'];
const fail=()=>{throw new Error('Dados da v2 inválidos. Verifique o backup e os campos numéricos.');};
function record(v){if(!v||typeof v!=='object'||Array.isArray(v))fail();return v;}
function str(v,max=20000){if(typeof v!=='string'||v.length>max)fail();return v;}
function strings(v,base){record(v);const out={};for(const [k,b] of Object.entries(base))if(typeof b==='string')out[k]=str(v[k]);return out;}
function choice(v,values){if(!values.includes(v))fail();return v;}
function integer(v,min,max,optional=false){if(optional&&v==='')return v;if(!/^\d+$/.test(v)||Number(v)<min||Number(v)>max)fail();return v;}
function date(v){if(!v)return v;if(!/^\d{4}-\d{2}-\d{2}$/.test(v)||!Number.isFinite(Date.parse(v))||new Date(v).toISOString().slice(0,10)!==v)fail();return v;}
function rows(v,max,base){if(!Array.isArray(v)||v.length>max)fail();const out=v.map(x=>strings(x,base));if(out.some(x=>!x.id)||new Set(out.map(x=>x.id)).size!==out.length)fail();return out;}
export function validateV2(input){
 record(input);const v=initialV2();
 v.migratedFrom=choice(input.migratedFrom,['','v1']);
 for(const key of ['diagnostic','criteria','experiment','evaluations','regulation','mcp','rollout','measurement'])v[key]={...v[key],...strings(input[key],v[key])};
 for(const [key] of contextQuestions)choice(v.diagnostic[key],['','fragile','partial','ready','unknown']);
 integer(v.criteria.l2Threshold,1,100);integer(v.criteria.criticalPriority,7,21);
 choice(v.experiment.decision,['pending','expand','adjust','stop']);date(v.experiment.end);
 v.experiment.measures=rows(input.experiment.measures,30,newMeasure(''));
 for(const m of v.experiment.measures){choice(m.direction,['lower','higher']);for(const k of ['baseline','current'])if(m[k]!==''&&(!/^(\d+(\.\d*)?|\.\d+)$/.test(m[k])||!Number.isFinite(Number(m[k]))))fail();}
 v.evaluations.cases=rows(input.evaluations.cases,100,newEval(''));
 for(const c of v.evaluations.cases){integer(c.trials,1,100000,true);integer(c.passed,0,100000,true);if(c.passed!==''&&(c.trials===''||Number(c.passed)>Number(c.trials)))fail();}
 record(input.autonomy);v.autonomy={};
 for(const k of stageKeys){const a=input.autonomy[k];if(a===undefined)continue;record(a);const level=choice(a.level,autonomyLevels.map(x=>x[0]));if(!Array.isArray(a.checks)||a.checks.some(x=>!autonomyChecks.some(c=>c[0]===x)))fail();v.autonomy[k]={level,scope:str(a.scope),owner:str(a.owner),checks:[...new Set(a.checks)]};}
 choice(v.regulation.role,['','provider','deployer','both','assess']);choice(v.regulation.applicability,['pending','applies','not-applicable']);date(v.regulation.verifiedAt);
 choice(v.mcp.transport,['','http','stdio','both']);integer(v.rollout.count,1,20,true);
 record(input.legacyMetrics);for(const k of ['MET-I01','MET-I03'])if(input.legacyMetrics[k])v.legacyMetrics[k]=strings(input.legacyMetrics[k],{baseline:'',current:''});
 record(input.legacyCompletion);if(!Array.isArray(input.legacyCompletion.checks)||input.legacyCompletion.checks.some(x=>!Number.isInteger(x)||x<0||x>4))fail();
 v.legacyCompletion.checks=[...new Set(input.legacyCompletion.checks)];record(input.legacyCompletion.evidence);for(let i=0;i<5;i++)if(input.legacyCompletion.evidence[i]!==undefined)v.legacyCompletion.evidence[i]=str(input.legacyCompletion.evidence[i]);
 return v;
}
