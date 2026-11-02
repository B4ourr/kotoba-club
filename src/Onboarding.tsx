import { useEffect, useState } from 'react';
import { ArrowRight, BookOpen, Check, ExternalLink, KeyRound, LockKeyhole, Search, Users, Volume2 } from 'lucide-react';
import type { WaniKaniProgress } from './wanikani';

type Props = {
  email: string;
  checkingAccount: boolean;
  progress: WaniKaniProgress | null;
  token: string;
  setToken: (value: string) => void;
  syncing: boolean;
  error: string;
  onSync: () => Promise<void>;
  onFinish: (level: number | null) => void;
};

export default function Onboarding({ email, checkingAccount, progress, token, setToken, syncing, error, onSync, onFinish }: Props) {
  const [step, setStep] = useState(0);
  const [levelMode, setLevelMode] = useState<'beginner' | 'manual' | 'wanikani'>('beginner');
  const [manualLevel, setManualLevel] = useState(1);
  const selectedLevel = progress?.level ?? (levelMode === 'wanikani' ? null : levelMode === 'beginner' ? 1 : manualLevel);
  useEffect(() => { window.scrollTo(0, 0); }, [step]);

  return <div className="welcome-shell">
    <div className="welcome-top"><span className="welcome-mark">言</span><span>KOTOBA CLUB</span><span className="welcome-private"><LockKeyhole size={13}/> Private club</span></div>
    {step === 0 ? <main className="welcome-main">
      <div className="welcome-art" aria-hidden="true"><span>ことば</span><strong>言葉</strong><i>one word at a time</i></div>
      <p className="welcome-kicker">A quiet space to learn together</p>
      <h1>Japanese feels better<br/><em>when it is shared.</em></h1>
      <p className="welcome-lede">Explore useful words, hear how they sound, save what matters, and share discoveries with your private group. Connect WaniKani if you want your level and progress here too.</p>
      <div className="welcome-features"><span><Search size={18}/> Explore words</span><span><Volume2 size={18}/> Hear Japanese</span><span><Users size={18}/> Learn together</span></div>
      <button className="btn-primary welcome-primary" onClick={() => setStep(1)}>Get started <ArrowRight size={19}/></button>
      <p className="welcome-footnote">About 2 minutes · WaniKani is optional</p>
    </main> : <main className="welcome-main setup-main">
      <div className="setup-progress" aria-label={`Step ${step} of 3`}><span className={step >= 1 ? 'current' : ''}/><span className={step >= 2 ? 'current' : ''}/><span className={step >= 3 ? 'current' : ''}/></div>
      <p className="welcome-kicker">Step {step} of 3</p>
      {step === 1 ? <>
        <div className="setup-icon"><LockKeyhole size={26}/></div><h1>Your own place<br/><em>in the club.</em></h1>
        <p className="welcome-lede">ChatGPT sign-in keeps your groups and shared words tied to your account. Kotoba Club does not need your WaniKani password.</p>
        {email ? <div className="setup-account"><Check size={19}/><div><strong>Signed in with ChatGPT</strong><small>{email}</small></div></div> : <div className="setup-account waiting"><LockKeyhole size={19}/><div><strong>{checkingAccount ? 'Checking your sign-in…' : 'Sign in to continue'}</strong><small>{checkingAccount ? 'This should only take a moment.' : 'Use your ChatGPT account to access this private club.'}</small></div></div>}
        {!email && !checkingAccount && <a className="btn-primary welcome-primary" href={`/signin-with-chatgpt?return_to=${encodeURIComponent(location.pathname + location.search)}`} target="_top">Sign in with ChatGPT <ArrowRight size={19}/></a>}
        <button className="btn-primary welcome-primary" onClick={() => setStep(2)} disabled={!email}>Continue <ArrowRight size={19}/></button>
      </> : step === 2 ? <>
        <div className="setup-icon"><BookOpen size={26}/></div><h1>Where are you<br/><em>starting from?</em></h1>
        <p className="welcome-lede">Pick a starting point. If you connect WaniKani next, its actual level will take priority automatically. You can change this later.</p>
        <div className="level-options">
          <button aria-pressed={levelMode === 'beginner'} className={levelMode === 'beginner' ? 'chosen' : ''} onClick={() => setLevelMode('beginner')}><span className="level-emoji">あ</span><span><strong>Just starting</strong><small>Begin at level 1</small></span>{levelMode === 'beginner' && <Check size={19}/>}</button>
          <button aria-pressed={levelMode === 'manual'} className={levelMode === 'manual' ? 'chosen' : ''} onClick={() => setLevelMode('manual')}><span className="level-emoji">漢</span><span><strong>Choose my level</strong><small>I already know some Japanese</small></span>{levelMode === 'manual' && <Check size={19}/>}</button>
          <button aria-pressed={levelMode === 'wanikani'} className={levelMode === 'wanikani' ? 'chosen' : ''} onClick={() => setLevelMode('wanikani')}><span className="level-emoji">亀</span><span><strong>Use WaniKani</strong><small>Set my level after syncing</small></span>{levelMode === 'wanikani' && <Check size={19}/>}</button>
        </div>
        {levelMode === 'manual' && <label className="manual-level">Your starting level <input type="number" min="1" max="60" inputMode="numeric" value={manualLevel} onChange={e => setManualLevel(Math.max(1, Math.min(60, Number(e.target.value) || 1)))}/><small>Level 1–60. This is your preference, not a WaniKani result.</small></label>}
        <button className="btn-primary welcome-primary" onClick={() => setStep(3)}>Continue <ArrowRight size={19}/></button>
      </> : <>
        <div className="setup-icon"><KeyRound size={26}/></div><h1>Bring your progress<br/><em>along for the ride.</em></h1>
        <p className="welcome-lede">WaniKani is optional. A personal read-only API token lets this browser fetch your level and progress; it cannot change your WaniKani account.</p>
        <ol className="token-steps"><li>Open WaniKani <strong>Settings → API Tokens</strong>.</li><li>Use an existing read-only token, or create a new personal token named “Kotoba Club”. Leave all write permissions off.</li><li>Copy the token and paste it below. Never share your WaniKani password.</li></ol>
        <a className="wanikani-link" href="https://www.wanikani.com/settings/personal_access_tokens" target="_blank" rel="noopener noreferrer">Open WaniKani API Tokens <ExternalLink size={16}/></a>
        {progress ? <div className="setup-account"><Check size={19}/><div><strong>{progress.username} · WaniKani level {progress.level}</strong><small>Level detected automatically. Your token remains only in this tab.</small></div></div> : <div className="token-field"><label htmlFor="onboarding-token">Read-only API token</label><input id="onboarding-token" type="password" autoComplete="off" spellCheck={false} value={token} onChange={e => setToken(e.target.value.trim())} placeholder="Paste your personal token"/><button className="btn-secondary" onClick={() => void onSync()} disabled={!token || syncing}>{syncing ? 'Connecting…' : 'Connect WaniKani'}</button>{error && <p className="error" role="alert">{error}</p>}</div>}
        <p className="token-privacy">Your token is held in memory for this visit and sent directly to WaniKani. A progress summary and assignment cache stay on this device. Sharing progress with a group is a separate choice.</p>
        <button className="btn-primary welcome-primary" onClick={() => onFinish(selectedLevel)}>{progress ? 'Enter Kotoba Club' : 'Continue to Kotoba Club'} <ArrowRight size={19}/></button>
        {!progress && <p className="welcome-footnote">You can connect WaniKani later from your profile.</p>}
      </>}
      <button className="setup-back" onClick={() => setStep(step - 1)}>← Back</button>
    </main>}
  </div>;
}
