import { useEffect, useState } from 'react'
import { createWorker } from 'tesseract.js'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import { animate } from 'framer-motion'
import erc20Logo from '../assets/img/erc20.jpg'
import bep20Logo from '../assets/img/bep20.jpg'
import trc20Logo from '../assets/img/trc20.jpg'
import {
  Wallet,
  ArrowDownCircle,
  TrendingUp,
  Plus,
  ArrowRight,
  Info,
  X,
  UploadCloud,
  AlertTriangle,
  CheckCircle2,
  ImagePlus,
  Copy,
} from 'lucide-react'

function Counter({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const controls = animate(displayValue, value, {
      duration: 2,
      onUpdate: (latest) => setDisplayValue(Math.floor(latest)),
    })
    return () => controls.stop()
  }, [value])

  return <span>{displayValue.toLocaleString()}</span>
}

export default function Dashboard() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showDepositModal, setShowDepositModal] = useState(false)
  const [depositMethod, setDepositMethod] = useState<'crypto' | null>(null)
  const [depositStep, setDepositStep] = useState<'select' | 'instructions' | 'address' | 'upload' | 'review'>('select')
  const [selectedNetwork, setSelectedNetwork] = useState<'ERC20' | 'BEP20' | 'TRC20' | null>(null)
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [selectedFileName, setSelectedFileName] = useState('')
  const [ocrLoading, setOcrLoading] = useState(false)
  const [ocrAmount, setOcrAmount] = useState<string | null>(null)
  const [ocrDate, setOcrDate] = useState<string | null>(null)
  const [ocrPhone, setOcrPhone] = useState<string | null>(null)
  const [ocrText, setOcrText] = useState('')
  const [manualDate, setManualDate] = useState('')
  const [verificationMessage, setVerificationMessage] = useState<string | null>(null)
  const [verificationOk, setVerificationOk] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')
  const [addressCopied, setAddressCopied] = useState(false)
  const [canProceedToUpload, setCanProceedToUpload] = useState(false)
  const [showInvestmentModal, setShowInvestmentModal] = useState(false)
  const [selectedInvestmentPlan, setSelectedInvestmentPlan] = useState<string | null>(null)
  const [investmentAmount, setInvestmentAmount] = useState('')
  const [investmentMessage, setInvestmentMessage] = useState<string | null>(null)
  const [investmentActive, setInvestmentActive] = useState(false)
  const [investmentPlan, setInvestmentPlan] = useState<string | null>(null)
  const [investmentAmountValue, setInvestmentAmountValue] = useState(0)
  const [investmentEarnings, setInvestmentEarnings] = useState(0)
  const [investmentStorageKey, setInvestmentStorageKey] = useState<string | null>(null)
  const [showWithdrawModal, setShowWithdrawModal] = useState(false)
  const [withdrawCrypto, setWithdrawCrypto] = useState('USDT')
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [withdrawAddress, setWithdrawAddress] = useState('')
  const [withdrawMessage, setWithdrawMessage] = useState<string | null>(null)
  const [withdrawing, setWithdrawing] = useState(false)

  useEffect(() => {
    async function getProfile() {
      if (!user) return
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      if (data) {
        const savedInvestment = window.localStorage.getItem(`investment:${user.id}`)
        let adjustedBalance = data.balance || 0

        if (savedInvestment) {
          try {
            const parsed = JSON.parse(savedInvestment)
            if (parsed?.active) {
              adjustedBalance = Math.max(0, adjustedBalance - (parsed.amount || 0))
            }
          } catch (error) {
            // ignore malformed saved investment
          }
        }

        setProfile({ ...data, balance: adjustedBalance })
      }
      setLoading(false)
    }
    getProfile()
  }, [user])

  useEffect(() => {
    const scriptId = 'tradingview-tvjs'
    const initWidget = () => {
      try {
        const tradingView = (window as Window & { TradingView?: any }).TradingView
        if (tradingView) {
          new tradingView.widget({
            width: '100%',
            height: 320,
            symbol: 'BINANCE:BTCUSDT',
            interval: '60',
            timezone: 'Etc/UTC',
            theme: 'dark',
            style: '1',
            locale: 'fr',
            toolbar_bg: '#1f2937',
            enable_publishing: false,
            allow_symbol_change: true,
            container_id: 'tradingview_widget',
          })
        }
      } catch (e) {
        // ignore widget init issues
      }
    }

    if (!document.getElementById(scriptId)) {
      const s = document.createElement('script')
      s.id = scriptId
      s.src = 'https://s3.tradingview.com/tv.js'
      s.async = true
      s.onload = initWidget
      s.onerror = () => {
        /* failed to load */
      }
      document.body.appendChild(s)
    } else {
      initWidget()
    }
  }, [])

  useEffect(() => {
    if (!user?.id) return
    setInvestmentStorageKey(`investment:${user.id}`)
  }, [user?.id])

  useEffect(() => {
    if (!investmentStorageKey) return

    const savedInvestment = window.localStorage.getItem(investmentStorageKey)
    if (!savedInvestment) return

    try {
      const parsed = JSON.parse(savedInvestment)
      if (parsed?.active) {
        setInvestmentActive(true)
        setInvestmentPlan(parsed.plan || null)
        setInvestmentAmountValue(parsed.amount || 0)
        setInvestmentEarnings(parsed.earnings || 0)
      }
    } catch (error) {
      window.localStorage.removeItem(investmentStorageKey)
    }
  }, [investmentStorageKey])

  useEffect(() => {
    if (!investmentStorageKey) return

    if (investmentActive) {
      window.localStorage.setItem(
        investmentStorageKey,
        JSON.stringify({
          active: true,
          plan: investmentPlan,
          amount: investmentAmountValue,
          earnings: investmentEarnings,
        }),
      )
    } else {
      window.localStorage.removeItem(investmentStorageKey)
    }
  }, [investmentStorageKey, investmentActive, investmentPlan, investmentAmountValue, investmentEarnings])

  useEffect(() => {
    if (!investmentActive) return

    const interval = window.setInterval(() => {
      setInvestmentEarnings((prev) => prev + 350)
      setProfile((current: any) => current ? { ...current, balance: (current.balance || 0) + 350 } : current)
    }, 60 * 60 * 1000)

    return () => window.clearInterval(interval)
  }, [investmentActive])

  useEffect(() => {
    if (!investmentActive) return

    const scriptId = 'investment-tradingview-script'
    const initWidget = () => {
      try {
        const tradingView = (window as Window & { TradingView?: any }).TradingView
        if (tradingView) {
          new tradingView.widget({
            width: '100%',
            height: 320,
            symbol: 'COINBASE:BTCUSD',
            interval: '60',
            timezone: 'Etc/UTC',
            theme: 'dark',
            style: '1',
            locale: 'fr',
            toolbar_bg: '#020617',
            enable_publishing: false,
            allow_symbol_change: false,
            hide_top_toolbar: true,
            hide_legend: true,
            hide_side_toolbar: true,
            details: false,
            save_image: false,
            container_id: 'investment_tradingview_widget',
          })
        }
      } catch (e) {
        // ignore chart init issues
      }
    }

    if (!document.getElementById(scriptId)) {
      const s = document.createElement('script')
      s.id = scriptId
      s.src = 'https://s3.tradingview.com/tv.js'
      s.async = true
      s.onload = initWidget
      s.onerror = () => {
        /* failed to load */
      }
      document.body.appendChild(s)
    } else {
      initWidget()
    }
  }, [investmentActive])

  const displayName = profile?.full_name || user?.user_metadata?.full_name || 'Investisseur'

  const resetDepositFlow = () => {
    setShowDepositModal(false)
    setDepositMethod(null)
    setDepositStep('select')
    setSelectedFile(null)
    setSelectedFileName('')
    setOcrLoading(false)
    setOcrAmount(null)
    setOcrDate(null)
    setOcrPhone(null)
    setOcrText('')
    setManualDate('')
    setVerificationMessage(null)
    setVerificationOk(false)
    setSubmitted(false)
    setSelectedNetwork(null)
    setWalletAddress('')
    setAddressCopied(false)
    setCanProceedToUpload(false)
  }

  const handleCopyAddress = async () => {
    if (!walletAddress) return
    try {
      await navigator.clipboard.writeText(walletAddress)
      setAddressCopied(true)
      setCanProceedToUpload(false)
      window.setTimeout(() => setCanProceedToUpload(true), 10000)
    } catch (error) {
      setVerificationMessage('La copie automatique a échoué. Copiez l’adresse manuellement.')
      setVerificationOk(false)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => setSelectedFile(reader.result as string)
    reader.readAsDataURL(file)
    setSelectedFileName(file.name)
    setOcrLoading(true)
    setVerificationMessage(null)
    setVerificationOk(false)

    try {
      const worker = await createWorker('fra')
      const { data: { text } } = await worker.recognize(file)
      await worker.terminate()
      setOcrText(text)

      const amountMatch = text.match(/(\d{1,3}(?:[.\s]\d{3})*(?:[.,]\d{2})?)/)
      const dateMatch = text.match(/(\d{1,2}[\/.-]\d{1,2}[\/.-]\d{2,4})/)
      const phoneMatch = text.match(/(?:\+?237|0)[0-9\s.-]{8,12}/)

      const extractedAmount = amountMatch ? amountMatch[1].replace(/\s/g, '').replace(',', '.') : ''
      const extractedDate = dateMatch ? dateMatch[1] : ''
      const extractedPhone = phoneMatch ? phoneMatch[0].replace(/[^\d+]/g, '') : ''

      setOcrAmount(extractedAmount || null)
      setOcrDate(extractedDate || null)
      setOcrPhone(extractedPhone || null)

      const addressOk = !!walletAddress && (text.includes(walletAddress) || extractedPhone.includes(walletAddress))
      const dateOk = !!manualDate && new Date(manualDate) <= new Date(new Date().setHours(23, 59, 59, 999))
      const amountOk = !!extractedAmount

      if (addressOk && dateOk && amountOk) {
        setVerificationMessage('Capture analysée correctement. Le dépôt semble conforme aux informations fournies.')
        setVerificationOk(true)
      } else {
        setVerificationMessage('La capture a été analysée, mais certaines informations ne correspondent pas encore au dépôt attendu.')
        setVerificationOk(false)
      }
    } catch (error) {
      setVerificationMessage('L’analyse de l’image a échoué. Veuillez réessayer avec une meilleure capture.')
      setVerificationOk(false)
    } finally {
      setOcrLoading(false)
    }
  }

  const handleDepositSubmit = () => {
    const resolvedAmount = ocrAmount || '0'

    if (!selectedNetwork || !walletAddress || !resolvedAmount || !manualDate) {
      setVerificationMessage('Veuillez renseigner le réseau, l’adresse, la date du dépôt et assurez-vous que le montant a bien été détecté sur la capture.')
      setVerificationOk(false)
      return
    }

    const dateOk = new Date(manualDate) <= new Date(new Date().setHours(23, 59, 59, 999))
    const amountOk = Number(resolvedAmount) > 0

    if (!dateOk || !amountOk) {
      setVerificationMessage('Le dépôt ne correspond pas à une date ou à un montant valide.')
      setVerificationOk(false)
      return
    }

    const amountToCredit = Number(resolvedAmount)
    if (profile) {
      setProfile({ ...profile, balance: (profile.balance || 0) + amountToCredit })
    }

    setSubmitted(true)
    setVerificationMessage(`Dépôt validé. ${amountToCredit.toLocaleString()} FCFA ont été ajoutés à votre solde.`)
    setVerificationOk(true)
  }

  const handleWithdrawSubmit = async () => {
    const amount = Number(withdrawAmount)

    if (!withdrawCrypto || !withdrawAddress || !Number.isFinite(amount) || amount < 10000) {
      setWithdrawMessage('Veuillez entrer un montant valide d’au moins 10000 FCFA et une adresse de retrait.')
      return
    }

    if ((profile?.balance || 0) < amount) {
      setWithdrawMessage('Votre solde est insuffisant pour ce retrait.')
      return
    }

    if (!user?.id) {
      setWithdrawMessage('Vous devez être connecté pour demander un retrait.')
      return
    }

    setWithdrawing(true)
    setWithdrawMessage(null)

    try {
      const { error } = await supabase.from('retraits').insert({
        user_id: user.id,
        crypto: withdrawCrypto,
        amount,
        address: withdrawAddress,
        status: 'en_attente',
        created_at: new Date().toISOString(),
      })

      if (error) throw error

      setProfile({ ...profile, balance: (profile.balance || 0) - amount })
      setWithdrawMessage(`Retrait demandé avec succès. Vous recevrez les fonds dans quelques minutes sur ${withdrawCrypto}.`)
      setWithdrawAmount('')
      setWithdrawAddress('')
      setWithdrawCrypto('USDT')
      setShowWithdrawModal(false)
    } catch (error) {
      setWithdrawMessage('Le retrait n’a pas pu être enregistré. Vérifiez la table Supabase et vos réglages.')
    } finally {
      setWithdrawing(false)
    }
  }

  const networkConfig = {
    ERC20: { address: '0xfe681afe388518dcd2333ef2410bab269aec8f0f', logo: erc20Logo },
    BEP20: { address: '0xfe681afe388518dcd2333ef2410bab269aec8f0f', logo: bep20Logo },
    TRC20: { address: 'GXHwuNMraMBoX6f167As7nSJES74Ytgn4LJEBicmvTTC', logo: trc20Logo },
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold glow-text">Tableau de bord</h1>
          <p style={{ color: '#64748b' }}>Ravi de vous revoir, {displayName}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative overflow-hidden rounded-3xl p-8 md:p-10" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
              <div className="absolute top-0 right-0 p-10 opacity-10">
                <Wallet className="w-40 h-40 text-white" />
              </div>

              <div className="relative">
                <p className="text-white/80 text-sm font-medium mb-2 uppercase tracking-wider">Solde Total</p>
                <div className="flex items-baseline gap-3 mb-8">
                  <h2 className="text-5xl md:text-7xl font-black text-white">
                    {loading ? '0' : <Counter value={profile?.balance || 0} />}
                  </h2>
                  <span className="text-2xl font-bold text-white/90">FCFA</span>
                </div>

                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => {
                      setShowDepositModal(true)
                      setDepositMethod(null)
                      setDepositStep('select')
                    }}
                    className="flex-1 min-w-[140px] bg-white text-primary px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-xl shadow-black/10"
                  >
                    <Plus className="w-5 h-5" /> Dépôt
                  </button>
                  <button
                    onClick={() => {
                      setShowWithdrawModal(true)
                      setWithdrawMessage(null)
                    }}
                    className="flex-1 min-w-[140px] bg-white/10 backdrop-blur-md text-white border border-white/20 px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/20 transition-all"
                  >
                    <ArrowDownCircle className="w-5 h-5" /> Retrait
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex gap-4">
              <Info className="w-6 h-6 text-amber-500 shrink-0" />
              <p className="text-sm leading-relaxed" style={{ color: '#94a3b8' }}>
                <strong className="text-amber-500">Note sur le bonus :</strong> Votre bonus de bienvenue (500 FCFA) ne pourra être retiré qu'après avoir effectué au moins un dépôt et généré des gains sur la plateforme.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowInvestmentModal(true)
                setInvestmentMessage(null)
              }}
              className="card w-full p-8 border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all cursor-pointer group text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="p-4 rounded-2xl bg-primary/20 text-primary">
                    <TrendingUp className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1" style={{ color: '#e2e8f0' }}>Plan d'investissement</h3>
                    <p style={{ color: '#64748b' }}>Choisissez votre plan et démarrez un investissement.</p>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:translate-x-2 transition-transform">
                  <ArrowRight className="w-6 h-6 text-primary" />
                </div>
              </div>
            </button>
          </div>

          <div className="space-y-6">
            <div className="card p-6">
              <div className="space-y-4">
                <div className="w-full rounded-xl overflow-hidden bg-white/5">
                  <div id="tradingview_widget" style={{ width: '100%', height: '320px' }} />
                  <div className="p-3 text-center text-xs" style={{ color: '#64748b' }}>
                    Graphique TradingView intégré.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {investmentActive && (
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5 shadow-2xl">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-white">Graphique TradingView</h3>
              <p className="text-sm text-slate-400">Vue exclusive du marché sans panneaux annexes.</p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70">
              <div id="investment_tradingview_widget" style={{ width: '100%', height: '320px' }} />
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5 shadow-2xl">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-white">Progression du solde</h3>
              <p className="text-sm text-slate-400">350 FCFA sont ajoutés à votre compte toutes les heures.</p>
            </div>
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
              <div className="text-sm text-emerald-300">Plan actif</div>
              <div className="mt-2 text-2xl font-bold text-white">{investmentPlan || 'Plan en cours'}</div>
              <div className="mt-4 flex items-center justify-between text-sm text-slate-300">
                <span>Solde investi</span>
                <span className="font-semibold text-white">{investmentAmountValue.toLocaleString()} FCFA</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm text-slate-300">
                <span>Bénéfices</span>
                <span className="font-semibold text-emerald-300">+{investmentEarnings.toLocaleString()} FCFA</span>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    const refundAmount = Math.round(investmentAmountValue * 0.2)
                    setInvestmentActive(false)
                    setInvestmentPlan(null)
                    setInvestmentAmountValue(0)
                    setInvestmentEarnings(0)
                    setInvestmentMessage(`Investissement annulé. ${refundAmount.toLocaleString()} FCFA ont été remboursés sur votre compte.`)
                    setProfile((current: any) => current ? { ...current, balance: (current.balance || 0) + refundAmount } : current)
                  }}
                  className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm font-semibold text-amber-300"
                >
                  Annuler l’investissement
                </button>
              </div>
              <div className="mt-4 rounded-xl border border-white/10 bg-slate-900/70 p-3 text-sm text-slate-400">
                Les gains sont distribués chaque semaine sur votre tableau de bord.
              </div>
            </div>
          </div>
        </div>
      )}

      {showInvestmentModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4 py-6">
          <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-slate-950/95 p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Choisir un plan d’investissement</h2>
                <p className="mt-1 text-sm text-slate-400">Sélectionnez un plan, saisissez le montant minimum de 2000 FCFA et validez.</p>
              </div>
              <button onClick={() => setShowInvestmentModal(false)} className="rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {[
                { key: 'matiere-premiere', label: 'Matière première', description: 'Placement stable sur les matières premières.' },
                { key: 'trading', label: 'Trading', description: 'Approche dynamique sur les marchés.' },
                { key: 'crypto', label: 'Crypto', description: 'Exposition aux actifs numériques.' },
                { key: 'bois', label: 'Bois', description: 'Investissement sur la filière bois.' },
                { key: 'petrol', label: 'Pétrole', description: 'Accès au marché pétrolier.' },
              ].map((plan) => (
                <button
                  key={plan.key}
                  type="button"
                  onClick={() => setSelectedInvestmentPlan(plan.key)}
                  className={`rounded-2xl border p-4 text-left transition ${selectedInvestmentPlan === plan.key ? 'border-primary bg-primary/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
                >
                  <div className="font-semibold text-white">{plan.label}</div>
                  <div className="mt-1 text-sm text-slate-400">{plan.description}</div>
                </button>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-slate-900/70 p-4">
              <label className="mb-2 block text-sm text-slate-300">Montant à investir (minimum 2000 FCFA)</label>
              <input
                type="number"
                min="2000"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2 text-white"
                placeholder="2000"
              />
              <div className="mt-3 text-sm text-slate-400">
                Les gains seront crédités chaque semaine sur votre tableau de bord.
              </div>
            </div>

            {investmentMessage && (
              <div className="mt-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-300">
                {investmentMessage}
              </div>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setShowInvestmentModal(false)} className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-slate-300">
                Annuler
              </button>
              <button
                onClick={() => {
                  const amount = Number(investmentAmount)
                  if (!selectedInvestmentPlan) {
                    setInvestmentMessage('Choisissez d’abord un plan d’investissement.')
                    return
                  }
                  if (!Number.isFinite(amount) || amount < 2000) {
                    setInvestmentMessage('Le montant minimum est de 2000 FCFA.')
                    return
                  }
                  if ((profile?.balance || 0) < amount) {
                    setInvestmentMessage('Votre solde est insuffisant pour souscrire à cet investissement.')
                    return
                  }

                  const planLabels: Record<string, string> = {
                    'matiere-premiere': 'Matière première',
                    trading: 'Trading',
                    crypto: 'Crypto',
                    bois: 'Bois',
                    petrol: 'Pétrole',
                  }

                  setInvestmentPlan(planLabels[selectedInvestmentPlan])
                  setInvestmentAmountValue(amount)
                  setInvestmentActive(true)
                  setInvestmentMessage(`Investissement confirmé : ${amount.toLocaleString()} FCFA sur le plan ${planLabels[selectedInvestmentPlan]}.`)
                  setShowInvestmentModal(false)
                  setInvestmentAmount('')
                  setSelectedInvestmentPlan(null)
                  if (profile) {
                    setProfile({ ...profile, balance: (profile.balance || 0) - amount })
                  }
                }}
                className="rounded-2xl bg-primary px-4 py-2 text-sm font-semibold text-white"
              >
                Investir
              </button>
            </div>
          </div>
        </div>
      )}

      {showWithdrawModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4 py-6">
          <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-slate-950/95 p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Demander un retrait</h2>
                <p className="mt-1 text-sm text-slate-400">Choisissez la crypto, saisissez le montant et donnez l’adresse de réception.</p>
              </div>
              <button onClick={() => setShowWithdrawModal(false)} className="rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm text-slate-300">Crypto de retrait</label>
                <select
                  value={withdrawCrypto}
                  onChange={(e) => setWithdrawCrypto(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2 text-white"
                >
                  <option value="USDT">USDT</option>
                  <option value="BTC">BTC</option>
                  <option value="ETH">ETH</option>
                  <option value="TRX">TRX</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">Montant à retirer (minimum 10000 FCFA)</label>
                <input
                  type="number"
                  min="10000"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2 text-white"
                  placeholder="10000"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">Adresse de réception</label>
                <input
                  value={withdrawAddress}
                  onChange={(e) => setWithdrawAddress(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2 text-white"
                  placeholder="Adresse de votre wallet"
                />
              </div>

              {withdrawMessage && (
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-300">
                  {withdrawMessage}
                </div>
              )}

              <div className="flex justify-end gap-3">
                <button onClick={() => setShowWithdrawModal(false)} className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-slate-300">
                  Annuler
                </button>
                <button
                  onClick={handleWithdrawSubmit}
                  disabled={withdrawing}
                  className="rounded-2xl bg-primary px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {withdrawing ? 'Traitement...' : 'Valider le retrait'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDepositModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6">
          <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-slate-950/95 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">Effectuer un dépôt</h2>
                <p className="text-sm mt-1" style={{ color: '#64748b' }}>
                  Choisissez votre moyen de paiement pour valider votre dépôt.
                </p>
              </div>
              <button onClick={resetDepositFlow} className="rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {depositStep === 'select' && (
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  { key: 'crypto', label: 'Crypto', badge: 'Disponible' },
                ].map((option) => (
                  <button
                    key={option.key}
                    onClick={() => {
                      setDepositMethod('crypto')
                      setDepositStep('instructions')
                    }}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:bg-white/10"
                  >
                    <div className="text-sm font-semibold text-white">{option.label}</div>
                    <div className="text-xs mt-2" style={{ color: '#94a3b8' }}>{option.badge}</div>
                  </button>
                ))}
              </div>
            )}

            {depositStep === 'instructions' && depositMethod && (
              <div className="space-y-4">
                {depositMethod === 'crypto' ? (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-4">
                    <p className="text-sm" style={{ color: '#e2e8f0' }}>
                      Choisissez le réseau de la crypto que vous souhaitez envoyer, puis continuez pour finaliser votre dépôt.
                    </p>
                    <div className="grid gap-3 md:grid-cols-3">
                      {(['ERC20', 'BEP20', 'TRC20'] as const).map((network) => (
                        <button
                          key={network}
                          onClick={() => {
                            setSelectedNetwork(network)
                            setWalletAddress(networkConfig[network].address)
                            setAddressCopied(false)
                            setCanProceedToUpload(false)
                            setDepositStep('address')
                          }}
                          className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                        >
                          <div className="flex items-center justify-center gap-2">
                            <img src={networkConfig[network].logo} alt={network} className="h-5 w-5 rounded-full object-cover" />
                            {network}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
                    <p className="text-sm" style={{ color: '#e2e8f0' }}>
                      Envoyez votre dépôt au numéro indiqué puis cliquez sur “J’ai déjà effectué un dépôt”.
                    </p>
                    <div className="rounded-xl bg-slate-900/70 p-3">
                      <div className="flex items-center justify-between text-sm">
                        <span style={{ color: '#64748b' }}>Orange Money</span>
                        <span className="font-semibold text-white">689476780</span>
                      </div>
                      <div className="flex items-center justify-between text-sm mt-2">
                        <span style={{ color: '#64748b' }}>MTN Mobile Money</span>
                        <span className="font-semibold text-white">677968494</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setDepositStep('upload')}
                      className="w-full rounded-2xl bg-primary px-4 py-3 font-semibold text-white hover:bg-indigo-600"
                    >
                      J’ai déjà effectué un dépôt
                    </button>
                  </div>
                )}
              </div>
            )}

            {depositStep === 'address' && depositMethod && selectedNetwork && (
              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-4">
                  <div className="flex items-center gap-2 text-sm text-white">
                    <img src={networkConfig[selectedNetwork].logo} alt={selectedNetwork} className="h-5 w-5 rounded-full object-cover" />
                    <span>Adresse de paiement {selectedNetwork}</span>
                  </div>
                  <div className="break-all rounded-xl bg-slate-900/70 p-3 text-sm text-slate-300">{walletAddress}</div>
                  <div className="flex flex-wrap gap-3">
                    <button onClick={handleCopyAddress} className="rounded-2xl bg-primary px-4 py-2 text-sm font-semibold text-white flex items-center gap-2">
                      <Copy className="h-4 w-4" /> Copier l’adresse
                    </button>
                    <button
                      onClick={() => setDepositStep('upload')}
                      disabled={!canProceedToUpload}
                      className={`rounded-2xl px-4 py-2 text-sm font-semibold ${canProceedToUpload ? 'bg-emerald-600 text-white' : 'cursor-not-allowed bg-slate-700/70 text-slate-400'}`}
                    >
                      {canProceedToUpload ? 'J’ai déjà payé' : 'J’ai déjà payé'}
                    </button>
                  </div>
                  {addressCopied && !canProceedToUpload && (
                    <div className="text-sm text-slate-400">Le bouton deviendra cliquable dans 10 secondes après copie.</div>
                  )}
                </div>
              </div>
            )}

            {depositStep === 'upload' && depositMethod && (
              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <label className="text-sm font-semibold text-white">Téléverser une capture d’écran</label>
                  <label className="mt-3 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 bg-slate-900/70 p-6 text-center">
                    <UploadCloud className="w-8 h-8 text-primary" />
                    <span className="mt-2 text-sm text-white">Cliquez pour sélectionner une image</span>
                    <span className="text-xs mt-1" style={{ color: '#64748b' }}>{selectedFileName || 'PNG, JPG, JPEG'}</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                  </label>
                </div>

                {selectedFile && (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="mb-3 flex items-center gap-2 text-sm text-white">
                      <ImagePlus className="w-4 h-4 text-primary" />
                      Aperçu
                    </div>
                    <img src={selectedFile} alt="Capture de dépôt" className="h-56 w-full rounded-xl object-cover" />
                  </div>
                )}

                <div>
                  <label className="mb-2 block text-sm text-slate-300">Date du dépôt</label>
                  <input
                    type="date"
                    value={manualDate}
                    onChange={(e) => setManualDate(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2 text-white"
                  />
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                  <div className="flex items-center gap-2 text-sm text-white">
                    <img src={selectedNetwork ? networkConfig[selectedNetwork].logo : erc20Logo} alt={selectedNetwork || 'Crypto'} className="h-5 w-5 rounded-full object-cover" />
                    <span>Adresse à utiliser pour le dépôt</span>
                  </div>
                  <div className="mt-2 break-all rounded-xl bg-black/20 p-3 text-sm text-slate-300">
                    {walletAddress || 'Sélectionnez un réseau pour afficher l’adresse'}
                  </div>
                </div>

                {ocrLoading && <div className="text-sm text-slate-400">Analyse de la capture en cours…</div>}
                {ocrText && (
                  <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-3 text-sm text-slate-300">
                    <div className="font-semibold text-white mb-2">Résultat de l’analyse</div>
                    <div>Montant détecté automatiquement : {ocrAmount || 'non détecté'}</div>
                    <div>Date détectée : {ocrDate || 'non détectée'}</div>
                    <div>Adresse détectée : {ocrPhone || 'non détectée'}</div>
                  </div>
                )}

                {verificationMessage && (
                  <div className={`flex items-start gap-2 rounded-2xl border p-3 text-sm ${verificationOk ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300' : 'border-amber-500/30 bg-amber-500/10 text-amber-300'}`}>
                    {verificationOk ? <CheckCircle2 className="mt-0.5 w-4 h-4" /> : <AlertTriangle className="mt-0.5 w-4 h-4" />}
                    <span>{verificationMessage}</span>
                  </div>
                )}

                <div className="flex justify-end gap-3">
                  <button onClick={() => setDepositStep('instructions')} className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-slate-300">
                    Retour
                  </button>
                  <button onClick={handleDepositSubmit} className="rounded-2xl bg-primary px-4 py-2 text-sm font-semibold text-white">
                    Valider le dépôt
                  </button>
                </div>
              </div>
            )}

            {submitted && (
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-300">
                Merci ! Votre dépôt a été soumis à vérification. Nous contrôlerons le montant, la date et le numéro de paiement.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
