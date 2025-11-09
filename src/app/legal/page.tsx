'use client'

import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { useLocale } from '@/contexts/LocaleContext'

export default function LegalPage() {
  const { t } = useLocale()

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <Nav />

      <section className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div>
            <p className="text-sm uppercase tracking-widest text-blue-300">Legal</p>
            <h1 className="text-4xl font-semibold">Disclosures</h1>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-lg text-gray-100">
            {t('legal.disclosure')}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
