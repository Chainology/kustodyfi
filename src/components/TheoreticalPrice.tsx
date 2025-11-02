'use client'

import { useLocale } from '@/contexts/LocaleContext'
import { TrendingUp } from 'lucide-react'

export default function TheoreticalPrice() {
  const { t } = useLocale()

  return (
    <section id="theoretical-price" className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            {t('theoreticalPrice.title')}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('theoreticalPrice.subtitle')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-8 mb-8 shadow-2xl">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-3">
                  {t('theoreticalPrice.formula.title')}
                </h3>
                <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
                  <code className="text-blue-400 font-mono text-sm sm:text-base break-all">
                    {t('theoreticalPrice.formula.equation')}
                  </code>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {t('theoreticalPrice.formula.explanation')}
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {(t('theoreticalPrice.features') as string[]).map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 flex items-center gap-3"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                <span className="text-gray-300">{feature}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-400 bg-gray-800/50 rounded-lg p-4 inline-block">
              {t('theoreticalPrice.tenors')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

