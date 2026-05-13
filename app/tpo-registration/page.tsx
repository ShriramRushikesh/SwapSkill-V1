'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { GraduationCap, TrendingUp, Users, Building, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react'

export default function TPORegistration() {
  const benefits = [
    {
      title: 'Industry Alignment',
      desc: 'Align your curriculum with real-world startup requirements through direct student exposure.',
      icon: <Building className="text-gray-900" size={24} />
    },
    {
      title: 'Placement Analytics',
      desc: 'Real-time dashboard to track student projects, reviews, and placement readiness scores.',
      icon: <TrendingUp className="text-gray-900" size={24} />
    },
    {
      title: 'Verified Reputation',
      desc: 'Every project completed adds to your institute\'s national reputation on SwapSkill.',
      icon: <ShieldCheck className="text-gray-900" size={24} />
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 container-max">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-100">
              <GraduationCap size={14} className="text-gray-400" />
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Institutional Partners</span>
            </div>
            
            <h1 className="text-6xl sm:text-7xl font-black text-gray-900 tracking-tighter leading-[0.9]">
              The Future of <br/>
              <span className="text-gray-400">Campus Placement.</span>
            </h1>
            
            <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
              Empower your students with real-world exposure. Track growth, build industry ties, and achieve 100% meaningful placements.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Link 
                href="/signup?role=tpo" 
                className="w-full sm:w-auto bg-gray-900 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-gray-900/20 flex items-center justify-center gap-2"
              >
                Start Registration <ArrowRight size={18} />
              </Link>
              <Link 
                href="/about" 
                className="w-full sm:w-auto bg-gray-50 text-gray-600 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest border border-gray-100 hover:bg-white transition-all flex items-center justify-center"
              >
                Download Brochure
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 bg-gray-50/50 px-6 border-y border-gray-100">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          {benefits.map((b, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="space-y-6"
            >
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-100">
                {b.icon}
              </div>
              <h3 className="text-xl font-black text-gray-900 tracking-tight">{b.title}</h3>
              <p className="text-gray-500 font-medium leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Feature Showcase */}
      <section className="py-32 px-6 container-max">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <h2 className="text-4xl font-black text-gray-900 tracking-tight leading-tight">
              A comprehensive <br/>
              command center for <br/>
              Institutional growth.
            </h2>
            
            <div className="space-y-6">
              {[
                'Automated student portfolio generation',
                'Verified industry feedback tracking',
                'Direct pipeline to top-tier startups',
                'Institutional prestige monitoring'
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                    <CheckCircle2 size={14} className="text-emerald-500 group-hover:text-white transition-colors" />
                  </div>
                  <span className="font-bold text-gray-600">{text}</span>
                </div>
              ))}
            </div>

            <div className="pt-6">
               <Link href="/signup?role=tpo" className="text-gray-900 font-black text-xs uppercase tracking-widest border-b-2 border-gray-900 pb-2 hover:text-gray-400 hover:border-gray-400 transition-all">
                Join 50+ Institutional Partners →
               </Link>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-video bg-gray-900 rounded-[3rem] overflow-hidden shadow-2xl relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 opacity-50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto border border-white/20">
                    <TrendingUp className="text-white" size={32} />
                  </div>
                  <p className="text-white/50 font-black text-[10px] uppercase tracking-widest">Live Dashboard Preview</p>
                </div>
              </div>
            </div>
            {/* Decorators */}
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-gray-100 rounded-[3rem] -z-10" />
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-brand-primary rounded-full blur-3xl opacity-20 -z-10" />
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 bg-gray-900 text-white text-center px-6">
        <h2 className="text-3xl font-black mb-8 tracking-tight">Ready to transform your institute?</h2>
        <Link 
          href="/signup?role=tpo" 
          className="inline-block bg-white text-gray-900 px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-white/10"
        >
          Begin Onboarding
        </Link>
      </section>
    </div>
  )
}
