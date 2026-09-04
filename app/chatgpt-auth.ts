import 'server-only';
import {headers} from 'next/headers';
import {identityFromHeaders, hasSiteAccess} from '@/lib/access-policy.mjs';

// This allowlist stays on the server and is never passed to the browser.
const OWNER_EMAIL = 'joaofelipeaps@gmail.com';
const ALLOWED_EMAILS = [OWNER_EMAIL, 'antonio.eduardo@uol.com.br', 'mayconstallony@gmail.com'];

export async function getChatGPTUser() {
  return identityFromHeaders(await headers());
}

export function canAccessWizard(user: {id: string; email: string} | null) {
  return hasSiteAccess(user, ALLOWED_EMAILS);
}

export function canMigrateLegacyDraft(user: {email: string}) {
  return user.email === OWNER_EMAIL;
}

export function chatGPTSignInPath(returnTo: '/' | '/wizard' | '/wizard?start=1' = '/') {
  return '/signin-with-chatgpt?return_to=' + encodeURIComponent(returnTo);
}
