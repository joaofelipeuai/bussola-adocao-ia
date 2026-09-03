const PREFIX = 'bussola-ai-adoption-v2';

export function draftStorageKey(userId) {
  if (typeof userId !== 'string' || !userId.trim()) throw new Error('Usuário autenticado obrigatório.');
  return PREFIX + ':user:' + encodeURIComponent(userId);
}

export function readDraft(storage, userId, allowLegacy = false) {
  const current = storage.getItem(draftStorageKey(userId));
  if (current !== null) return current;
  // Only the original owner may migrate the unscoped draft from before login.
  return allowLegacy ? storage.getItem(PREFIX) ?? storage.getItem('bussola-ai-adoption-v1') : null;
}
