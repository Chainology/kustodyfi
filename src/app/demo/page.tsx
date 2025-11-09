'use client'

import { useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Badge from '@/components/Badge'
import { useLocale } from '@/contexts/LocaleContext'
import { Info, Wallet, Server, Download, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

const initialQuoteForm = {
  bank: '',
  quoteId: '',
  tenor: '',
  notional: '',
  forward: '',
  validUntil: '',
}

export default function DemoPage() {
  const { t } = useLocale()
  const [quoteForm, setQuoteForm] = useState(initialQuoteForm)
  const [dealerApproved, setDealerApproved] = useState(false)
  const [cfoApproved, setCfoApproved] = useState(false)
  const [mode, setMode] = useState<'wallet' | 'custodian'>('wallet')
  const [txHash, setTxHash] = useState('')

  const quorumMet = dealerApproved && cfoApproved

  const handleQuoteChange = (field: keyof typeof initialQuoteForm, value: string) => {
    setQuoteForm(prev => ({ ...prev, [field]: value }))
  }

  const handleQuoteSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.table(quoteForm)
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <Nav />

      <section className="pt-32 pb-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-blue-500/40 bg-blue-500/10 p-4 text-center text-blue-100">
            {t('demo.banner')}
          </div>
        </div>
      </section>

      <section className="space-y-12 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900 to-gray-950 p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-wide text-blue-300">
                  {t('demo.headings.pricing')}
                </p>
                <p className="text-lg text-gray-200">{t('demo.sections.pricing')}</p>
              </div>
              <Link
                href="/product#formulas"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-sm text-gray-300 hover:text-white"
                title={t('product.formulas')}
              >
                <Info className="h-4 w-4" />
                Math
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 space-y-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-wide text-blue-300">
                    {t('demo.headings.quoteIntake')}
                  </p>
                  <p className="text-lg text-gray-200">{t('demo.sections.quoteIntake')}</p>
                </div>
                <Badge>{t('badges.nonBroker')}</Badge>
              </div>
            </div>

            <form className="grid gap-4 md:grid-cols-2" onSubmit={handleQuoteSubmit}>
              {(['bank', 'quoteId', 'tenor', 'notional', 'forward', 'validUntil'] as const).map(field => (
                <div key={field} className="flex flex-col">
                  <label className="text-sm text-gray-400 uppercase tracking-wide">
                    {field}
                  </label>
                  <input
                    type="text"
                    value={quoteForm[field]}
                    onChange={e => handleQuoteChange(field, e.target.value)}
                    className="mt-1 rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>
              ))}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold hover:bg-blue-500"
                >
                  Archive quote snapshot
                </button>
              </div>
            </form>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
            <div>
              <p className="text-sm uppercase tracking-wide text-blue-300">
                {t('demo.headings.seal')}
              </p>
              <p className="text-lg text-gray-200">{t('demo.sections.seal')}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-white/10 p-4">
                <p className="text-sm text-gray-400">Policy checks</p>
                <button className="mt-2 text-sm text-blue-300 hover:text-blue-200">
                  View simulation
                </button>
              </div>
              <div className="rounded-xl border border-white/10 p-4 space-y-2">
                <label className="flex items-center gap-2 text-sm text-gray-200">
                  <input
                    type="checkbox"
                    checked={dealerApproved}
                    onChange={e => setDealerApproved(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-700 bg-transparent"
                  />
                  Dealer approval (WebAuthn)
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-200">
                  <input
                    type="checkbox"
                    checked={cfoApproved}
                    onChange={e => setCfoApproved(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-700 bg-transparent"
                  />
                  CFO approval (WebAuthn)
                </label>
              </div>
              <div className="rounded-xl border border-white/10 p-4">
                <p className="text-sm text-gray-400">Audit log</p>
                <div className="mt-2 flex items-center gap-2 text-emerald-300">
                  <CheckCircle2 className="h-4 w-4" />
                  Hash-chain extended
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
            <div className="flex flex-col gap-2">
              <p className="text-sm uppercase tracking-wide text-blue-300">
                {t('demo.headings.execute')}
              </p>
              <p className="text-lg text-gray-200">{t('demo.sections.execute')}</p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <button
                className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm ${
                  mode === 'wallet'
                    ? 'border-blue-400 bg-blue-500/10 text-blue-100'
                    : 'border-white/10 text-gray-300'
                }`}
                onClick={() => setMode('wallet')}
                type="button"
              >
                <Wallet className="h-4 w-4" />
                Wallet (testnet)
              </button>
              <button
                className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm ${
                  mode === 'custodian'
                    ? 'border-blue-400 bg-blue-500/10 text-blue-100'
                    : 'border-white/10 text-gray-300'
                }`}
                onClick={() => setMode('custodian')}
                type="button"
              >
                <Server className="h-4 w-4" />
                Custodian stub
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400 uppercase tracking-wide">tx hash</label>
              <input
                type="text"
                value={txHash}
                onChange={e => setTxHash(e.target.value)}
                className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
            <button
              className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold disabled:opacity-40"
              disabled={!quorumMet}
            >
              Execute
            </button>
          </div>

          <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-emerald-500/10 to-sky-500/10 p-6 space-y-4">
            <p className="text-sm uppercase tracking-wide text-blue-300">
              {t('demo.headings.audit')}
            </p>
            <p className="text-lg text-gray-100">{t('demo.sections.audit')}</p>
            <button className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-sm text-white hover:bg-white/10">
              <Download className="h-4 w-4" />
              Download sample pack
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
