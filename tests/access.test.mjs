import test from 'node:test';
import assert from 'node:assert/strict';
import {identityFromHeaders,hasSiteAccess} from '../lib/access-policy.mjs';
import {draftStorageKey,readDraft,openDraft} from '../lib/browser-storage.mjs';
import {plannedState} from './fixtures.mjs';

const allowed = ['owner@example.com','guest@example.com'];
test('starting from the home opens the context without losing saved answers or reviews',()=>{
  const saved = {...plannedState(),step:5,q:9};
  const before = structuredClone(saved);
  const opened = openDraft(saved,true);
  assert.equal(opened.step,0);
  assert.equal(opened.q,-1);
  assert.deepEqual({...opened,step:5,q:9},before);
  assert.deepEqual(saved,before);
  assert.deepEqual(openDraft(saved),before);
});
const identity = (id,email) => identityFromHeaders(new Headers({...(id?{'oai-authenticated-user-id':id}:{}),...(email?{'oai-authenticated-user-email':email}:{})}));
test('missing or incomplete identity never opens the wizard',()=>{
  for(const user of [identity(),identity('user'),identity(null,'guest@example.com'),identity('user','invalid'),identity('user','guest@example.com,attacker@example.com')]) assert.equal(hasSiteAccess(user,allowed),false);
});
test('only exact authenticated email matches are allowed',()=>{
  assert.equal(hasSiteAccess(identity('owner','OWNER@EXAMPLE.COM'),allowed),true);
  assert.equal(hasSiteAccess(identity('guest','guest@example.com'),allowed),true);
  for(const email of ['other@example.com','guest+alias@example.com','guest@example.com.evil.test','gu%65st@example.com']) assert.equal(hasSiteAccess(identity('user',email),allowed),false);
  assert.equal(hasSiteAccess(identity('guest','guest@example.com'),[]),false);
});
test('drafts are isolated by user and only the owner may migrate legacy data',()=>{
  const values = new Map([['bussola-ai-adoption-v2','legacy'],[draftStorageKey('owner'),'owner-data'],[draftStorageKey('guest'),'guest-data']]);
  const storage = {getItem:key=>values.get(key)??null};
  assert.equal(readDraft(storage,'owner',true),'owner-data');
  assert.equal(readDraft(storage,'guest'),'guest-data');
  assert.equal(readDraft(storage,'new-guest'),null);
  values.delete(draftStorageKey('owner'));
  assert.equal(readDraft(storage,'owner',true),'legacy');
  assert.equal(readDraft(storage,'new-guest'),null);
  assert.notEqual(draftStorageKey('a:b'),draftStorageKey('a%3Ab'));
  assert.throws(()=>draftStorageKey(''));
});
