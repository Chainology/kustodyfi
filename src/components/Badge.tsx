'use client'

import { ReactNode } from 'react'
import clsx from 'clsx'

interface BadgeProps {
  children: ReactNode
  variant?: 'primary' | 'secondary'
}

export default function Badge({ children, variant = 'primary' }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border',
        variant === 'primary'
          ? 'bg-blue-500/10 text-blue-200 border-blue-500/40'
          : 'bg-gray-800 text-gray-200 border-gray-700'
      )}
    >
      {children}
    </span>
  )
}
