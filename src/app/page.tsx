'use client'

import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Problem from '@/components/Problem'
import TheoreticalPrice from '@/components/TheoreticalPrice'
import Calculator from '@/components/Calculator'
import HowItWorks from '@/components/HowItWorks'
import SealCustody from '@/components/SealCustody'
import MarketFit from '@/components/MarketFit'
import Compliance from '@/components/Compliance'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <Problem />
      <TheoreticalPrice />
      <Calculator />
      <HowItWorks />
      <SealCustody />
      <MarketFit />
      <Compliance />
      <Contact />
      <Footer />
    </main>
  )
}
