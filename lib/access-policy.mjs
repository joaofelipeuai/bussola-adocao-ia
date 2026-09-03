// Called only by server code; identity must come from the Sites dispatcher.
export function identityFromHeaders(headers) {
  const id = headers.get('oai-authenticated-user-id')?.trim();
  const email = headers.get('oai-authenticated-user-email')?.trim().toLowerCase();
  if (!id || !email || !/^[^\s,@]+@[^\s,@]+\.[^\s,@]+$/.test(email)) return null;
  return {id, email};
}

export function hasSiteAccess(user, allowedEmails) {
  return Boolean(user?.id && user?.email && allowedEmails.includes(user.email));
}
