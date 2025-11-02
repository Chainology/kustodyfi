/**
 * Calendar Risk Calculator Utilities
 * Forward pricing model: F ≈ S × (1 + r_usd × t) / (1 + r_krw × t) + basis
 */

/**
 * Calculate time in years from today to settlement date
 */
export function calculateTimeToSettlement(settlementDate: Date): number {
  const today = new Date()
  const diffMs = settlementDate.getTime() - today.getTime()
  const diffDays = diffMs / (1000 * 60 * 60 * 24)
  return diffDays / 365
}

/**
 * Calculate years between two dates (alias for backward compatibility)
 */
export function calculateYearsBetweenDates(date1: Date, date2: Date): number {
  const diffMs = Math.abs(date2.getTime() - date1.getTime())
  const diffDays = diffMs / (1000 * 60 * 60 * 24)
  return diffDays / 365.25
}

/**
 * Calculate theoretical forward rate using interest rate parity
 * @param spot - Current spot rate (KRW/USD)
 * @param usdRate - USD interest rate in percentage (e.g., 5.25 for 5.25%)
 * @param krwRate - KRW interest rate in percentage (e.g., 3.50 for 3.50%)
 * @param timeYears - Time to settlement in years
 * @param basisBps - Basis in basis points (e.g., 10 for 10 bps)
 * @returns Theoretical forward rate
 */
export function calculateForwardRate(
  spot: number,
  usdRate: number,
  krwRate: number,
  timeYears: number,
  basisBps: number = 0
): number {
  // Convert percentages to decimals
  const rUsd = usdRate / 100
  const rKrw = krwRate / 100
  
  // Convert basis points to rate (1 bp = 0.01%)
  const basisRate = (basisBps / 10000)
  
  // Forward rate formula: F = S × (1 + r_usd × t) / (1 + r_krw × t) + basis
  const forward = (spot * (1 + rUsd * timeYears)) / (1 + rKrw * timeYears)
  
  // Add basis to forward
  return forward + (basisRate * spot)
}

/**
 * Calculate hedged and unhedged KRW amounts
 */
export interface CalendarRiskInputs {
  direction: 'receive' | 'pay'
  usdAmount: number
  settlementDate: Date
  spotRate: number
  forwardRate?: number
  usdRate?: number
  krwRate?: number
  basisBps?: number
  spotLow: number
  spotHigh: number
}

export interface CalendarRiskResults {
  hedgedKrw: number
  unhedgedLowKrw: number
  unhedgedHighKrw: number
  forwardRate: number
  timeToSettlement: number
}

export function calculateCalendarRisk(inputs: CalendarRiskInputs): CalendarRiskResults {
  const timeYears = calculateTimeToSettlement(inputs.settlementDate)
  
  // Use provided forward rate or calculate it
  let forwardRate = inputs.forwardRate
  
  if (!forwardRate && inputs.usdRate !== undefined && inputs.krwRate !== undefined) {
    forwardRate = calculateForwardRate(
      inputs.spotRate,
      inputs.usdRate,
      inputs.krwRate,
      timeYears,
      inputs.basisBps || 0
    )
  } else if (!forwardRate) {
    // Default: use spot if no forward provided and no rates to calculate
    forwardRate = inputs.spotRate
  }
  
  // Calculate KRW amounts
  const hedgedKrw = forwardRate * inputs.usdAmount
  const unhedgedLowKrw = inputs.spotLow * inputs.usdAmount
  const unhedgedHighKrw = inputs.spotHigh * inputs.usdAmount
  
  return {
    hedgedKrw,
    unhedgedLowKrw,
    unhedgedHighKrw,
    forwardRate,
    timeToSettlement: timeYears,
  }
}

/**
 * Generate SHA-256 hash of calculation inputs
 */
export async function generateReportHash(inputs: CalendarRiskInputs): Promise<string> {
  const data = JSON.stringify({
    direction: inputs.direction,
    usdAmount: inputs.usdAmount,
    settlementDate: inputs.settlementDate.toISOString(),
    spotRate: inputs.spotRate,
    forwardRate: inputs.forwardRate,
    usdRate: inputs.usdRate,
    krwRate: inputs.krwRate,
    basisBps: inputs.basisBps,
    spotLow: inputs.spotLow,
    spotHigh: inputs.spotHigh,
  })
  
  const encoder = new TextEncoder()
  const dataBuffer = encoder.encode(data)
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  
  return hashHex
}

/**
 * Format number as KRW currency
 */
export function formatKRW(amount: number): string {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Format number as USD currency
 */
export function formatUSD(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

