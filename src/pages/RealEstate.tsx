import { Link } from 'react-router-dom'
import { Building2, ArrowRight, Shield, PieChart, Landmark, Key, Home, Building } from 'lucide-react'

export default function RealEstate() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full" style={{ background: 'rgba(99,102,241,0.1)', filter: 'blur(120px)' }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm mb-8" style={{ color: '#6366f1' }}>
            <Building2 className="w-4 h-4" /> Investissement de Demain
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 glow-text">Immobilier Fractionné</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10" style={{ color: '#64748b' }}>
            Achetez des parts dans des biens immobiliers résidentiels ou commerciaux et percevez des revenus locatifs proportionnels. L'immobilier de prestige accessible dès 50€.
          </p>
          <Link to="/register" className="btn btn-primary px-10 py-4 text-lg gap-2">
            Investir dans la pierre <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Asset Types */}
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center shrink-0" style={{ background: 'rgba(99,102,241,0.1)' }}>
              <Home className="w-10 h-10 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: '#e2e8f0' }}>Résidentiel</h3>
              <p style={{ color: '#64748b' }}>Appartements de luxe, résidences étudiantes et colocations haut de gamme dans les plus grandes métropoles mondiales.</p>
            </div>
          </div>
          <div className="card flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center shrink-0" style={{ background: 'rgba(99,102,241,0.1)' }}>
              <Building className="w-10 h-10 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: '#e2e8f0' }}>Commercial</h3>
              <p style={{ color: '#64748b' }}>Bureaux modernes, centres logistiques et locaux commerciaux sécurisés par des baux longue durée avec des entreprises solides.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card">
            <PieChart className="w-10 h-10 mb-4" style={{ color: '#6366f1' }} />
            <h3 className="text-lg font-bold mb-2" style={{ color: '#e2e8f0' }}>Fractionnement</h3>
            <p className="text-sm" style={{ color: '#64748b' }}>Chaque propriété est divisée en jetons numériques, vous permettant d'acheter exactement la part que vous souhaitez.</p>
          </div>
          <div className="card">
            <Landmark className="w-10 h-10 mb-4" style={{ color: '#6366f1' }} />
            <h3 className="text-lg font-bold mb-2" style={{ color: '#e2e8f0' }}>Revenus Mensuels</h3>
            <p className="text-sm" style={{ color: '#64748b' }}>Recevez votre part des loyers directement sur votre portefeuille Crypto Invest chaque mois, au prorata de vos parts.</p>
          </div>
          <div className="card">
            <Key className="w-10 h-10 mb-4" style={{ color: '#6366f1' }} />
            <h3 className="text-lg font-bold mb-2" style={{ color: '#e2e8f0' }}>Zéro Gestion</h3>
            <p className="text-sm" style={{ color: '#64748b' }}>Nous nous occupons de tout : entretien, recherche de locataires et gestion administrative.</p>
          </div>
          <div className="card">
            <Shield className="w-10 h-10 mb-4" style={{ color: '#6366f1' }} />
            <h3 className="text-lg font-bold mb-2" style={{ color: '#e2e8f0' }}>Sécurité Juridique</h3>
            <p className="text-sm" style={{ color: '#64748b' }}>Tous les investissements sont encadrés par des contrats légaux et des structures de type SCI/Sasu.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center">
        <div className="card max-w-4xl mx-auto p-12 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple" />
          <h2 className="text-3xl font-bold mb-6" style={{ color: '#e2e8f0' }}>L'immobilier accessible à tous</h2>
          <p className="mb-10 max-w-2xl mx-auto" style={{ color: '#64748b' }}>
            Plus besoin d'emprunter sur 25 ans pour devenir investisseur immobilier. Commencez petit, voyez grand avec Crypto Invest.
          </p>
          <Link to="/register" className="btn btn-primary px-10 py-4">Créer mon compte</Link>
        </div>
      </section>
    </div>
  )
}
