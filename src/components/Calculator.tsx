'use client'

import { useLocale } from '@/contexts/LocaleContext'
import { useState } from 'react'
import { Calculator as CalcIcon, Download, TrendingUp, TrendingDown } from 'lucide-react'
import { calculateYearsBetweenDates, calculateForwardRate } from '@/lib/calculator'
import { trackEvent } from '@/lib/analytics'

export default function Calculator() {
  const { t } = useLocale()
  
  const [direction, setDirection] = useState<'receive' | 'pay'>('receive')
  const [amount, setAmount] = useState<string>('100000')
  const [settlementDate, setSettlementDate] = useState<string>('')
  const [spotRate, setSpotRate] = useState<string>('1300')
  const [forwardRate, setForwardRate] = useState<string>('')
  const [usdRate, setUsdRate] = useState<string>('5.25')
  const [krwRate, setKrwRate] = useState<string>('3.50')
  const [basis, setBasis] = useState<string>('50')
  const [spotLow, setSpotLow] = useState<string>('1240')
  const [spotHigh, setSpotHigh] = useState<string>('1360')
  
  const [results, setResults] = useState<{
    hedged: number
    unhedgedLow: number
    unhedgedHigh: number
  } | null>(null)

  const handleCalculate = () => {
    try {
      const usdAmount = parseFloat(amount)
      const spot = parseFloat(spotRate)
      const lowSpot = parseFloat(spotLow)
      const highSpot = parseFloat(spotHigh)
      
      let forward: number
      
      if (forwardRate) {
        forward = parseFloat(forwardRate)
      } else {
        // Calculate theoretical forward rate
        const today = new Date()
        const settlement = new Date(settlementDate)
        const timeYears = calculateYearsBetweenDates(today, settlement)
        
        forward = calculateForwardRate(
          spot,
          parseFloat(usdRate),
          parseFloat(krwRate),
          timeYears,
          parseFloat(basis)
        )
      }
      
      setResults({
        hedged: usdAmount * forward,
        unhedgedLow: usdAmount * lowSpot,
        unhedgedHigh: usdAmount * highSpot,
      })

      trackEvent('calculate', { direction, amount: usdAmount })
    } catch (error) {
      console.error('Calculation error:', error)
    }
  }

  const handleExport = () => {
    trackEvent('export_pdf', {})
    window.print()
  }

  return (
    <section id="calculator" className="py-24 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t('calculator.title')}
          </h2>
          <p className="text-xl text-gray-400 mb-2">
            {t('calculator.subtitle')}
          </p>
          <div className="inline-block px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg">
            <span className="text-blue-400 text-sm font-semibold">
              {t('calculator.demo')}
            </span>
          </div>
        </div>

        <div className="max-w-5xl mx-auto bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl">
          {/* Input Section */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Direction */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                {t('calculator.direction')}
              </label>
              <div className="flex gap-4">
                <button
                  onClick={() => setDirection('receive')}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                    direction === 'receive'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                  }`}
                >
                  {t('calculator.receive')}
                </button>
                <button
                  onClick={() => setDirection('pay')}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                    direction === 'pay'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                  }`}
                >
                  {t('calculator.pay')}
                </button>
              </div>
            </div>

            {/* USD Amount */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                {t('calculator.amount')}
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="100000"
              />
            </div>

            {/* Settlement Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                {t('calculator.settlementDate')}
              </label>
              <input
                type="date"
                value={settlementDate}
                onChange={(e) => setSettlementDate(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Spot Rate */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                {t('calculator.spotRate')}
              </label>
              <input
                type="number"
                value={spotRate}
                onChange={(e) => setSpotRate(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="1300"
                step="0.01"
              />
            </div>

            {/* Forward Rate */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                {t('calculator.forwardRate')}
              </label>
              <input
                type="number"
                value={forwardRate}
                onChange={(e) => setForwardRate(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Auto-calculated"
                step="0.01"
              />
              <p className="text-xs text-gray-500 mt-1">
                {t('calculator.forwardOptional')}
              </p>
            </div>

            {/* USD Rate */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                {t('calculator.usdRate')}
              </label>
              <input
                type="number"
                value={usdRate}
                onChange={(e) => setUsdRate(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="5.25"
                step="0.01"
              />
            </div>

            {/* KRW Rate */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                {t('calculator.krwRate')}
              </label>
              <input
                type="number"
                value={krwRate}
                onChange={(e) => setKrwRate(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="3.50"
                step="0.01"
              />
            </div>

            {/* Basis */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                {t('calculator.basis')}
              </label>
              <input
                type="number"
                value={basis}
                onChange={(e) => setBasis(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="50"
                step="1"
              />
            </div>

            {/* Spot Range Low */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Expected Spot Low (₩/USD)
              </label>
              <input
                type="number"
                value={spotLow}
                onChange={(e) => setSpotLow(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="1240"
                step="0.01"
              />
            </div>

            {/* Spot Range High */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Expected Spot High (₩/USD)
              </label>
              <input
                type="number"
                value={spotHigh}
                onChange={(e) => setSpotHigh(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="1360"
                step="0.01"
              />
            </div>
          </div>

          {/* Calculate Button */}
          <button
            onClick={handleCalculate}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <CalcIcon className="w-5 h-5" />
            {t('calculator.calculate')}
          </button>

          {/* Results */}
          {results && (
            <div className="mt-8 pt-8 border-t border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                {t('calculator.results')}
              </h3>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                {/* Hedged */}
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <div className="text-sm text-green-400 font-semibold">
                      {t('calculator.hedged')}
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white">
                    ₩{results.hedged.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </div>
                </div>

                {/* Unhedged Low */}
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingDown className="w-5 h-5 text-red-400" />
                    <div className="text-sm text-red-400 font-semibold">
                      {t('calculator.unhedgedLow')}
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white">
                    ₩{results.unhedgedLow.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </div>
                </div>

                {/* Unhedged High */}
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-red-400" />
                    <div className="text-sm text-red-400 font-semibold">
                      {t('calculator.unhedgedHigh')}
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white">
                    ₩{results.unhedgedHigh.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </div>
                </div>
              </div>

              <button
                onClick={handleExport}
                className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                {t('calculator.exportPdf')}
              </button>
            </div>
          )}

          {/* Disclaimer */}
          <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <p className="text-sm text-yellow-400 text-center">
              {t('calculator.disclaimer')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

