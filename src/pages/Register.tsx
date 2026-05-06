import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Check } from 'lucide-react'

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [accepted, setAccepted] = useState(false)

  const checks = [
    { label: 'Au moins 8 caractères', ok: password.length >= 8 },
    { label: 'Une majuscule', ok: /[A-Z]/.test(password) },
    { label: 'Un chiffre', ok: /[0-9]/.test(password) },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
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

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#64748b' }}>Nom complet</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#64748b' }} />
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input pl-12" placeholder="Jean Dupont" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#64748b' }}>Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#64748b' }} />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input pl-12" placeholder="votre@email.com" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#64748b' }}>Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#64748b' }} />
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="input pl-12 pr-12" placeholder="••••••••" required />
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
              <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} className="mt-1 w-4 h-4 rounded" style={{ accentColor: '#6366f1' }} />
              <span className="text-xs leading-relaxed" style={{ color: '#64748b' }}>
                J'accepte les <a href="#" style={{ color: '#6366f1' }}>conditions d'utilisation</a> et la <a href="#" style={{ color: '#6366f1' }}>politique de confidentialité</a>
              </span>
            </label>

            <button type="submit" disabled={!accepted} className="btn btn-primary w-full py-4 text-base flex items-center justify-center gap-2 group">
              Créer mon compte
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px" style={{ background: '#1e293b' }} />
            <span className="text-xs" style={{ color: '#64748b' }}>OU</span>
            <div className="flex-1 h-px" style={{ background: '#1e293b' }} />
          </div>

          <button className="w-full py-3 px-4 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-3" style={{ border: '1px solid #1e293b', background: 'rgba(30,41,59,0.5)', color: '#e2e8f0' }}>
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
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
