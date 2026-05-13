'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function VisionPage() {
  return (
    <div className="min-h-screen bg-white pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6">Our Vision</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Transform how India learns, works, and grows.</p>
        </motion.div>

        <div className="space-y-12">
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">2026: Foundation</h2>
            <p className="text-lg text-gray-600 leading-relaxed">Build the platform. Onboard 10,000 students. Help 500 startups scale. Establish SwapSkill as the go-to skill exchange ecosystem in India.</p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">2027: Expansion</h2>
            <p className="text-lg text-gray-600 leading-relaxed">Scale to 100,000 users across India. Launch mobile app. Partner with 100+ colleges. Become the trusted bridge between education and industry.</p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">2030: Transformation</h2>
            <p className="text-lg text-gray-600 leading-relaxed">1 million users. Offices in 5 major cities. Global expansion to Southeast Asia. Redefine how people build careers through real experience, not credentials alone.</p>
          </section>

          <section className="bg-gray-900 text-white p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">Our Bigger Why</h2>
            <p className="text-lg leading-relaxed">In India, 400+ million young people are entering the workforce. Traditional education hasn't changed. Employers still look for "experience" that doesn't exist. SwapSkill fixes this gap by creating the world's largest peer-to-peer skill exchange network, powered by reputation and real work.</p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <Link href="/" className="text-gray-600 hover:text-gray-900 font-medium">← Back to home</Link>
        </div>
      </div>
    </div>
  )
}
