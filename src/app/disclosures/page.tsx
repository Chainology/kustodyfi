import Link from 'next/link'
import type { Metadata } from 'next'
import { AlertTriangle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Disclosures | KustodyFi',
  description: 'Important legal disclosures and risk warnings for KustodyFi services.',
}

export default function DisclosuresPage() {
  return (
    <main className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="mb-12">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-8 inline-block"
          >
            KustodyFi
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Disclosures & Risk Warnings
          </h1>
          <p className="text-gray-400">Last updated: November 2, 2025</p>
        </div>

        <div className="bg-yellow-900/30 border border-yellow-700 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-lg font-bold text-yellow-300 mb-2">
                Important Risk Warnings
              </h2>
              <p className="text-yellow-200 text-sm">
                Trading foreign exchange involves substantial risk of loss and is not suitable for all investors.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">Not an Exchange or Broker</h2>
            <p className="text-gray-300">
              KustodyFi is a technology service provider and custody platform. We do not operate as an exchange or execute trades on behalf of clients.
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">Illustrative Analytics Only</h2>
            <p className="text-gray-300">
              The calendar risk calculator and other analytics tools are for illustrative and educational purposes only. Not investment advice.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <Link
            href="/"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}

