'use client'

import { useLocale } from '@/contexts/LocaleContext'
import { CheckCircle2 } from 'lucide-react'

export default function FeatureGrid() {
  const { t } = useLocale()
  const features = t('product.seal.features') as string[]

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur"
        >
          <CheckCircle2 className="mt-1 h-5 w-5 text-blue-400" />
          <p className="text-sm text-white/90">{feature}</p>
        </div>
      ))}
    </div>
  )
}
