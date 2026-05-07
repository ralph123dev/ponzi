import { Link } from 'react-router-dom'
import { Leaf, ArrowRight, Shield, TrendingUp, BarChart3, Globe, Coffee, Wheat, Droplets } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Agriculture() {
  const { user } = useAuth()
  
  const assets = [
    { name: 'Café', desc: 'Marché mondial du café Arabica et Robusta.', icon: Coffee, color: '#964B00' },
    { name: 'Cacao', desc: 'Investissez dans la production de cacao premium.', icon: Droplets, color: '#3d1c02' },
    { name: 'Blé', desc: 'Denrée de base essentielle aux marchés globaux.', icon: Wheat, color: '#f5deb3' },
    { name: 'Maïs', desc: 'Actif majeur lié aux commodités mondiales.', icon: Leaf, color: '#FBEC5D' },
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
            <Leaf className="w-4 h-4" /> Nouvelle Opportunité
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 glow-text">Matières Premières Agricoles</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10" style={{ color: '#64748b' }}>
            Café, cacao, blé, maïs — investissez dans des actifs réels liés aux marchés mondiaux des commodités. Soutenez l'agriculture durable tout en générant des rendements stables.
          </p>
          <Link to={user ? "/dashboard" : "/register"} className="btn btn-primary px-10 py-4 text-lg gap-2">
            {user ? "Accéder au tableau de bord" : "Commencer à investir"} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Grid of Commodities */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {assets.map((asset) => (
            <div key={asset.name} className="card group hover:scale-[1.02] transition-all duration-300">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: asset.color + '20' }}>
                <asset.icon className="w-7 h-7" style={{ color: asset.color }} />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#e2e8f0' }}>{asset.name}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{asset.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card">
            <TrendingUp className="w-10 h-10 mb-4" style={{ color: '#10b981' }} />
            <h3 className="text-xl font-bold mb-3" style={{ color: '#e2e8f0' }}>Rendements Stables</h3>
            <p style={{ color: '#64748b' }}>Les produits agricoles offrent une protection contre l'inflation et une volatilité moindre par rapport aux marchés financiers classiques.</p>
          </div>
          <div className="card">
            <Shield className="w-10 h-10 mb-4" style={{ color: '#10b981' }} />
            <h3 className="text-xl font-bold mb-3" style={{ color: '#e2e8f0' }}>Actifs Tangibles</h3>
            <p style={{ color: '#64748b' }}>Investissez dans des stocks physiques et des denrées essentielles à la consommation mondiale.</p>
          </div>
          <div className="card">
            <Globe className="w-10 h-10 mb-4" style={{ color: '#10b981' }} />
            <h3 className="text-xl font-bold mb-3" style={{ color: '#e2e8f0' }}>Impact Global</h3>
            <p style={{ color: '#64748b' }}>Favorisez le développement des infrastructures agricoles dans les zones à fort potentiel de croissance.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 text-center">
        <div className="card max-w-4xl mx-auto p-12">
          <BarChart3 className="w-16 h-16 mx-auto mb-6" style={{ color: '#6366f1' }} />
          <h2 className="text-3xl font-bold mb-6" style={{ color: '#e2e8f0' }}>Prêt à diversifier ?</h2>
          <p className="mb-10" style={{ color: '#64748b' }}>
            Rejoignez Crypto Invest et accédez à des marchés auparavant réservés aux institutionnels.
          </p>
          <Link to={user ? "/dashboard" : "/register"} className="btn btn-primary px-10 py-4">
            {user ? "Accéder au tableau de bord" : "Créer mon compte"}
          </Link>
        </div>
      </section>
    </div>
  )
}
