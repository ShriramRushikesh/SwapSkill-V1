'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Award, Zap, MessageSquare, TrendingUp, ShieldCheck, Lock, Star, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function CommunityClient() {
  const [activeTab, setActiveTab] = useState('leaderboard')
  
  const topStudents = [
    { name: 'Arjun Mehta', score: 2450, role: 'Fullstack Dev', avatar: 'AM', rank: 1, level: 'Elite' },
    { name: 'Sanya Gupta', score: 2120, role: 'UI/UX Designer', avatar: 'SG', rank: 2, level: 'Gold' },
    { name: 'Rahul Verma', score: 1890, role: 'Mobile Dev', avatar: 'RV', rank: 3, level: 'Gold' },
    { name: 'Priya Singh', score: 1750, role: 'Product Manager', avatar: 'PS', rank: 4, level: 'Silver' },
    { name: 'Karan Johar', score: 1620, score_diff: '+45', role: 'DevOps', avatar: 'KJ', rank: 5, level: 'Silver' }
  ]

  return (
    <div className="min-h-screen bg-white pt-24 pb-20 px-6 container-max">
      <div className="flex flex-col lg:flex-row gap-10 items-start justify-between mb-16">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full border border-gray-100">
            <Users size={12} className="text-gray-400" />
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Community</span>
          </div>
          <h1 className="text-6xl font-black text-gray-900 tracking-tighter leading-none">The SwapSkill <br/>Network.</h1>
          <p className="text-xl text-gray-400 font-medium max-w-lg leading-relaxed">
            The elite layer of student talent in India. Build reputation, unlock early access, and grow together.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-gray-900 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-gray-900/20 w-full lg:w-80">
            <div className="flex items-center gap-3 mb-6">
              <Award className="text-brand-primary" size={24} />
              <p className="text-[10px] font-black uppercase tracking-[0.2em]">Reputation Logic</p>
            </div>
            <p className="text-sm font-bold text-white/70 mb-6 leading-relaxed">
              Students with <span className="text-white">1000+ reputation</span> get 24-hour early access to all premium projects.
            </p>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-brand-primary w-2/3" />
            </div>
            <p className="text-[10px] font-black mt-4 text-white/50 uppercase tracking-widest text-right">Progress to Elite Status</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-8 mb-12 border-b border-gray-100">
        {[
          { id: 'leaderboard', label: 'Leaderboard', icon: <Award size={16} /> },
          { id: 'feed', label: 'Live Activity', icon: <TrendingUp size={16} /> },
          { id: 'groups', label: 'Interest Groups', icon: <Users size={16} /> }
        ].map(t => (
          <button 
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`pb-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all relative ${
              activeTab === t.id ? 'text-gray-900' : 'text-gray-400 hover:text-gray-900'
            }`}
          >
            {t.icon} {t.label}
            {activeTab === t.id && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-16">
        {/* Main Content */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {activeTab === 'leaderboard' && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                {topStudents.map((s, i) => (
                  <div key={i} className="group bg-white p-6 rounded-[2rem] border border-gray-100 flex items-center justify-between hover:border-gray-900/10 transition-all">
                    <div className="flex items-center gap-6">
                      <div className="text-2xl font-black text-gray-200 group-hover:text-gray-900 transition-colors w-8">
                        #{s.rank}
                      </div>
                      <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-lg font-black text-gray-400 group-hover:bg-gray-900 group-hover:text-white transition-all">
                        {s.avatar}
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-gray-900 tracking-tight">{s.name}</h3>
                        <p className="text-xs font-bold text-gray-400">{s.role}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-8">
                      <div className="text-right">
                        <p className="text-xs font-black text-gray-900 tracking-widest">{s.score}</p>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Points</p>
                      </div>
                      <div className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                        s.level === 'Elite' ? 'bg-indigo-50 text-indigo-500 border-indigo-100' :
                        s.level === 'Gold' ? 'bg-amber-50 text-amber-500 border-amber-100' :
                        'bg-gray-50 text-gray-500 border-gray-100'
                      }`}>
                        {s.level}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'feed' && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-12"
              >
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex gap-6 relative">
                    {i !== 3 && <div className="absolute left-7 top-14 bottom-[-48px] w-0.5 bg-gray-50" />}
                    <div className="w-14 h-14 rounded-2xl bg-gray-50 flex-shrink-0 flex items-center justify-center">
                      <Zap size={20} className="text-amber-500" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-bold text-gray-900 leading-relaxed">
                        <span className="font-black">Startup Alpha</span> just posted a premium project: <span className="text-brand-primary">Next.js Dashboard Overhaul</span>.
                      </p>
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">2 min ago</span>
                        <span className="px-2 py-0.5 bg-brand-primary/10 text-brand-primary text-[8px] font-black uppercase tracking-widest rounded-full flex items-center gap-1">
                          <Lock size={8} /> Early Access Active
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-10">
          <div className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100">
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6">Hot Discussions</h3>
            <div className="space-y-6">
              {[
                { title: 'Scaling React apps in 2026', comments: 42 },
                { title: 'How to land remote startup roles', comments: 128 },
                { title: 'AI integration in SaaS models', comments: 56 }
              ].map((d, i) => (
                <div key={i} className="group cursor-pointer">
                  <h4 className="text-sm font-black text-gray-900 group-hover:text-brand-primary transition-colors mb-1">#{d.title}</h4>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400">
                    <MessageSquare size={10} /> {d.comments} active contributions
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-10 py-4 bg-white border border-gray-200 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all">
              Join Discussion
            </button>
          </div>

          <div className="p-10 rounded-[3rem] border border-gray-100 overflow-hidden relative group">
             <div className="absolute inset-0 bg-gray-900 opacity-0 group-hover:opacity-100 transition-opacity" />
             <div className="relative z-10">
                <Star className="text-amber-500 mb-6 group-hover:text-white transition-colors" size={24} />
                <h3 className="text-xl font-black text-gray-900 mb-4 tracking-tight group-hover:text-white transition-colors">Become a Mentor</h3>
                <p className="text-sm text-gray-400 font-medium mb-8 group-hover:text-white/70 transition-colors">Help the next generation and build your profile in the ecosystem.</p>
                <Link href="/mentorship-hub" className="flex items-center gap-2 text-[10px] font-black text-gray-900 uppercase tracking-widest group-hover:text-brand-primary transition-colors">
                  Learn More <ChevronRight size={14} />
                </Link>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}
