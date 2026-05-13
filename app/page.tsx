'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function LandingPage() {
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState({ users: 0, projects: 0, swaps: 0 })
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUser(data.user)
    })

    supabase.from('profiles').select('*', { count: 'exact', head: true }).then(({ count }) => setStats(s => ({ ...s, users: count || 0 })))
    supabase.from('swap_posts').select('*', { count: 'exact', head: true }).then(({ count }) => setStats(s => ({ ...s, projects: count || 0 })))
    supabase.from('swap_requests').select('*', { count: 'exact', head: true }).eq('status', 'completed').then(({ count }) => setStats(s => ({ ...s, swaps: count || 0 })))
  }, [supabase])

  if (user) return (
    <div className="min-h-screen flex items-center justify-center bg-white pt-14">
      <div className="animate-fade-in text-center">
        <h2 className="h2 mb-8">Welcome back!</h2>
        <Link href="/explore" className="btn-base btn-primary !px-12 !py-4 shadow-xl inline-flex items-center gap-3">
          Explore Projects
          <span>→</span>
        </Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-white overflow-hidden pt-14">
      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'SwapSkill',
            description: 'Students gain real startup experience. Startups scale affordably. Mentors guide meaningful growth.',
            url: 'https://swapskill.com',
            applicationCategory: 'BusinessApplication',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'INR'
            },
            author: {
              '@type': 'Organization',
              name: 'SwapSkill'
            }
          })
        }}
      />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center container-x bg-gradient-to-br from-white via-gray-50/50 to-white overflow-hidden">
        
        {/* Static decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gray-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000" />
        </div>

        <div className="container-max text-center z-10 animate-slide-up">
          {/* Badge */}
          <div className="mb-8 flex justify-center">
            <span className="badge !px-4 !py-2 !text-[10px] uppercase tracking-widest bg-gray-100 text-gray-900 border-none font-bold">
              <span className="w-2 h-2 bg-gray-900 rounded-full animate-pulse mr-2 inline-block"/>
              Real Work. Real Experience. Real Growth.
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="h1 mb-8 tracking-tighter">
            Build Real Experience
            <br/>
            <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 bg-clip-text text-transparent italic">Scale Startups Affordably</span>
          </h1>

          {/* Subheading */}
          <p className="body-lg text-gray-400 font-medium mb-12 max-w-2xl mx-auto italic leading-relaxed">
            Students gain job-ready experience on real startup projects. Startups scale without hiring costs. Mentors guide meaningful growth.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Link href="/signup" className="btn-base btn-primary !px-12 !py-6 !rounded-2xl text-lg shadow-2xl flex items-center justify-center gap-3">
              Find Startup Work
              <span>→</span>
            </Link>
            <Link href="/signup" className="btn-base btn-secondary !px-12 !py-6 !rounded-2xl text-lg flex items-center justify-center gap-3">
              Post Your First Project
              <span>→</span>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 border-t border-gray-100 pt-16">
            {[
              { label: 'Students Ready', value: stats.users },
              { label: 'Startups Hiring', value: stats.projects },
              { label: 'Projects Completed', value: stats.swaps }
            ].map((stat, i) => (
              <div key={i} className="group cursor-default">
                <p className="text-3xl md:text-4xl font-black text-gray-900 group-hover:scale-110 transition-transform duration-500">{stat.value}+</p>
                <p className="caption mt-2 font-bold uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="section-py container-x bg-white border-y border-gray-100">
        <div className="container-max text-center">
          <h2 className="h2 mb-6 tracking-tight">Verified Trust Economy</h2>
          <p className="body-lg text-gray-400 font-bold max-w-4xl mx-auto italic">
            &quot;Every user is verified through LinkedIn or college credentials. We don&apos;t just exchange work—we build professional credibility that lasts a lifetime.&quot;
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-py container-x bg-gray-50/50">
        <div className="container-max">
          <div className="text-center mb-24">
            <h2 className="h1 mb-6 tracking-tighter">How It Works</h2>
            <p className="caption tracking-widest font-bold uppercase">Four roles. One ecosystem. Infinite growth.</p>
          </div>

          <div className="grid-responsive">
            {[
              {
                title: 'Join as Student / Startup / Mentor',
                desc: 'Create your profile and verify your credentials to join India\'s most trusted skill-exchange network.',
                icon: '🤝',
                color: 'bg-blue-50 text-blue-700'
              },
              {
                title: 'Find Real Opportunities',
                desc: 'Browse projects that match your skills or post your own startup challenges that need talent.',
                icon: '🔍',
                color: 'bg-purple-50 text-purple-700'
              },
              {
                title: 'Collaborate on Projects',
                desc: 'Connect with partners, define scope, and start working on real-world deliverables.',
                icon: '💻',
                color: 'bg-orange-50 text-orange-700'
              },
              {
                title: 'Build Portfolio & Experience',
                desc: 'Get verified feedback and earn reputation credits that prove your expertise to future employers.',
                icon: '📈',
                color: 'bg-green-50 text-green-700'
              }
            ].map((role, i) => (
              <div
                key={i}
                className="group card-base card-p card-hover !rounded-[2.5rem] !p-10 !duration-500 hover:-translate-y-2 border-none shadow-sm"
              >
                <div className={`w-14 h-14 ${role.color} rounded-2xl flex items-center justify-center text-2xl mb-8 group-hover:scale-110 transition-transform`}>{role.icon}</div>
                <h3 className="text-lg font-bold mb-4 tracking-tight leading-tight">{role.title}</h3>
                <p className="small !text-gray-500 font-medium italic leading-relaxed">{role.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-py container-x bg-gray-900 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#333,transparent)]" />
        </div>
        
        <div className="container-max z-10 relative">
          <h2 className="h1 mb-8 tracking-tighter !text-white">Ready to Build Real Impact?</h2>
          <p className="body-lg text-gray-400 font-bold mb-16 max-w-2xl mx-auto italic">Join 1000s of students and startups building the future of work in India.</p>
          
          <Link href="/signup" className="inline-flex items-center gap-4 bg-white hover:bg-gray-100 text-gray-900 px-16 py-8 rounded-[2rem] font-black text-xl transition-all shadow-2xl hover:scale-105 active:scale-95">
            Get Started Free
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12 container-x">
        <div className="container-max text-center">
          <p className="caption !text-gray-400 !tracking-[0.2em] font-bold">
            © 2026 SWAPSKILL • DEMOCRATIZING REAL-WORLD EXPERIENCE
          </p>
        </div>
      </footer>
    </div>
  )
}
