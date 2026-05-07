import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { TrendingUp, Menu, X, ChevronDown, Leaf, Building2, Trees, Coins, LogOut, User as UserIcon } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showInvestMenu, setShowInvestMenu] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const location = useLocation()
  const { user, signOut } = useAuth()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register'

  const investItems = [
    { label: 'Matières premières agricoles', href: '/agriculture', icon: Leaf },
    { label: 'Immobilier fractionné', href: '/immobilier', icon: Building2 },
    { label: 'Programmes forestiers', href: '/foret', icon: Trees },
    { label: 'Métaux précieux', href: '/metaux', icon: Coins },
  ]

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Utilisateur'

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass border-b border-border shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
      style={scrolled ? { background: 'rgba(15,23,42,0.9)', backdropFilter: 'blur(16px)' } : {}}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 rounded-xl blur-md opacity-60 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(135deg, #8b5cf6, #6366f1)' }} />
              <div className="relative p-2.5 rounded-xl group-hover:scale-105 transition-transform" style={{ background: 'linear-gradient(135deg, #8b5cf6, #6366f1)' }}>
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
            <span className="text-2xl font-bold glow-text">Crypto Invest</span>
          </Link>

          {/* Desktop Nav */}
          {!isAuthPage && (
            <div className="hidden md:flex items-center space-x-1">
              {[
                { label: 'Accueil', href: '/' },
                { label: 'Pourquoi nous', href: '/#features' },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                  style={{ color: '#64748b' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#e2e8f0'; e.currentTarget.style.background = 'rgba(30,41,59,0.5)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.background = 'transparent' }}
                >
                  {item.label}
                </Link>
              ))}

              {/* Investissement Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setShowInvestMenu(true)}
                onMouseLeave={() => setShowInvestMenu(false)}
              >
                <button
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                  style={{ color: showInvestMenu ? '#e2e8f0' : '#64748b', background: showInvestMenu ? 'rgba(30,41,59,0.5)' : 'transparent' }}
                >
                  Investissement
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showInvestMenu ? 'rotate-180' : ''}`} />
                </button>

                {showInvestMenu && (
                  <div className="absolute top-full left-0 w-72 pt-2 animate-slide-up">
                    <div className="glass rounded-xl border border-border shadow-2xl overflow-hidden p-2" style={{ background: 'rgba(15,23,42,0.95)' }}>
                      {investItems.map((item) => (
                        <Link
                          key={item.label}
                          to={item.href}
                          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-300 hover:bg-white/5 group"
                          style={{ color: '#e2e8f0' }}
                        >
                          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            <item.icon className="w-4 h-4 text-primary" />
                          </div>
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {[
                { label: 'Cryptos', href: '/#cryptos' },
                { label: 'Sécurité', href: '/#security' },
                { label: 'FAQ', href: '/#faq' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                  style={{ color: '#64748b' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#e2e8f0'; e.currentTarget.style.background = 'rgba(30,41,59,0.5)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.background = 'transparent' }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}

          {/* Auth Buttons or User Profile */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="relative" onMouseEnter={() => setShowUserMenu(true)} onMouseLeave={() => setShowUserMenu(false)}>
                <button className="flex items-center gap-3 px-4 py-2 rounded-xl glass transition-all" style={{ border: '1px solid rgba(99,102,241,0.2)' }}>
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <UserIcon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-semibold" style={{ color: '#e2e8f0' }}>{displayName}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showUserMenu ? 'rotate-180' : ''}`} style={{ color: '#64748b' }} />
                </button>

                {showUserMenu && (
                  <div className="absolute top-full right-0 w-48 pt-2 animate-slide-up">
                    <div className="glass rounded-xl border border-border shadow-2xl overflow-hidden p-1" style={{ background: 'rgba(15,23,42,0.95)' }}>
                      <button 
                        onClick={() => signOut()}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-all"
                      >
                        <LogOut className="w-4 h-4" />
                        Déconnexion
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline">
                  Se connecter
                </Link>
                <Link to="/register" className="btn btn-primary">
                  S'inscrire
                </Link>
              </>
            )}
          </div>

          {/* Mobile */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg transition-all"
            style={{ color: '#64748b' }}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden glass animate-slide-up" style={{ borderTop: '1px solid rgba(99,102,241,0.1)' }}>
          <div className="px-4 py-6 space-y-2">
            {user && (
              <div className="flex items-center gap-3 px-4 py-4 rounded-xl bg-primary/5 mb-4 border border-primary/10">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <UserIcon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: '#e2e8f0' }}>{displayName}</p>
                  <p className="text-xs" style={{ color: '#64748b' }}>{user.email}</p>
                </div>
              </div>
            )}

            {!isAuthPage && (
              <>
                {[
                  { label: 'Accueil', href: '/' },
                  { label: 'Pourquoi nous', href: '/#features' },
                ].map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 rounded-lg transition-all"
                    style={{ color: '#64748b' }}
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Mobile Invest sub-menu */}
                <div className="px-4 py-2">
                  <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#475569' }}>Investissement</p>
                  <div className="space-y-1 ml-2 border-l border-border pl-4">
                    {investItems.map((item) => (
                      <Link
                        key={item.label}
                        to={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 py-2 text-sm"
                        style={{ color: '#e2e8f0' }}
                      >
                        <item.icon className="w-4 h-4 text-primary" />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {[
                  { label: 'Cryptos', href: '/#cryptos' },
                  { label: 'Sécurité', href: '/#security' },
                  { label: 'FAQ', href: '/#faq' },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 rounded-lg transition-all"
                    style={{ color: '#64748b' }}
                  >
                    {item.label}
                  </a>
                ))}
                <div style={{ height: '1px', background: '#1e293b', margin: '1rem 0' }} />
              </>
            )}

            {user ? (
              <button 
                onClick={() => { signOut(); setMobileOpen(false); }}
                className="w-full flex items-center justify-center gap-3 px-4 py-4 rounded-xl text-red-400 bg-red-500/5 hover:bg-red-500/10 transition-all font-medium"
              >
                <LogOut className="w-5 h-5" />
                Déconnexion
              </button>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)} className="block w-full text-center btn btn-outline mb-2">
                  Se connecter
                </Link>
                <Link to="/register" onClick={() => setMobileOpen(false)} className="block w-full text-center btn btn-primary">
                  S'inscrire
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
