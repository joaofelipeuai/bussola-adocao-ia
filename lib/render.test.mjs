import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import {createServer} from 'vite';
import react from '@vitejs/plugin-react';
import * as React from 'react';
import {renderToString} from 'react-dom/server';
import {plannedState,executedState} from './test-fixtures.mjs';
import {initialState} from './framework.mjs';
test('todos os formulários renderizam no servidor, incluindo estados vazios e controles condicionais',async()=>{
 const server=await createServer({configFile:false,plugins:[react()],resolve:{alias:{'@':process.cwd()}},server:{middlewareMode:true,watch:null},customLogger:{info(){},warn(){},warnOnce(){},error(msg){throw new Error(msg)},clearScreen(){},hasErrorLogged(){return false},hasWarned:false}});
 try{
  const scenarios=[initialState(),plannedState(),executedState()];
  const full=scenarios[2];full.governance.agentic=true;full.governance.mcp=true;full.v2.mcp={transport:'both',evidence:'testes'};full.v2.autonomy.coding={level:'production',scope:'escopo',owner:'dono',checks:[]};full.v2.evaluations.cases=[{id:'case',task:'Tarefa',expected:'Aceite',trials:'3',passed:'2',evidence:'logs'}];
  full.v2.legacyMetrics={'MET-I01':{baseline:'18h',current:'12h'}};
  for(const [file,name] of [['diagnostic.jsx','default'],['people-phases.jsx','Enablers'],['people-phases.jsx','Pilot'],['adoption-phases.jsx','Gaps'],['adoption-phases.jsx','Adoption'],['governance-phase.jsx','default'],['scale-phase.jsx','default'],['plan-report.jsx','default']]){
   const mod=await server.ssrLoadModule(path.resolve('components',file));
   for(const s of scenarios){for(const q of file==='diagnostic.jsx'?[-1,0,8,9]:[s.q]){
    const props={s:{...s,q},change(){},setS(){},group(){},nav(){}};
    const html=renderToString(React.createElement(mod[name],props));assert.ok(html.length>100,file);assert.ok(!html.includes('[object Object]'),file);
   }}
  }
  const {default:Home}=await server.ssrLoadModule(path.resolve('app/page.jsx'));const html=renderToString(React.createElement(Home));assert.match(html,/V2 · 2026/);assert.ok(!html.includes('class="askblue-logo"'));
 }finally{await server.close()}
});
