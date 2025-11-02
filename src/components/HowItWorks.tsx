'use client'

import { useLocale } from '@/contexts/LocaleContext'
import { 
  FileText, 
  MessageSquare, 
  Building2, 
  CheckCircle2, 
  Send, 
  FileCheck 
} from 'lucide-react'

export default function HowItWorks() {
  const { t } = useLocale()

  const steps = [
    { icon: FileText, color: 'blue' },
    { icon: MessageSquare, color: 'purple' },
    { icon: Building2, color: 'green' },
    { icon: CheckCircle2, color: 'yellow' },
    { icon: Send, color: 'orange' },
    { icon: FileCheck, color: 'pink' },
  ]

  return (
    <section id="how-it-works" className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t('howItWorks.title')}
          </h2>
          <p className="text-xl text-gray-400">
            {t('howItWorks.subtitle')}
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon
              const stepData = t(`howItWorks.steps.${index}`) as any
              
              return (
                <div
                  key={index}
                  className="flex gap-6 group hover:transform hover:scale-[1.02] transition-all duration-300"
                >
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-16 h-16 rounded-xl bg-${step.color}-500/20 border border-${step.color}-500/30 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-8 h-8 text-${step.color}-400`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-gray-800/50 rounded-xl p-6 border border-gray-700 group-hover:border-gray-600 transition-colors">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {stepData.title}
                    </h3>
                    <p className="text-gray-400">
                      {stepData.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Flow Diagram */}
          <div className="mt-12 p-8 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl border border-gray-700">
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-gray-400">
              <span className="px-3 py-1 bg-blue-500/20 rounded-full text-blue-400">Client</span>
              <span>→</span>
              <span className="px-3 py-1 bg-purple-500/20 rounded-full text-purple-400">SEAL</span>
              <span>→</span>
              <span className="px-3 py-1 bg-green-500/20 rounded-full text-green-400">Bank</span>
              <span>→</span>
              <span className="px-3 py-1 bg-yellow-500/20 rounded-full text-yellow-400">Approval</span>
              <span>→</span>
              <span className="px-3 py-1 bg-orange-500/20 rounded-full text-orange-400">Settlement</span>
              <span>→</span>
              <span className="px-3 py-1 bg-pink-500/20 rounded-full text-pink-400">Audit</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

