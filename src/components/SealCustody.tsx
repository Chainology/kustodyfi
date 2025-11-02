'use client'

import { useLocale } from '@/contexts/LocaleContext'
import { Shield, Users, Code, Lock, FileCheck } from 'lucide-react'

export default function SealCustody() {
  const { t } = useLocale()

  const features = [
    { icon: Users, color: 'blue' },
    { icon: Code, color: 'purple' },
    { icon: Lock, color: 'green' },
    { icon: FileCheck, color: 'yellow' },
  ]

  return (
    <section id="custody" className="py-24 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t('sealCustody.title')}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t('sealCustody.subtitle')}
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const featureData = t(`sealCustody.features.${index}`) as any
            
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition-all hover:transform hover:scale-[1.02] duration-300"
              >
                <div className={`w-14 h-14 rounded-xl bg-${feature.color}-500/20 border border-${feature.color}-500/30 flex items-center justify-center mb-4`}>
                  <Icon className={`w-7 h-7 text-${feature.color}-400`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {featureData.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {featureData.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Architecture Diagram */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-white text-center mb-6">
              {t('sealCustody.schematic.title')}
            </h3>
            
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
              <div className="px-4 py-3 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-400 font-semibold">
                Client Request
              </div>
              <span className="text-gray-600">→</span>
              <div className="px-4 py-3 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-400 font-semibold">
                SEAL Policy Check
              </div>
              <span className="text-gray-600">→</span>
              <div className="px-4 py-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-400 font-semibold">
                Dual Approval
              </div>
              <span className="text-gray-600">→</span>
              <div className="px-4 py-3 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 font-semibold">
                Bank Execution
              </div>
              <span className="text-gray-600">→</span>
              <div className="px-4 py-3 bg-orange-500/20 border border-orange-500/30 rounded-lg text-orange-400 font-semibold">
                Custody Settlement
              </div>
              <span className="text-gray-600">→</span>
              <div className="px-4 py-3 bg-pink-500/20 border border-pink-500/30 rounded-lg text-pink-400 font-semibold">
                Audit Log
              </div>
            </div>

            <p className="text-center text-gray-500 mt-6 text-sm">
              {t('sealCustody.schematic.description')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

