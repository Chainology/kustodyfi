'use client'

import { useLocale } from '@/contexts/LocaleContext'
import Link from 'next/link'

export default function Footer() {
  const { t } = useLocale()

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
              KustodyFi
            </div>
            <p className="text-sm text-gray-400">
              {t('footer.tagline')}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">{t('footer.company')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  {t('footer.aboutUs')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  {t('footer.careers')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">{t('footer.legal')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link href="/disclosures" className="text-sm text-gray-400 hover:text-white transition-colors">
                  {t('footer.disclosures')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">{t('footer.resources')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  {t('footer.documentation')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              {t('footer.copyright')}
            </p>
            <p className="text-xs text-gray-500">
              {t('footer.disclaimer')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

