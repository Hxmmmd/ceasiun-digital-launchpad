// Standard local storage authentication provider for client-side Supabase sessions.
export function brokeredPreviewStorage() {
  if (typeof window === "undefined") return undefined;
  return localStorage;
}
