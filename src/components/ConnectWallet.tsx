'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { useEffect, useState } from 'react'
import { trackEvent } from '@/lib/analytics'
import { useLocale } from '@/contexts/LocaleContext'

export default function ConnectWallet() {
  const { address, isConnected } = useAccount()
  const { locale } = useLocale()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isConnected && address) {
      trackEvent('wallet_connected', { address: address.slice(0, 6) + '...' })
    }
  }, [isConnected, address])

  const labels = {
    en: {
      connect: 'Connect Wallet',
      wrongNetwork: 'Wrong Network',
    },
    ko: {
      connect: '지갑 연결',
      wrongNetwork: '잘못된 네트워크',
    },
  }

  const t = labels[locale]

  // Prevent hydration mismatch by only rendering after mount
  if (!mounted) {
    return (
      <div className="px-4 py-2 bg-gray-800 rounded-lg">
        <span className="text-sm text-gray-400">Loading...</span>
      </div>
    )
  }

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted
        const connected = ready && account && chain

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-medium transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
                  >
                    {t.connect}
                  </button>
                )
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all"
                  >
                    {t.wrongNetwork}
                  </button>
                )
              }

              return (
                <div className="flex items-center gap-2">
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all flex items-center gap-2"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 20,
                          height: 20,
                          borderRadius: 999,
                          overflow: 'hidden',
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 20, height: 20 }}
                          />
                        )}
                      </div>
                    )}
                    <span className="text-sm font-medium text-gray-300">
                      {chain.name}
                    </span>
                  </button>

                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all"
                  >
                    <span className="text-sm font-medium text-white">
                      {account.displayName}
                    </span>
                    {account.displayBalance && (
                      <span className="text-xs text-gray-400 ml-2">
                        {account.displayBalance}
                      </span>
                    )}
                  </button>
                </div>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}

