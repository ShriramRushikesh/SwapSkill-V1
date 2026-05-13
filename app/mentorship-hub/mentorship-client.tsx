'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, ShieldCheck, User, Zap, MessageSquare, ArrowRight, Star } from 'lucide-react'

export default function MentorshipClient({ initialMentors }: { initialMentors: any[] }) {
  const [mentors, setMentors] = useState(initialMentors)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedExpertise, setSelectedExpertise] = useState('All')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const expertiseTags = ['All', 'Product Management', 'Software Engineering', 'Marketing', 'UI/UX Design', 'Sales', 'Strategy']

  useEffect(() => {
    const filtered = initialMentors.filter(m => {
      const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (m.bio && m.bio.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesExpertise = selectedExpertise === 'All' || (m.expertise && m.expertise.includes(selectedExpertise))
      return matchesSearch && matchesExpertise
    })
    setMentors(filtered)
  }, [searchQuery, selectedExpertise, initialMentors])

  return (
    <div className="min-h-screen bg-white pt-24 pb-20 px-6 container-max">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-16 space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full"
        >
          <Zap size={12} fill="currentColor" /> Mentorship Hub
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter leading-[0.9]"
        >
          Guidance from the <br/> 1% in the Industry.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 font-bold text-lg max-w-2xl mx-auto"
        >
          Skip the mistakes. Learn from mentors who have built, scaled, and transformed industries. Browse by expertise and book your session.
        </motion.p>
      </div>

      {/* Filter & Search Bar */}
      <div className="max-w-6xl mx-auto mb-16">
        <div className="flex flex-col md:flex-row gap-4 items-center bg-gray-50 p-3 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50">
          <div className="flex-1 flex items-center gap-4 px-6">
            <Search className="text-gray-400" size={20} />
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by expertise, name, or industry..." 
              className="w-full bg-transparent border-none outline-none py-4 text-sm font-bold text-gray-900 placeholder:text-gray-400"
            />
          </div>
          <div className="hidden md:flex gap-2">
            {expertiseTags.slice(0, 4).map(tag => (
              <button 
                key={tag}
                onClick={() => setSelectedExpertise(tag)}
                className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  selectedExpertise === tag ? 'bg-gray-900 text-white shadow-lg' : 'bg-white text-gray-400 hover:text-gray-900'
                }`}
              >
                {tag}
              </button>
            ))}
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-12 h-12 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-gray-900 hover:bg-gray-50 transition-all"
            >
              <Filter size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Mentors Grid */}
      <div className="max-w-7xl mx-auto">
        {mentors.length === 0 ? (
          <div className="py-32 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
              <User size={32} />
            </div>
            <h3 className="text-2xl font-black text-gray-900 tracking-tight">No mentors match your search</h3>
            <p className="text-gray-400 font-bold mt-2">Try adjusting your filters or keywords.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mentors.map((mentor, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                key={mentor.id} 
                className="bg-white border border-gray-100 p-8 rounded-[3rem] group hover:border-gray-900/10 hover:shadow-2xl hover:shadow-gray-200/50 transition-all relative overflow-hidden"
              >
                {/* Badge */}
                <div className="absolute top-8 right-8">
                  <div className="px-3 py-1 bg-brand-primary text-gray-900 text-[8px] font-black uppercase tracking-[0.2em] rounded-full border border-gray-900/5">
                    Premium
                  </div>
                </div>

                <div className="flex items-center gap-6 mb-8">
                  <div className="w-20 h-20 rounded-[2rem] bg-gray-50 flex-shrink-0 overflow-hidden border border-gray-100 group-hover:scale-105 transition-transform">
                    {mentor.avatar_url ? (
                      <Image src={mentor.avatar_url} alt={mentor.name} width={80} height={80} className="w-full h-full object-cover" />
                    ) : <User size={32} className="text-gray-300" />}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900 tracking-tight group-hover:text-brand-accent transition-colors">{mentor.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex text-amber-400">
                        <Star size={12} fill="currentColor" />
                        <Star size={12} fill="currentColor" />
                        <Star size={12} fill="currentColor" />
                        <Star size={12} fill="currentColor" />
                        <Star size={12} fill="currentColor" />
                      </div>
                      <span className="text-[10px] font-black text-gray-400">5.0</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-10">
                  <div className="flex flex-wrap gap-2">
                    {(mentor.expertise || ['Product', 'Strategy']).map((tag: string) => (
                      <span key={tag} className="px-3 py-1 bg-gray-50 text-gray-400 text-[9px] font-black uppercase tracking-widest rounded-full group-hover:bg-gray-900 group-hover:text-white transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm font-bold text-gray-400 line-clamp-3 leading-relaxed">
                    {mentor.bio || "Leading expert dedicated to helping the next generation of talent scale their careers through actionable guidance."}
                  </p>
                </div>

                <div className="pt-8 border-t border-gray-50 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Starts from</p>
                    <p className="text-sm font-black text-gray-900">200 CR <span className="text-[10px] text-gray-400 uppercase">/ session</span></p>
                  </div>
                  <Link 
                    href={`/profile/${mentor.id}`} 
                    className="w-12 h-12 bg-gray-900 text-white rounded-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl shadow-gray-900/20"
                  >
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="max-w-6xl mx-auto mt-32">
        <div className="bg-gray-900 rounded-[4rem] p-16 md:p-24 text-center space-y-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary opacity-10 rounded-full blur-[100px] -mr-48 -mt-48" />
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.9]">Are you an Industry Expert?</h2>
            <p className="text-gray-400 font-bold text-lg">Join our exclusive mentor network and guide the future of innovation. Earn reputation and high-tier rewards.</p>
          </div>
          <Link href="/signup?role=mentor" className="inline-flex items-center gap-4 px-10 py-5 bg-brand-primary text-gray-900 rounded-[2rem] text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
            Apply to Mentor <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  )
}
