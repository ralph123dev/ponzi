import { Link } from 'react-router-dom'
import { Shield, Zap, Lock, TrendingUp, ArrowRight, ChevronDown, Star, Users, BarChart3, Coins } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

import btcLogo from '../assets/bitcoin.png'
import ethLogo from '../assets/ethereum.png'
import solLogo from '../assets/solana.jpg'
import bnbLogo from '../assets/bnb.png'
import adaLogo from '../assets/cardano.jpg'
import xrpLogo from '../assets/xpr.jpg'
import orangeLogo from '../assets/orange.png'
import mtnLogo from '../assets/mtn.jpg'

const cryptos = [
  { name: 'Bitcoin', symbol: 'BTC', price: '67,432.50', change: '+3.24', logo: btcLogo, color: '#f7931a' },
  { name: 'Ethereum', symbol: 'ETH', price: '3,521.80', change: '+5.12', logo: ethLogo, color: '#627eea' },
  { name: 'Solana', symbol: 'SOL', price: '178.45', change: '+8.67', logo: solLogo, color: '#9945ff' },
  { name: 'BNB', symbol: 'BNB', price: '612.30', change: '+1.89', logo: bnbLogo, color: '#f3ba2f' },
  { name: 'Cardano', symbol: 'ADA', price: '0.68', change: '-1.23', logo: adaLogo, color: '#0033ad' },
  { name: 'XRP', symbol: 'XRP', price: '0.62', change: '+2.45', logo: xrpLogo, color: '#00aae4' },
  { name: 'Orange Money', symbol: 'OM', price: 'Instantané', change: '0% frais', logo: orangeLogo, color: '#ff6600' },
  { name: 'MTN MoMo', symbol: 'MTN', price: 'Instantané', change: '0% frais', logo: mtnLogo, color: '#ffcc00' },
]

const features = [
  { icon: Shield, title: 'Sécurité maximale', desc: 'Vos actifs sont protégés par un chiffrement de niveau militaire et une assurance jusqu\'à 250M€.' },
  { icon: Zap, title: 'Trading ultra-rapide', desc: 'Exécution des ordres en moins de 10ms grâce à notre infrastructure de pointe.' },
  { icon: Lock, title: 'Stockage à froid', desc: '98% des fonds sont stockés hors ligne dans des coffres sécurisés multi-signatures.' },
  { icon: BarChart3, title: 'Analyses avancées', desc: 'Outils professionnels, graphiques en temps réel et indicateurs techniques.' },
  { icon: Coins, title: 'Staking & Épargne', desc: 'Générez des revenus passifs jusqu\'à 12% APY sur vos cryptomonnaies.' },
  { icon: Users, title: 'Communauté active', desc: 'Rejoignez 2M+ d\'investisseurs et partagez vos stratégies de trading.' },
]

const faqs = [
  { q: 'Comment commencer à investir ?', a: 'Créez votre compte en 2 minutes, vérifiez votre identité, déposez des fonds et commencez à trader plus de 200 cryptomonnaies.' },
  { q: 'Quels sont les frais de trading ?', a: 'Nos frais commencent à 0.1% par transaction. Les traders VIP bénéficient de réductions allant jusqu\'à 80%.' },
  { q: 'Mes fonds sont-ils en sécurité ?', a: 'Oui. 98% des fonds sont en stockage à froid, avec une assurance couvrant jusqu\'à 250M€ en cas d\'incident.' },
  { q: 'Puis-je retirer mes fonds à tout moment ?', a: 'Absolument. Les retraits sont traités instantanément 24h/24, 7j/7 sans aucune restriction.' },
]

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const { user } = useAuth()

  return (
    <div style={{ overflow: 'hidden' }}>
      {/* Hero */}
      <section id="hero" className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full animate-pulse-glow" style={{ background: 'rgba(99,102,241,0.15)', filter: 'blur(120px)' }} />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full animate-pulse-glow" style={{ background: 'rgba(139,92,246,0.15)', filter: 'blur(100px)', animationDelay: '1.5s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm mb-8 animate-slide-up" style={{ color: '#64748b' }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#10b981' }} />
              Marchés ouverts 24/7 — Plus de 200 cryptos disponibles
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6 animate-slide-up" style={{ color: '#e2e8f0', animationDelay: '0.1s' }}>
              Investissez dans la{' '}
              <span className="glow-text">crypto</span>
              <br />
              en toute confiance
            </h1>

            <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up" style={{ color: '#64748b', animationDelay: '0.2s' }}>
              Achetez, vendez et gérez vos cryptomonnaies sur la plateforme la plus sécurisée d'Europe. Commencez avec seulement 10€.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <Link to={user ? "/#cryptos" : "/register"} className="btn btn-primary text-base px-8 py-4 flex items-center gap-2 group">
                {user ? "Débuter l'investissement" : "Commencer maintenant"}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#features" className="btn btn-outline text-base px-8 py-4">
                En savoir plus
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              {[
                { value: '2M+', label: 'Utilisateurs actifs' },
                { value: '€15B+', label: 'Volume échangé' },
                { value: '200+', label: 'Cryptos disponibles' },
                { value: '99.99%', label: 'Uptime garanti' },
              ].map((stat) => (
                <div key={stat.label} className="card text-center">
                  <p className="text-2xl sm:text-3xl font-bold glow-text mb-1">{stat.value}</p>
                  <p className="text-sm" style={{ color: '#64748b' }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Crypto Prices */}
      <section id="cryptos" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#e2e8f0' }}>
              Marchés <span className="glow-text">populaires</span>
            </h2>
            <p style={{ color: '#64748b' }} className="max-w-xl mx-auto">Moyens de paiements</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cryptos.map((crypto) => (
              <div key={crypto.symbol} className="card flex items-center justify-between cursor-pointer transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden" style={{ backgroundColor: crypto.color + '20' }}>
                    <img src={crypto.logo} alt={crypto.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold" style={{ color: '#e2e8f0' }}>{crypto.name}</p>
                    <p className="text-sm" style={{ color: '#64748b' }}>{crypto.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold" style={{ color: '#e2e8f0' }}>${crypto.price}</p>
                  <p className="text-sm font-medium" style={{ color: crypto.change.startsWith('+') ? '#10b981' : '#ef4444' }}>
                    {crypto.change}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 relative">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-0 w-72 h-72 rounded-full" style={{ background: 'rgba(99,102,241,0.08)', filter: 'blur(100px)' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#e2e8f0' }}>
              Pourquoi choisir <span className="glow-text">Crypto Invest</span> ?
            </h2>
            <p style={{ color: '#64748b' }} className="max-w-xl mx-auto">Des outils professionnels accessibles à tous les investisseurs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="card group hover:scale-[1.02] transition-all duration-300">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15))' }}>
                  <f.icon className="w-7 h-7" style={{ color: '#6366f1' }} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: '#e2e8f0' }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section id="security" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl p-12 md:p-16" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.08), rgba(34,211,238,0.04))' }}>
            <div className="absolute inset-0 rounded-3xl" style={{ border: '1px solid rgba(99,102,241,0.2)' }} />
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full" style={{ background: 'rgba(99,102,241,0.08)', filter: 'blur(80px)' }} />
            <div className="relative flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-6" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>
                  <Shield className="w-4 h-4" /> Sécurité de niveau institutionnel
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#e2e8f0' }}>
                  Vos actifs sont entre de bonnes mains
                </h2>
                <p className="leading-relaxed mb-8" style={{ color: '#64748b' }}>
                  Notre infrastructure est auditée par des experts en cybersécurité. Authentification biométrique, chiffrement AES-256 et stockage à froid.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {['Assurance 250M€', 'Audit Certik', 'SOC 2 Type II', 'ISO 27001'].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm" style={{ color: '#e2e8f0' }}>
                      <Star className="w-4 h-4" style={{ color: '#f59e0b' }} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="relative w-48 h-48 md:w-64 md:h-64">
                  <div className="absolute inset-0 rounded-full opacity-20 animate-pulse" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }} />
                  <div className="absolute inset-4 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))', border: '1px solid rgba(99,102,241,0.2)' }}>
                    <Lock className="w-16 h-16 md:w-24 md:h-24" style={{ color: '#6366f1' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#e2e8f0' }}>
              Ce que disent nos <span className="glow-text">investisseurs</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Marie L.', role: 'Investisseuse depuis 2022', text: 'Crypto Invest m\'a permis de commencer dans la crypto en toute sérénité. L\'interface est intuitive et le support est excellent.' },
              { name: 'Thomas B.', role: 'Trader actif', text: 'Les outils d\'analyse et la rapidité d\'exécution sont impressionnants. Je recommande à 100% pour le trading avancé.' },
              { name: 'Sophie R.', role: 'Épargnante', text: 'Le staking me rapporte un revenu passif chaque mois. C\'est simple et transparent, exactement ce que je cherchais.' },
            ].map((t, i) => (
              <div key={i} className="card">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4" style={{ color: '#f59e0b', fill: '#f59e0b' }} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-6" style={{ color: '#64748b' }}>"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: '#e2e8f0' }}>{t.name}</p>
                    <p className="text-xs" style={{ color: '#64748b' }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#e2e8f0' }}>
              Questions <span className="glow-text">fréquentes</span>
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="card cursor-pointer" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold pr-4" style={{ color: '#e2e8f0' }}>{faq.q}</h3>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 flex-shrink-0 ${openFaq === i ? 'rotate-180' : ''}`} style={{ color: '#64748b' }} />
                </div>
                {openFaq === i && (
                  <p className="mt-4 text-sm leading-relaxed" style={{ color: '#64748b' }}>{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#e2e8f0' }}>
            Prêt à <span className="glow-text">investir</span> ?
          </h2>
          <p className="mb-10 max-w-xl mx-auto" style={{ color: '#64748b' }}>
            Rejoignez plus de 2 millions d'investisseurs. Créez votre compte gratuitement en moins de 2 minutes.
          </p>
          <Link to={user ? "/#cryptos" : "/register"} className="btn btn-primary text-base px-10 py-4 inline-flex items-center gap-2 group">
            {user ? "Débuter l'investissement" : "Créer mon compte gratuitement"}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  )
}
