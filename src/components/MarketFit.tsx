'use client'

import { useLocale } from '@/contexts/LocaleContext'
import { Building2, Landmark, CheckCircle2 } from 'lucide-react'

export default function MarketFit() {
  const { t } = useLocale()

  return (
    <section id="market-fit" className="py-24 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            {t('marketFit.title')}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('marketFit.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* For Corporates */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700 p-8 shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                {t('marketFit.forCorporates.title')}
              </h3>
            </div>
            <ul className="space-y-4">
              {(t('marketFit.forCorporates.features') as string[]).map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300 leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* For Banks */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700 p-8 shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Landmark className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                {t('marketFit.forBanks.title')}
              </h3>
            </div>
            <ul className="space-y-4">
              {(t('marketFit.forBanks.features') as string[]).map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300 leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

