import { describe, it, expect } from 'vitest'
import {
  calculateTimeToSettlement,
  calculateForwardRate,
  calculateCalendarRisk,
  formatKRW,
  formatUSD,
} from './calculator'

describe('calculateTimeToSettlement', () => {
  it('should calculate time in years correctly', () => {
    const today = new Date()
    const futureDate = new Date(today)
    futureDate.setDate(today.getDate() + 365)
    
    const years = calculateTimeToSettlement(futureDate)
    expect(years).toBeCloseTo(1, 2)
  })
  
  it('should calculate T+2 correctly', () => {
    const today = new Date()
    const t2 = new Date(today)
    t2.setDate(today.getDate() + 2)
    
    const years = calculateTimeToSettlement(t2)
    expect(years).toBeCloseTo(2 / 365, 4)
  })
})

describe('calculateForwardRate', () => {
  it('should calculate forward rate with basic inputs', () => {
    const spot = 1300
    const usdRate = 5.25  // 5.25%
    const krwRate = 3.50  // 3.50%
    const timeYears = 1
    const basisBps = 0
    
    const forward = calculateForwardRate(spot, usdRate, krwRate, timeYears, basisBps)
    
    // F = 1300 × (1 + 0.0525 × 1) / (1 + 0.0350 × 1)
    // F = 1300 × 1.0525 / 1.0350
    // F ≈ 1321.98
    expect(forward).toBeCloseTo(1321.98, 1)
  })
  
  it('should add basis correctly', () => {
    const spot = 1300
    const usdRate = 5.25
    const krwRate = 3.50
    const timeYears = 1
    const basisBps = 100  // 100 bps = 1%
    
    const forward = calculateForwardRate(spot, usdRate, krwRate, timeYears, basisBps)
    
    // Base forward ≈ 1321.98
    // Basis = 100 bps = 0.01 × 1300 = 13
    // Total ≈ 1334.98
    expect(forward).toBeCloseTo(1334.98, 1)
  })
  
  it('should handle short time periods (T+2)', () => {
    const spot = 1300
    const usdRate = 5.25
    const krwRate = 3.50
    const timeYears = 2 / 365  // T+2 days
    const basisBps = 10
    
    const forward = calculateForwardRate(spot, usdRate, krwRate, timeYears, basisBps)
    
    // Should be very close to spot for such a short period
    expect(forward).toBeGreaterThan(spot)
    expect(forward).toBeLessThan(spot + 5)
  })
})

describe('calculateCalendarRisk', () => {
  it('should calculate hedged and unhedged amounts correctly', () => {
    const settlementDate = new Date()
    settlementDate.setDate(settlementDate.getDate() + 30)
    
    const results = calculateCalendarRisk({
      direction: 'receive',
      usdAmount: 1000000,
      settlementDate,
      spotRate: 1300,
      forwardRate: 1305,
      spotLow: 1240,
      spotHigh: 1360,
    })
    
    expect(results.hedgedKrw).toBe(1305000000)
    expect(results.unhedgedLowKrw).toBe(1240000000)
    expect(results.unhedgedHighKrw).toBe(1360000000)
    expect(results.forwardRate).toBe(1305)
  })
  
  it('should auto-calculate forward rate when not provided', () => {
    const settlementDate = new Date()
    settlementDate.setDate(settlementDate.getDate() + 365)
    
    const results = calculateCalendarRisk({
      direction: 'receive',
      usdAmount: 1000000,
      settlementDate,
      spotRate: 1300,
      usdRate: 5.25,
      krwRate: 3.50,
      basisBps: 50,
      spotLow: 1240,
      spotHigh: 1360,
    })
    
    // Forward should be auto-calculated
    expect(results.forwardRate).toBeGreaterThan(1300)
    expect(results.hedgedKrw).toBe(results.forwardRate * 1000000)
  })
  
  it('should use spot rate as fallback when no forward or rates provided', () => {
    const settlementDate = new Date()
    settlementDate.setDate(settlementDate.getDate() + 30)
    
    const results = calculateCalendarRisk({
      direction: 'receive',
      usdAmount: 1000000,
      settlementDate,
      spotRate: 1300,
      spotLow: 1240,
      spotHigh: 1360,
    })
    
    expect(results.forwardRate).toBe(1300)
    expect(results.hedgedKrw).toBe(1300000000)
  })
})

describe('formatKRW', () => {
  it('should format KRW correctly', () => {
    const formatted = formatKRW(1300000000)
    expect(formatted).toContain('1,300,000,000')
    expect(formatted).toContain('₩')
  })
})

describe('formatUSD', () => {
  it('should format USD correctly', () => {
    const formatted = formatUSD(1000000)
    expect(formatted).toContain('1,000,000')
    expect(formatted).toContain('$')
  })
})

