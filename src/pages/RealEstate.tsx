import { Link } from 'react-router-dom'
import { Building2, ArrowRight, Shield, TrendingUp, BarChart3, Home, Building } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function RealEstate() {
  const { user } = useAuth()

  const properties = [
    { name: 'Résidentiel Urbain', desc: 'Appartements haut de gamme dans les grandes métropoles.', icon: Home, color: '#6366f1' },
    { name: 'Commercial', desc: 'Bureaux et espaces de coworking à fort rendement.', icon: Building, color: '#8b5cf6' },
    { name: 'Logistique', desc: 'Entrepôts stratégiques pour l\'e-commerce.', icon: Building2, color: '#ec4899' },
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full" style={{ background: 'rgba(99,102,241,0.1)', filter: 'blur(120px)' }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm mb-8" style={{ color: '#8b5cf6' }}>
            <Building2 className="w-4 h-4" /> Immobilier 2.0
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 glow-text">Immobilier Fractionné</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10" style={{ color: '#64748b' }}>
            Devenez copropriétaire de biens immobiliers prestigieux. Recevez des revenus locatifs proportionnels à vos parts, sans les contraintes de gestion.
          </p>
          <Link to={user ? "/dashboard" : "/register"} className="btn btn-primary px-10 py-4 text-lg gap-2">
            {user ? "Accéder au tableau de bord" : "Voir les opportunités"} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {properties.map((prop, i) => (
            <div key={i} className="card group hover:scale-[1.02] transition-all duration-300">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: prop.color + '20' }}>
                <prop.icon className="w-7 h-7" style={{ color: prop.color }} />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#e2e8f0' }}>{prop.name}</h3>
              <p style={{ color: '#64748b' }}>{prop.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card border-none bg-transparent">
            <TrendingUp className="w-10 h-10 mb-4 text-primary" />
            <h3 className="text-xl font-bold mb-3 text-white">Revenus Passifs</h3>
            <p style={{ color: '#64748b' }}>Les loyers sont collectés et distribués automatiquement chaque mois sur votre compte.</p>
          </div>
          <div className="card border-none bg-transparent">
            <Shield className="w-10 h-10 mb-4 text-primary" />
            <h3 className="text-xl font-bold mb-3 text-white">Gestion Déléguée</h3>
            <p style={{ color: '#64748b' }}>Nous nous occupons de tout : de la sélection des biens à la maintenance et la relation locataire.</p>
          </div>
          <div className="card border-none bg-transparent">
            <BarChart3 className="w-10 h-10 mb-4 text-primary" />
            <h3 className="text-xl font-bold mb-3 text-white">Liquidité Accrue</h3>
            <p style={{ color: '#64748b' }}>Revendez vos parts à tout moment sur notre marché secondaire en quelques clics.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center">
        <div className="card max-w-4xl mx-auto p-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
          <h2 className="text-3xl font-bold mb-6 text-white">Commencez avec seulement 50€</h2>
          <p className="mb-10 max-w-xl mx-auto" style={{ color: '#64748b' }}>
            L'immobilier n'a jamais été aussi accessible. Diversifiez votre patrimoine dès aujourd'hui.
          </p>
          <Link to={user ? "/dashboard" : "/register"} className="btn btn-primary px-10 py-4">
            {user ? "Accéder au tableau de bord" : "Investir maintenant"}
          </Link>
        </div>
      </section>
    </div>
  )
}
