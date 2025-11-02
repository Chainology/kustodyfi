import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | KustodyFi',
  description: 'KustodyFi privacy policy and data handling practices.',
}

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-gray-400">Last updated: November 2, 2025</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
          <p className="text-gray-300 mb-6">
            KustodyFi is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4 mt-8">Information We Collect</h2>
          <p className="text-gray-300">
            We collect information that you provide directly to us, including contact information, account credentials, and transaction data.
          </p>
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

