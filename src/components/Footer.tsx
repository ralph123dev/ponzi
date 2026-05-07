import { Link } from 'react-router-dom'
import { TrendingUp, Globe, MessageCircle, Send, ArrowUpRight } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative" style={{ borderTop: '1px solid #1e293b', background: 'rgba(15,23,42,0.5)' }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(99,102,241,0.5), transparent)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <div className="p-2 rounded-xl" style={{ background: 'linear-gradient(135deg, #8b5cf6, #6366f1)' }}>
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold glow-text">Crypto Invest</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#64748b' }}>
              La plateforme d'investissement la plus sécurisée. Rejoignez plus de 2 millions d'investisseurs.
            </p>
            <div className="flex space-x-3">
              {[Globe, MessageCircle, Send].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300" style={{ background: '#1e293b', color: '#64748b' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#e2e8f0'; e.currentTarget.style.background = 'rgba(99,102,241,0.2)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.background = '#1e293b' }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {[
            { 
              title: 'Produits', 
              links: [
                { label: 'Trading Spot', href: '#' },
                { label: 'Matières Agricoles', href: '/agriculture' },
                { label: 'Immo Fractionné', href: '/immobilier' },
                { label: 'Forêts Durables', href: '/foret' },
                { label: 'Métaux Précieux', href: '/metaux' },
                { label: 'Staking', href: '#' }
              ] 
            },
            { 
              title: 'Entreprise', 
              links: [
                { label: 'À propos', href: '#' },
                { label: 'Carrières', href: '#' },
                { label: 'Blog', href: '#' },
                { label: 'Partenaires', href: '#' }
              ] 
            },
            { 
              title: 'Support', 
              links: [
                { label: 'Centre d\'aide', href: '#' },
                { label: 'Contactez-nous', href: '#' },
                { label: 'Frais', href: '#' },
                { label: 'Statut', href: '#' }
              ] 
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold mb-4" style={{ color: '#e2e8f0' }}>{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      to={link.href} 
                      className="text-sm transition-colors duration-300 flex items-center group" 
                      style={{ color: '#64748b' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#e2e8f0'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderTop: '1px solid #1e293b' }}>
          <p className="text-sm" style={{ color: '#64748b' }}>© 2025 Crypto Invest. Tous droits réservés.</p>
          <div className="flex items-center space-x-6">
            {['Confidentialité', 'Conditions', 'Cookies'].map((item) => (
              <a key={item} href="#" className="text-sm transition-colors" style={{ color: '#64748b' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#e2e8f0'; e.currentTarget.style.background = 'transparent' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.background = 'transparent' }}
              >{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
