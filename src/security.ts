export type Membership = { group_id: string; user_email: string; role: 'owner'|'member' };
export function canAccessGroup(memberships: Membership[], authenticatedEmail: string, requestedGroupId: string): boolean {
  if (!authenticatedEmail || !requestedGroupId) return false;
  return memberships.some(m => m.user_email.toLowerCase() === authenticatedEmail.toLowerCase() && m.group_id === requestedGroupId);
}
export function validateShareText(value: unknown): string {
  if (typeof value !== 'string') throw new Error('Text must be a string');
  const clean=value.trim();
  if (!clean || clean.length > 240) throw new Error('Text must contain 1–240 characters');
  return clean;
}
export function validateWaniKaniToken(value: unknown): string {
  if (typeof value !== 'string' || value.length < 20 || value.length > 256 || !/^[a-f0-9-]+$/i.test(value)) throw new Error('Enter a valid WaniKani API token');
  return value;
}
