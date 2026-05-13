'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero */}
      <section className="px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6"
          >
            Our Mission
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            Democratize real-world experience. Connect students with startups. Enable meaningful mentorship. Transform how people learn and grow.
          </motion.p>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-8">The Problem</h2>
          <div className="space-y-6">
            <div className="p-6 sm:p-8 bg-gray-50 border border-gray-200 rounded-2xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">For Students</h3>
              <p className="text-gray-600">Graduate with degrees but zero real-world experience. College projects are dummy work. No portfolio. Employers want experience, not just grades.</p>
            </div>
            <div className="p-6 sm:p-8 bg-gray-50 border border-gray-200 rounded-2xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">For Startups</h3>
              <p className="text-gray-600">Need skilled help but can't afford full-time hires during foundation stage. Critical tasks pile up. Growth slows. Hiring is expensive.</p>
            </div>
            <div className="p-6 sm:p-8 bg-gray-50 border border-gray-200 rounded-2xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">For Mentors</h3>
              <p className="text-gray-600">Have years of valuable knowledge but no meaningful way to contribute. Retirement means knowledge wasted. No way to guide the next generation.</p>
            </div>
            <div className="p-6 sm:p-8 bg-gray-50 border border-gray-200 rounded-2xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">For Colleges</h3>
              <p className="text-gray-600">Can't give real industry exposure. Placements fail. Student outcomes suffer. Industry connection weak. No verified proof of practical work.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Solution */}
      <section className="px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-8">Our Solution</h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            SwapSkill is a practical experience and startup collaboration platform that solves these problems through a modern barter and reputation economy.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Real Work, Real Growth',
                desc: 'Students work on actual startup challenges, not dummy projects. Every project builds a real portfolio piece that employers actually value.'
              },
              {
                title: 'Affordable Scaling',
                desc: 'Startups find skilled students on-demand. Complete critical tasks 30% faster without the overhead of full-time hiring costs.'
              },
              {
                title: 'Meaningful Mentorship',
                desc: 'Experienced professionals guide startups and students. Knowledge is shared. Innovation is multiplied. Growth compounds.'
              },
              {
                title: 'Better Placements',
                desc: 'Colleges track student progress through real industry work. Placement readiness improves. Outcomes improve. Reputation builds.'
              }
            ].map((item, i) => (
              <div key={i} className="p-6 sm:p-8 bg-white border border-gray-200 rounded-2xl">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-8">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {[
              { icon: '⭐', title: 'Reputation Over Money', desc: 'Trust and credibility are the currency. Real contribution is rewarded.' },
              { icon: '🤝', title: 'Collaboration First', desc: 'Everyone wins. Students, startups, mentors, colleges — all grow together.' },
              { icon: '🎯', title: 'Real Experience Matters', desc: 'Portfolio beats credentials. Proof beats promises. Work speaks louder.' },
              { icon: '🌱', title: 'Sustainable Growth', desc: 'Build for long-term impact, not quick wins. Relationships matter.' }
            ].map((value, i) => (
              <div key={i} className="p-6 sm:p-8 bg-gray-50 border border-gray-200 rounded-2xl">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black mb-8">Our Impact</h2>
          <div className="grid md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { number: '1000+', label: 'Students & Professionals' },
              { number: '150+', label: 'Projects Posted' },
              { number: '45+', label: 'Completed Swaps' },
              { number: '10+', label: 'States in India' }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-4xl sm:text-5xl font-black mb-2">{stat.number}</p>
                <p className="text-gray-300 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6">Join the Movement</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">Be part of a platform that's changing how people learn, work, and grow.</p>
          <Link 
            href="/signup"
            className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-semibold transition"
          >
            Get Started Free
            <span>→</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
