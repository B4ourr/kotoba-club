export type WaniKaniProgress={username:string;level:number;radicals:number;kanji:number;vocabulary:number;radicalsTotal:number;kanjiTotal:number;vocabularyTotal:number;lastSynced:string};
type Assignment={id:number;subject_type:'radical'|'kanji'|'vocabulary';srs_stage:number;updated_at:string};
type Cache={username:string;lastSynced:string;assignments:Assignment[]};
const CACHE='kotoba-wk-assignments-v1';
export function validateToken(token:string){if(token.length<20||token.length>256||!/^[a-f0-9-]+$/i.test(token))throw new Error('Enter a valid WaniKani API token');}
export async function syncWaniKani(token:string,fetcher:typeof fetch=fetch,storage:Storage|undefined=typeof localStorage!=='undefined'?localStorage:undefined):Promise<WaniKaniProgress>{
 validateToken(token);
 const headers={Authorization:`Bearer ${token}`,'Wanikani-Revision':'20170710'};
 const request=async(url:string)=>{const r=await fetcher(url,{headers});if(r.status===429)throw new Error('WaniKani rate limit reached. Try again shortly.');if(!r.ok)throw new Error(r.status===401?'That API token was not accepted.':'Could not reach WaniKani. Please try again.');return r.json()};
 const user=await request('https://api.wanikani.com/v2/user');
 let cache:Cache|null=null;try{cache=storage?JSON.parse(storage.getItem(CACHE)||'null'):null}catch{}
 const since=cache?.lastSynced?new Date(Date.parse(cache.lastSynced)-60_000).toISOString():null;
 const query=new URLSearchParams({subject_types:'radical,kanji,vocabulary'});if(since)query.set('updated_after',since);
 const changed:Assignment[]=[];let page=await request(`https://api.wanikani.com/v2/assignments?${query}`),pages=0;
 while(true){changed.push(...(page.data as Assignment[]));const next=page.pages?.next_url;if(!next)break;if(pages++>=200)throw new Error('Assignment history is larger than this sync limit. Contact support or try a full sync later.');page=await request(next)}
 const assignments=new Map<number,Assignment>((cache?.assignments||[]).map(a=>[a.id,a]));for(const a of changed)assignments.set(a.id,a);
 const rows=[...assignments.values()];const count=(kind:Assignment['subject_type'])=>rows.filter(a=>a.subject_type===kind&&a.srs_stage>0).length;const total=(kind:Assignment['subject_type'])=>rows.filter(a=>a.subject_type===kind).length;
 const now=new Date().toISOString(),next:Cache={username:user.data.username,lastSynced:now,assignments:rows};
 try{storage?.setItem(CACHE,JSON.stringify(next))}catch{}
 return {username:user.data.username,level:user.data.level,radicals:count('radical'),kanji:count('kanji'),vocabulary:count('vocabulary'),radicalsTotal:total('radical'),kanjiTotal:total('kanji'),vocabularyTotal:total('vocabulary'),lastSynced:now};
}
export function clearWaniKaniCache(storage:Storage|undefined=typeof localStorage!=='undefined'?localStorage:undefined){storage?.removeItem(CACHE)}
