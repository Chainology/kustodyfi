'use client'

import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Problem from '@/components/Problem'
import Calculator from '@/components/Calculator'
import HowItWorks from '@/components/HowItWorks'
import SealCustody from '@/components/SealCustody'
import Compliance from '@/components/Compliance'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <Problem />
      <Calculator />
      <HowItWorks />
      <SealCustody />
      <Compliance />
      <Contact />
      <Footer />
    </main>
  )
}
