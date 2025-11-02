'use client'

import { useLocale } from '@/contexts/LocaleContext'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

export default function Hero() {
  const { t } = useLocale()

  const scrollToCalculator = () => {
    const element = document.getElementById('calculator')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      trackEvent('cta_click', { cta: 'calculator', location: 'hero' })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-500/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            {t.hero.title}
          </h1>

          <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {t.hero.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full"
              >
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-300">{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={scrollToCalculator}
              className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-semibold text-lg transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg shadow-blue-500/50"
            >
              {t.hero.ctaCalculator}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

