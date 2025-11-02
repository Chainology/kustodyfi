'use client'

import { useLocale } from '@/contexts/LocaleContext'
import { AlertCircle, TrendingDown, TrendingUp, Shield } from 'lucide-react'

export default function Problem() {
  const { t } = useLocale()

  return (
    <section id="problem" className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl font-bold text-white text-center mb-4">
          {t('problem.title')}
        </h2>
        <p className="text-xl text-gray-400 text-center max-w-3xl mx-auto mb-16">
          {t('problem.subtitle')}
        </p>

        {/* Example Card */}
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="w-6 h-6 text-blue-400" />
            <h3 className="text-2xl font-bold text-white">
              {t('problem.example.title')}
            </h3>
          </div>
          
          <p className="text-lg text-gray-300 mb-8">
            {t('problem.example.scenario')}
          </p>

          {/* Timeline */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <div className="text-blue-400 font-semibold mb-2">
                {t('problem.example.tradeDate')}
              </div>
              <div className="text-gray-300">
                {t('problem.example.tradeDateDetail')}
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6 border border-yellow-600/30">
              <div className="text-yellow-400 font-semibold mb-2">
                {t('problem.example.settlementDate')}
              </div>
              <div className="text-gray-300">
                {t('problem.example.settlementDateDetail')}
              </div>
            </div>
          </div>

          {/* Risk Visualization */}
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <TrendingDown className="w-5 h-5 text-red-400" />
              <TrendingUp className="w-5 h-5 text-red-400" />
              <span className="text-red-400 font-semibold">Unhedged Risk</span>
            </div>
            <p className="text-gray-300 text-lg">
              {t('problem.example.loss')}
            </p>
          </div>

          {/* Solution */}
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-semibold">Hedged Solution</span>
            </div>
            <p className="text-gray-300 text-lg">
              {t('problem.example.solution')}
            </p>
          </div>
        </div>

        {/* Visual Chart */}
        <div className="max-w-4xl mx-auto mt-12 bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
          <h4 className="text-xl font-bold text-white text-center mb-8">
            {t('problem.chart.title')}
          </h4>
          
          <div className="space-y-4">
            {/* Unhedged Low */}
            <div className="flex items-center gap-4">
              <div className="w-32 text-sm text-gray-400">Unhedged Low</div>
              <div className="flex-1 bg-gray-700 rounded-full h-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 w-[60%] flex items-center justify-end pr-3">
                  <span className="text-white text-sm font-semibold">₩124M</span>
                </div>
              </div>
            </div>

            {/* Hedged */}
            <div className="flex items-center gap-4">
              <div className="w-32 text-sm text-gray-400">Hedged Fixed</div>
              <div className="flex-1 bg-gray-700 rounded-full h-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-500 w-[63%] flex items-center justify-end pr-3">
                  <span className="text-white text-sm font-semibold">₩130.5M</span>
                </div>
              </div>
            </div>

            {/* Unhedged High */}
            <div className="flex items-center gap-4">
              <div className="w-32 text-sm text-gray-400">Unhedged High</div>
              <div className="flex-1 bg-gray-700 rounded-full h-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 w-[66%] flex items-center justify-end pr-3">
                  <span className="text-white text-sm font-semibold">₩136M</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-500 text-center mt-6">
            Forward hedging eliminates calendar risk by locking in a fixed rate
          </p>
        </div>
      </div>
    </section>
  )
}

