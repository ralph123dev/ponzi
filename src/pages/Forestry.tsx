import { Link } from 'react-router-dom'
import { Trees, ArrowRight, Shield, Globe, Zap, Sun } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Forestry() {
  const { user } = useAuth()

  const benefits = [
    { title: 'Valorisation Carbone', desc: 'Générez des revenus grâce aux crédits carbone issus de la séquestration par vos forêts.', icon: Zap, color: '#3b82f6' },
    { title: 'Gestion Durable', desc: 'Exploitation responsable certifiée par les plus hauts standards environnementaux.', icon: Trees, color: '#10b981' },
    { title: 'Actif Réel', desc: 'Investissez dans le bois, une ressource renouvelable dont la demande mondiale ne cesse de croître.', icon: Shield, color: '#f59e0b' },
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full" style={{ background: 'rgba(16,185,129,0.1)', filter: 'blur(120px)' }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm mb-8" style={{ color: '#10b981' }}>
            <Sun className="w-4 h-4" /> Investissement Écologique
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 glow-text">Programmes Forestiers</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10" style={{ color: '#64748b' }}>
            Investissement dans la gestion durable de forêts certifiées, avec valorisation carbone. Participez à la lutte contre le changement climatique tout en valorisant votre capital.
          </p>
          <Link to={user ? "/dashboard" : "/register"} className="btn btn-primary px-10 py-4 text-lg gap-2">
            {user ? "Accéder au tableau de bord" : "Investir dans les forêts"} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, i) => (
            <div key={i} className="card">
              <benefit.icon className="w-10 h-10 mb-4" style={{ color: benefit.color }} />
              <h3 className="text-xl font-bold mb-3" style={{ color: '#e2e8f0' }}>{benefit.title}</h3>
              <p style={{ color: '#64748b' }}>{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center">
        <div className="card max-w-4xl mx-auto p-12">
          <Globe className="w-16 h-16 mx-auto mb-6" style={{ color: '#10b981' }} />
          <h2 className="text-3xl font-bold mb-6" style={{ color: '#e2e8f0' }}>Un avenir plus vert et rentable</h2>
          <p className="mb-10" style={{ color: '#64748b' }}>
            Crypto Invest vous permet d'accéder au marché fermé des actifs forestiers avec une transparence totale et une liquidité optimisée.
          </p>
          <Link to={user ? "/dashboard" : "/register"} className="btn btn-primary px-10 py-4">
            {user ? "Accéder au tableau de bord" : "Créer mon compte"}
          </Link>
        </div>
      </section>
    </div>
  )
}
