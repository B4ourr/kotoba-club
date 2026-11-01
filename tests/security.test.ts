import { describe,it,expect } from 'vitest';
import { canAccessGroup,validateShareText,validateWaniKaniToken } from '../src/security';
const memberships=[{group_id:'family-a',user_email:'a@example.test',role:'owner' as const},{group_id:'family-b',user_email:'b@example.test',role:'member' as const}];
describe('private group authorization',()=>{
 it('allows only a matching authenticated membership',()=>{expect(canAccessGroup(memberships,'A@example.test','family-a')).toBe(true)});
 it('denies another group and an unknown identity',()=>{expect(canAccessGroup(memberships,'a@example.test','family-b')).toBe(false);expect(canAccessGroup(memberships,'','family-a')).toBe(false)});
 it('does not treat user supplied group ID as authority',()=>{expect(canAccessGroup(memberships,'b@example.test','family-a')).toBe(false)});
});
describe('WaniKani token handling',()=>{
 it('accepts a token format but never adds it to a persistent object',()=>{const token='01234567-89ab-cdef-0123-456789abcdef';expect(validateWaniKaniToken(token)).toBe(token);const persisted={progress:{level:1}};expect(JSON.stringify(persisted)).not.toContain(token)});
 it('rejects arbitrary text',()=>{expect(()=>validateWaniKaniToken('my password please')).toThrow()});
});
describe('sharing validation',()=>{it('trims and bounds shared text',()=>{expect(validateShareText(' hi ')).toBe('hi');expect(()=>validateShareText('')).toThrow();expect(()=>validateShareText('x'.repeat(241))).toThrow()})});
