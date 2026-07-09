import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Globe, MessageCircle, Send, ArrowUpRight, X } from 'lucide-react'
import logoImg from '../assets/img/logo.png'

const INFO_DETAILS: Record<string, { title: string; description: string }> = {
  'Trading Spot': {
    title: 'Trading Spot',
    description: 'Achetez et vendez des crypto-monnaies instantanément avec notre moteur de correspondance ultra-rapide. Profitez de spreads serrés, d’une liquidité profonde et de frais réduits pour optimiser vos stratégies de trading au quotidien.',
  },
  'Staking': {
    title: 'Staking & Rendements',
    description: 'Générez des revenus passifs sur vos crypto-monnaies dormantes. En participant à la validation des réseaux Proof-of-Stake, vous gagnez des récompenses régulières distribuées directement sur votre solde.',
  },
  'À propos': {
    title: 'À propos de Crypto Invest',
    description: 'Fondée en 2021, Crypto Invest a pour mission de démocratiser l’accès à l’investissement alternatif et aux actifs numériques. Notre plateforme simplifiée permet à chacun de diversifier son capital en toute sécurité.',
  },
  'Carrières': {
    title: 'Carrières & Recrutement',
    description: 'Rejoignez une équipe internationale passionnée par l’innovation technologique et financière. Nous recherchons continuellement des développeurs, analystes financiers et spécialistes du support client.',
  },
  'Blog': {
    title: 'Blog Officiel',
    description: 'Suivez les tendances du marché, découvrez des guides pratiques sur la finance décentralisée et restez informé des dernières mises à jour produit grâce aux articles rédigés par nos experts.',
  },
  'Partenaires': {
    title: 'Partenaires Écosystème',
    description: 'Nous collaborons avec des institutions financières de premier ordre, des audits de sécurité de renommée mondiale et des protocoles DeFi majeurs pour garantir la fiabilité de nos services d’investissement.',
  },
  'Centre d\'aide': {
    title: 'Centre d\'aide 24/7',
    description: 'Une question concernant un dépôt, un retrait ou le fonctionnement d’un plan ? Notre centre de ressources contient des dizaines de tutoriels détaillés, et nos agents sont à votre écoute à tout moment.',
  },
  'Frais': {
    title: 'Frais & Commissions',
    description: 'Transparence totale : aucuns frais cachés. Dépôts gratuits pour toutes les cryptos et réseaux. Retraits soumis à des frais réseau standards selon la devise choisie. Consultez la grille tarifaire complète.',
  },
  'Statut': {
    title: 'Statut du Réseau',
    description: 'Tous les services de Crypto Invest (dépôts, retraits, trading et calcul de gains) sont opérationnels. Taux de disponibilité global constaté sur les 30 derniers jours : 99,98%.',
  },
  'Confidentialité': {
    title: 'Politique de Confidentialité',
    description: 'La protection de vos données privées est au cœur de nos engagements. Vos données personnelles sont chiffrées de bout en bout et ne sont jamais partagées ou vendues à des tiers.',
  },
  'Conditions': {
    title: 'Conditions Générales d’Utilisation',
    description: 'Lisez les règles et engagements réciproques qui régissent votre utilisation de la plateforme Crypto Invest et de nos divers modules d’investissement.',
  },
  'Cookies': {
    title: 'Gestion des Cookies',
    description: 'Nous utilisons des cookies essentiels pour sécuriser votre connexion et mémoriser vos préférences d’affichage. Vous pouvez gérer vos choix à tout moment dans les paramètres de votre navigateur.',
  },
  'Globe': {
    title: 'Présence Internationale',
    description: 'Crypto Invest est accessible légalement dans plus de 150 pays à travers le monde, respectant les normes de conformité et offrant un service adapté à chaque région.',
  },
  'MessageCircle': {
    title: 'Support en Direct',
    description: 'Besoin d’une réponse rapide ? Rejoignez notre chat interactif pour échanger en direct avec un conseiller et débloquer vos situations urgentes.',
  },
  'Send': {
    title: 'Communauté Telegram',
    description: 'Rejoignez notre canal officiel Telegram pour interagir avec les autres membres de la communauté, participer à des évènements exclusifs et recevoir les alertes officielles.',
  }
}

export default function Footer() {
  const [activeModalContent, setActiveModalContent] = useState<{ title: string; description: string } | null>(null)

  return (
    <footer className="relative" style={{ borderTop: '1px solid #1e293b', background: 'rgba(15,23,42,0.5)' }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(99,102,241,0.5), transparent)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <img src={logoImg} alt="Logo" className="w-8 h-8 object-contain rounded-xl" />
              <span className="text-xl font-bold glow-text">Crypto Invest</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#64748b' }}>
              La plateforme d'investissement la plus sécurisée. Rejoignez plus de 2 millions d'investisseurs.
            </p>
            <div className="flex space-x-3">
              {[
                { Icon: Globe, label: 'Globe' },
                { Icon: MessageCircle, label: 'MessageCircle' },
                { Icon: Send, label: 'Send' }
              ].map(({ Icon, label }, i) => (
                <button
                  key={i}
                  onClick={() => {
                    const info = INFO_DETAILS[label]
                    if (info) {
                      setActiveModalContent(info)
                    }
                  }}
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300"
                  style={{ background: '#1e293b', color: '#64748b', border: 'none', cursor: 'pointer' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#e2e8f0'; e.currentTarget.style.background = 'rgba(99,102,241,0.2)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.background = '#1e293b' }}
                >
                  <Icon className="w-4 h-4" />
                </button>
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
                    {link.href === '#' ? (
                      <button
                        onClick={() => {
                          const info = INFO_DETAILS[link.label]
                          if (info) {
                            setActiveModalContent(info)
                          }
                        }}
                        className="text-sm transition-colors duration-300 flex items-center group text-left" 
                        style={{ color: '#64748b', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#e2e8f0'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
                      >
                        {link.label}
                        <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ) : (
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
                    )}
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
              <button
                key={item}
                onClick={() => {
                  const info = INFO_DETAILS[item]
                  if (info) {
                    setActiveModalContent(info)
                  }
                }}
                className="text-sm transition-colors cursor-pointer"
                style={{ color: '#64748b', background: 'none', border: 'none', padding: 0 }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#e2e8f0' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#64748b' }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeModalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm transition-all">
          <div className="relative w-full max-w-md p-6 rounded-2xl border border-white/10 bg-slate-900 shadow-2xl text-left">
            <button
              onClick={() => setActiveModalContent(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-white mb-3 pr-8">{activeModalContent.title}</h3>
            <p className="text-sm leading-relaxed text-slate-300">{activeModalContent.description}</p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveModalContent(null)}
                className="px-4 py-2 text-sm font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  )
}
