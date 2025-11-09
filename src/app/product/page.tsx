'use client'

import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import FeatureGrid from '@/components/FeatureGrid'
import { useLocale } from '@/contexts/LocaleContext'

export default function ProductPage() {
  const { t } = useLocale()

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <Nav />

      <section className="pt-32 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <p className="text-sm uppercase tracking-widest text-blue-300">Product</p>
          <h1 className="text-4xl sm:text-5xl font-semibold leading-tight">{t('hero.title')}</h1>
          <p className="text-lg text-gray-300">{t('hero.subtitle')}</p>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">SEAL feature set</h2>
            <p className="text-gray-400">
              The feature grid mirrors how we prevent the failure patterns we briefed on:
              policy-as-code, hardware-bound approvals, simulation, circuit breakers, and a
              tamper-proof audit ledger.
            </p>
          </div>
          <FeatureGrid />
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4" id="formulas">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <p className="text-sm uppercase tracking-wide text-blue-300">Pricing math</p>
            <p className="text-lg text-gray-100">{t('product.formulas')}</p>
            <p className="mt-4 text-sm text-gray-400">
              We default to USD Act/360, KRW Act/365, and use log-discount-factor interpolation for odd
              dates. The same logic powers the theoretical curve inside the demo.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
