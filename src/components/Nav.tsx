'use client'

import { useLocale } from '@/contexts/LocaleContext'
import { Globe } from 'lucide-react'
import ConnectWallet from './ConnectWallet'
import Link from 'next/link'
import { useAccount } from 'wagmi'
import { useState, useEffect } from 'react'

export default function Nav() {
  const { locale, setLocale, t } = useLocale()
  const { isConnected } = useAccount()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
            >
              KustodyFi
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('calculator')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {t.nav.calculator}
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {t.nav.howItWorks}
            </button>
            <button
              onClick={() => scrollToSection('custody')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {t.nav.custody}
            </button>
            {mounted && isConnected && (
              <Link
                href="/dashboard"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Dashboard
              </Link>
            )}
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {t.nav.contact}
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-gray-400" />
              <button
                onClick={() => setLocale(locale === 'en' ? 'ko' : 'en')}
                className="px-3 py-1 rounded-md bg-gray-800 hover:bg-gray-700 text-sm font-medium text-gray-300 transition-colors"
                aria-label="Toggle language"
              >
                {locale === 'en' ? '한국어' : 'English'}
              </button>
            </div>
            <ConnectWallet />
          </div>
        </div>
      </div>
    </nav>
  )
}

