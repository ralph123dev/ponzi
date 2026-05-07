import { Link } from 'react-router-dom'
import { Coins, ArrowRight, Landmark, Lock, Package } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function PreciousMetals() {
  const { user } = useAuth()

  const metals = [
    { name: 'Or', symbol: 'AU', desc: 'Le roi des métaux précieux, l\'assurance ultime.', icon: Landmark, color: '#FFD700' },
    { name: 'Argent', symbol: 'AG', desc: 'Métal industriel et réserve de valeur.', icon: Package, color: '#C0C0C0' },
    { name: 'Platine', symbol: 'PT', desc: 'Rare et précieux, pilier de l\'industrie verte.', icon: Lock, color: '#E5E4E2' },
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full" style={{ background: 'rgba(255,215,0,0.05)', filter: 'blur(120px)' }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm mb-8" style={{ color: '#FFD700' }}>
            <Coins className="w-4 h-4" /> Valeurs Refuges
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 glow-text">Métaux Précieux</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10" style={{ color: '#64748b' }}>
            Or, argent, platine — sécurisez votre patrimoine avec les actifs les plus stables de l'histoire. Profitez d'un stockage ultra-sécurisé ou d'une livraison physique.
          </p>
          <Link to={user ? "/dashboard" : "/register"} className="btn btn-primary px-10 py-4 text-lg gap-2">
            {user ? "Accéder au tableau de bord" : "Acheter des métaux"} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Metals List */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {metals.map((metal, i) => (
            <div key={i} className="card group hover:scale-[1.02] transition-all duration-300">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: metal.color + '20' }}>
                <metal.icon className="w-7 h-7" style={{ color: metal.color }} />
              </div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold" style={{ color: '#e2e8f0' }}>{metal.name}</h3>
                <span className="text-xs font-mono px-2 py-1 rounded bg-white/5" style={{ color: metal.color }}>{metal.symbol}</span>
              </div>
              <p style={{ color: '#64748b' }}>{metal.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="card border-primary/20">
            <h3 className="text-xl font-bold mb-4 text-white">Stockage Sécurisé</h3>
            <p className="mb-6" style={{ color: '#64748b' }}>Vos métaux sont conservés dans des coffres-forts haute sécurité (LBMA) en Suisse et à Singapour, assurés à 100%.</p>
            <ul className="space-y-3">
              {['Audits réguliers', 'Assurance complète', 'Sortie physique possible'].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm" style={{ color: '#e2e8f0' }}>
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="card border-primary/20">
            <h3 className="text-xl font-bold mb-4 text-white">Livraison Physique</h3>
            <p className="mb-6" style={{ color: '#64748b' }}>Faites-vous livrer vos pièces ou lingots directement chez vous via un transporteur sécurisé et discret.</p>
            <ul className="space-y-3">
              {['Emballage discret', 'Livraison contre signature', 'Suivi en temps réel'].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm" style={{ color: '#e2e8f0' }}>
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center">
        <div className="card max-w-4xl mx-auto p-12">
          <h2 className="text-3xl font-bold mb-6 text-white">Protégez votre capital dès aujourd'hui</h2>
          <p className="mb-10 max-w-xl mx-auto" style={{ color: '#64748b' }}>
            Face à l'incertitude économique, les métaux précieux restent le rempart le plus solide.
          </p>
          <Link to={user ? "/dashboard" : "/register"} className="btn btn-primary px-10 py-4">
            {user ? "Accéder au tableau de bord" : "Créer mon compte"}
          </Link>
        </div>
      </section>
    </div>
  )
}
