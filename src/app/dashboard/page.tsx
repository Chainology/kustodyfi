'use client'

import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function DashboardPage() {
  const { address, isConnected } = useAccount()
  const router = useRouter()

  useEffect(() => {
    if (!isConnected) {
      router.push('/')
    }
  }, [isConnected, router])

  if (!isConnected) {
    return null
  }

  return (
    <main className="min-h-screen bg-gray-900">
      <div className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-white mb-4">Dashboard</h1>
        <p className="text-xl text-gray-400 mb-12">
          Manage your wallet and view your KustodyFi activity
        </p>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-4">Your Wallet</h2>
          <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-400 mb-2">Wallet Address</p>
            <code className="text-white font-mono text-sm">{address}</code>
          </div>
          <div className="bg-blue-900/20 border border-blue-700 rounded-xl p-6 mt-8">
            <h3 className="text-lg font-bold text-white mb-2">🎉 Welcome to KustodyFi</h3>
            <p className="text-gray-300">
              Your wallet is connected! This is a demo dashboard. Full features coming soon.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

