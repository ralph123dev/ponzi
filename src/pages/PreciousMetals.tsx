import { Link } from 'react-router-dom'
import { Coins, ArrowRight, Shield, BarChart3, Landmark, Lock, Package } from 'lucide-react'

export default function PreciousMetals() {
  const metals = [
    { name: 'Or', symbol: 'AU', desc: 'La valeur refuge ultime depuis des millénaires.', color: '#f59e0b' },
    { name: 'Argent', symbol: 'AG', desc: 'Métal industriel et d\'investissement à fort potentiel.', color: '#94a3b8' },
    { name: 'Platine', symbol: 'PT', desc: 'Rare et précieux, essentiel pour les technologies futures.', color: '#e2e8f0' },
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full" style={{ background: 'rgba(245,158,11,0.1)', filter: 'blur(120px)' }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm mb-8" style={{ color: '#f59e0b' }}>
            <Coins className="w-4 h-4" /> Valeurs Refuges
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 glow-text">Métaux Précieux</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10" style={{ color: '#64748b' }}>
            Or, argent, platine — valeurs refuges classiques avec stockage sécurisé ou livraison. Protégez votre patrimoine contre l'instabilité économique.
          </p>
          <Link to="/register" className="btn btn-primary px-10 py-4 text-lg gap-2">
            Acheter des métaux <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Metals List */}
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {metals.map((metal, i) => (
            <div key={i} className="card group hover:scale-[1.02] transition-all">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ background: metal.color + '20' }}>
                <div className="text-xl font-black" style={{ color: metal.color }}>{metal.symbol}</div>
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#e2e8f0' }}>{metal.name}</h3>
              <p style={{ color: '#64748b' }}>{metal.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Storage options */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="card flex items-start gap-6">
            <Lock className="w-12 h-12 shrink-0" style={{ color: '#f59e0b' }} />
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#e2e8f0' }}>Stockage Sécurisé</h3>
              <p style={{ color: '#64748b' }}>Vos métaux sont stockés dans des coffres-forts haute sécurité hors système bancaire, assurés à 100% de leur valeur de remplacement.</p>
            </div>
          </div>
          <div className="card flex items-start gap-6">
            <Package className="w-12 h-12 shrink-0" style={{ color: '#6366f1' }} />
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#e2e8f0' }}>Livraison à Domicile</h3>
              <p style={{ color: '#64748b' }}>Faites-vous livrer vos lingots et pièces directement chez vous via un transporteur sécurisé et discret.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center">
        <div className="card max-w-4xl mx-auto p-12">
          <Landmark className="w-16 h-16 mx-auto mb-6" style={{ color: '#f59e0b' }} />
          <h2 className="text-3xl font-bold mb-6" style={{ color: '#e2e8f0' }}>L'épargne la plus solide au monde</h2>
          <p className="mb-10" style={{ color: '#64748b' }}>
            Transformez votre monnaie fiduciaire ou vos cryptos en actifs tangibles en quelques clics.
          </p>
          <Link to="/register" className="btn btn-primary px-10 py-4">Ouvrir un compte métaux</Link>
        </div>
      </section>
    </div>
  )
}
