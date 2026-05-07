import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import { motion, useSpring, useTransform, animate } from 'framer-motion'
import { 
  Wallet, 
  ArrowDownCircle, 
  TrendingUp, 
  Plus,
  ArrowRight,
  Info,
  ShieldCheck
} from 'lucide-react'

function Counter({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const controls = animate(displayValue, value, {
      duration: 2,
      onUpdate: (latest) => setDisplayValue(Math.floor(latest))
    })
    return () => controls.stop()
  }, [value])

  return <span>{displayValue.toLocaleString()}</span>
}

export default function Dashboard() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getProfile() {
      if (!user) return
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      if (data) setProfile(data)
      setLoading(false)
    }
    getProfile()
  }, [user])

  const displayName = profile?.full_name || user?.user_metadata?.full_name || 'Investisseur'

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold glow-text">Tableau de bord</h1>
          <p style={{ color: '#64748b' }}>Ravi de vous revoir, {displayName}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Solde Animé */}
            <div className="relative overflow-hidden rounded-3xl p-8 md:p-10" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
              <div className="absolute top-0 right-0 p-10 opacity-10">
                <Wallet className="w-40 h-40 text-white" />
              </div>
              
              <div className="relative">
                <p className="text-white/80 text-sm font-medium mb-2 uppercase tracking-wider">Solde Total</p>
                <div className="flex items-baseline gap-3 mb-8">
                  <h2 className="text-5xl md:text-7xl font-black text-white">
                    {loading ? '0' : <Counter value={profile?.balance || 0} />}
                  </h2>
                  <span className="text-2xl font-bold text-white/90">FCFA</span>
                </div>

                <div className="flex flex-wrap gap-4">
                  <button className="flex-1 min-w-[140px] bg-white text-primary px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-xl shadow-black/10">
                    <Plus className="w-5 h-5" /> Dépôt
                  </button>
                  <button className="flex-1 min-w-[140px] bg-white/10 backdrop-blur-md text-white border border-white/20 px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/20 transition-all">
                    <ArrowDownCircle className="w-5 h-5" /> Retrait
                  </button>
                </div>
              </div>
            </div>

            {/* Note sur le Bonus */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex gap-4">
              <Info className="w-6 h-6 text-amber-500 shrink-0" />
              <p className="text-sm leading-relaxed" style={{ color: '#94a3b8' }}>
                <strong className="text-amber-500">Note sur le bonus :</strong> Votre bonus de bienvenue (500 FCFA) ne pourra être retiré qu'après avoir effectué au moins un dépôt et généré des gains sur la plateforme.
              </p>
            </div>

            <div className="card p-8 border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all cursor-pointer group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="p-4 rounded-2xl bg-primary/20 text-primary">
                    <TrendingUp className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1" style={{ color: '#e2e8f0' }}>Plan d'investissement</h3>
                    <p style={{ color: '#64748b' }}>Consultez vos opportunités actives.</p>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:translate-x-2 transition-transform">
                  <ArrowRight className="w-6 h-6 text-primary" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="font-bold mb-6 flex items-center gap-2" style={{ color: '#e2e8f0' }}>
                <ShieldCheck className="w-5 h-5 text-green-500" /> Sécurité du compte
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                  <span className="text-sm" style={{ color: '#64748b' }}>Vérification</span>
                  <span className="text-xs font-bold px-2 py-1 rounded bg-green-500/20 text-green-500 uppercase">Actif</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                  <span className="text-sm" style={{ color: '#64748b' }}>Protections</span>
                  <span className="text-xs font-bold px-2 py-1 rounded bg-blue-500/20 text-blue-500 uppercase">2FA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
