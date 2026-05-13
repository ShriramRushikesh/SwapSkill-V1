'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Quote, ArrowRight, Star, Heart, TrendingUp } from 'lucide-react'

export default function SuccessStories() {
  const stories = [
    {
      name: 'Priya Kumar',
      role: 'IIT Delhi, Final Year',
      story: 'Got real project experience in 3 months. Built portfolio. Now have 3 internship offers. SwapSkill changed my career trajectory completely.',
      avatar: 'PK',
      badge: 'Student Elite',
      accent: 'bg-indigo-500'
    },
    {
      name: 'Arjun Patel',
      role: 'Founder, Series A Startup',
      story: 'Found talented interns affordably. Shipped features 2x faster. Growing without heavy hiring costs. The quality of talent here is unmatched.',
      avatar: 'AP',
      badge: 'Startup Founder',
      accent: 'bg-emerald-500'
    },
    {
      name: 'Rajesh Sharma',
      role: 'Ex-Google, 15yr Experience',
      story: 'Guide young talent. Stay connected to innovation. Finally found a way to give back meaningfully to the Indian ecosystem.',
      avatar: 'RS',
      badge: 'Expert Mentor',
      accent: 'bg-amber-500'
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
              <Star size={14} className="text-amber-500 fill-amber-500" />
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Impact Stories</span>
            </div>
            
            <h1 className="text-6xl sm:text-7xl font-black text-gray-900 tracking-tighter leading-[0.9]">
              Growth <br/>
              <span className="text-gray-400">is better shared.</span>
            </h1>
            
            <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
              Real results from the people building the next generation of Indian startups.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-24 px-6 container-max">
        <div className="grid lg:grid-cols-3 gap-12">
          {stories.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white p-10 rounded-[3rem] border border-gray-100 hover:border-gray-900/10 transition-all hover:shadow-2xl hover:shadow-gray-900/5 flex flex-col justify-between min-h-[450px]"
            >
              <div className="space-y-8">
                <div className={`w-12 h-12 rounded-2xl ${s.accent} flex items-center justify-center text-white shadow-lg`}>
                  <Quote size={20} />
                </div>
                
                <p className="text-xl font-bold text-gray-900 leading-relaxed tracking-tight italic">
                  "{s.story}"
                </p>
              </div>

              <div className="pt-10 flex items-center gap-6 border-t border-gray-50">
                <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center text-lg font-black text-gray-400">
                  {s.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-black text-gray-900">{s.name}</h4>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{s.badge}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 bg-gray-900 text-white overflow-hidden relative">
         {/* Background Decorator */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-primary/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
        
        <div className="container-max px-6 relative z-10">
          <div className="grid md:grid-cols-3 gap-16 text-center">
            <div>
              <p className="text-5xl font-black mb-4">1200+</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/50">Successful Swaps</p>
            </div>
            <div>
              <p className="text-5xl font-black mb-4">450+</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/50">Verified Mentors</p>
            </div>
            <div>
              <p className="text-5xl font-black mb-4">85%</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/50">Placement Conversion</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 px-6 text-center bg-white">
        <h2 className="text-4xl font-black text-gray-900 mb-10 tracking-tight">Become our next success story.</h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link href="/signup" className="bg-gray-900 text-white px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-gray-900/20">
            Join the Ecosystem
          </Link>
          <Link href="/explore" className="text-gray-900 font-black text-sm uppercase tracking-widest border-b-2 border-gray-900 pb-2 hover:text-gray-400 hover:border-gray-400 transition-all">
            Explore Opportunities
          </Link>
        </div>
      </section>
    </div>
  )
}
