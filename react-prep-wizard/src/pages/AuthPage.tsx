import { useState } from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { Sparkles, Lock, Mail, AlertTriangle } from 'lucide-react';
import { request, ApiError } from '../lib/apiError';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [requestId, setRequestId] = useState<string | undefined>();
  const [submitting, setSubmitting] = useState(false);
  const { user, login } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});
    setRequestId(undefined);
    setSubmitting(true);

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    try {
      const data = await request<{ token: string; user: { id: number; email: string } }>(endpoint, {
        method: 'POST',
        auth: false,
        body: JSON.stringify({ email, password }),
      });
      login(data.token, data.user);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
        // 422 carries per-field messages; show them under their own inputs.
        if (err.fields) setFieldErrors(err.fields);
        // Only worth quoting for failures an operator would have to look up.
        if (err.status >= 500 || err.status === 0) setRequestId(err.requestId);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-slate-950 p-4">
      <div className="bg-slate-900/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-sm border border-slate-800 text-slate-100 space-y-6">
        <div className="text-center space-y-1">
          <div className="w-10 h-10 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/40 flex items-center justify-center mx-auto mb-2 shadow-xs">
            <Sparkles size={20} />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-white">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-xs text-slate-400">React 19 Interview Mastery Cockpit</p>
        </div>
        
        {error && (
          <div role="alert" className="p-3 bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs rounded-xl space-y-1">
            <span className="flex items-start gap-1.5">
              <AlertTriangle size={13} className="mt-px shrink-0" />
              <span>{error}</span>
            </span>
            {requestId && (
              <span className="block pl-5 font-mono text-[10px] text-rose-400/70">
                Reference: {requestId}
              </span>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="auth-email" className="block text-xs font-semibold text-slate-300">Email</label>
            <div className="relative">
              <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input 
                id="auth-email"
                name="email"
                type="email" 
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                className={`w-full pl-9 pr-3 py-2 bg-slate-950 border rounded-xl focus:outline-none text-xs text-slate-200 ${
                  fieldErrors.email ? 'border-rose-500/70 focus:border-rose-400' : 'border-slate-700/80 focus:border-sky-500'
                }`}
              />
            </div>
            {fieldErrors.email && (
              <p id="email-error" className="text-[11px] text-rose-400">{fieldErrors.email}</p>
            )}
          </div>
          <div className="space-y-1">
            <label htmlFor="auth-password" className="block text-xs font-semibold text-slate-300">Password</label>
            <div className="relative">
              <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input 
                id="auth-password"
                name="password"
                autoComplete={isLogin ? 'current-password' : 'new-password'}
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={Boolean(fieldErrors.password)}
                aria-describedby={fieldErrors.password ? 'password-error' : undefined}
                className={`w-full pl-9 pr-3 py-2 bg-slate-950 border rounded-xl focus:outline-none text-xs text-slate-200 ${
                  fieldErrors.password ? 'border-rose-500/70 focus:border-rose-400' : 'border-slate-700/80 focus:border-sky-500'
                }`}
              />
            </div>
            {fieldErrors.password && (
              <p id="password-error" className="text-[11px] text-rose-400">{fieldErrors.password}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-sky-600 hover:bg-sky-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold py-2.5 rounded-xl transition cursor-pointer shadow-lg text-xs"
          >
            {submitting ? 'Working…' : isLogin ? 'Sign In' : 'Register'}
          </button>
        </form>

        <div className="text-center text-xs text-slate-400">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-sky-400 font-bold hover:underline cursor-pointer"
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </div>
      </div>
    </div>
  );
}
