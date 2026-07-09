import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Check, AlertCircle, Loader2 } from 'lucide-react'
import { supabase, supabaseConfigured } from '../lib/supabase'
import googleLogo from '../assets/img/google.jpg'

declare global {
  interface Window {
    google?: any
  }
}

export default function Register() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [accepted, setAccepted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  

  const checks = [
    { label: 'Au moins 8 caractères', ok: password.length >= 8 },
    { label: 'Une majuscule', ok: /[A-Z]/.test(password) },
    { label: 'Un chiffre', ok: /[0-9]/.test(password) },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!accepted) return
    if (!supabaseConfigured) {
      setError("Backend non configuré : ajoutez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY dans .env")
      return
    }
    
    setLoading(true)
    setError(null)

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      })

      if (signUpError) throw signUpError

      if (data.user) {
        navigate('/')
      }
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue lors de l'inscription")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    setError('Connexion par Google pas encore disponible')
  }

  

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-10 px-4 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full" style={{ background: 'rgba(139,92,246,0.12)', filter: 'blur(120px)' }} />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full" style={{ background: 'rgba(99,102,241,0.12)', filter: 'blur(100px)' }} />
      </div>

      <div className="relative w-full max-w-md">
        <div className="card p-8 sm:p-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2" style={{ color: '#e2e8f0' }}>Créer un compte</h1>
            <p style={{ color: '#64748b' }}>Commencez à investir en 2 minutes</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-500 text-sm animate-slide-up">
              <AlertCircle className="w-5 h-5 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#64748b' }}>Nom complet</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#64748b' }} />
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input pl-12" placeholder="Jean Dupont" required disabled={loading} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#64748b' }}>Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#64748b' }} />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input pl-12" placeholder="votre@email.com" required disabled={loading} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#64748b' }}>Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#64748b' }} />
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="input pl-12 pr-12" placeholder="••••••••" required disabled={loading} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors" style={{ color: '#64748b' }}>
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {password.length > 0 && (
                <div className="mt-3 space-y-1.5">
                  {checks.map((c) => (
                    <div key={c.label} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: c.ok ? '#10b981' : '#1e293b' }}>
                        {c.ok && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-xs" style={{ color: c.ok ? '#10b981' : '#64748b' }}>{c.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} className="mt-1 w-4 h-4 rounded" style={{ accentColor: '#6366f1' }} disabled={loading} />
              <span className="text-xs leading-relaxed" style={{ color: '#64748b' }}>
                J'accepte les <a href="#" style={{ color: '#6366f1' }}>conditions d'utilisation</a> et la <a href="#" style={{ color: '#6366f1' }}>politique de confidentialité</a>
              </span>
            </label>

            <button type="submit" disabled={!accepted || loading} className="btn btn-primary w-full py-4 text-base flex items-center justify-center gap-2 group">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Créer mon compte'}
              {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px" style={{ background: '#1e293b' }} />
            <span className="text-xs" style={{ color: '#64748b' }}>OU</span>
            <div className="flex-1 h-px" style={{ background: '#1e293b' }} />
          </div>

          <button onClick={handleGoogleLogin} disabled={loading} className="w-full py-3 px-4 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-3" style={{ border: '1px solid #1e293b', background: 'rgba(30,41,59,0.5)', color: '#e2e8f0' }}>
            <img src={googleLogo} alt="Google logo" className="w-5 h-5 rounded-full object-cover" />
            Continuer avec Google
          </button>

          <p className="text-center text-sm mt-8" style={{ color: '#64748b' }}>
            Déjà un compte ?{' '}
            <Link to="/login" className="font-medium transition-colors" style={{ color: '#6366f1' }}>Se connecter</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
