'use client'
import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { ShieldCheck, Rocket, Layers, User, ArrowRight } from 'lucide-react'

export default function TpoClient({ posts, userId, userRole }: any) {
 const [showForm, setShowForm] = useState(false)
 const [title, setTitle] = useState('')
 const [desc, setDesc] = useState('')
 const [type, setType] = useState('internship')
 const [deadline, setDeadline] = useState('')
 const [loading, setLoading] = useState(false)
 const supabase = createClient()

 async function handlePost(e: React.FormEvent) {
  e.preventDefault()
  setLoading(true)
  const { error } = await supabase.from('tpo_posts').insert({
  tpo_id: userId, title, description: desc, type, deadline: deadline || null
  })
  if (error) { toast.error(error.message); setLoading(false); return }
  toast.success('Opportunity posted!')
  setShowForm(false); setTitle(''); setDesc(''); setDeadline(''); setType('internship')
  window.location.reload()
 }

 return (
  <div className="min-h-screen bg-white pt-24 pb-20 px-6 container-max">
  <div className="flex flex-col lg:flex-row gap-10 items-start justify-between mb-16">
  <div className="space-y-4">
  <div className="flex items-center gap-3">
  <span className="px-3 py-1 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">TPO Console</span>
  <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-100 flex items-center gap-1.5">
  <ShieldCheck size={12} /> Verified Institute
  </span>
  </div>
  <h1 className="text-5xl font-black text-gray-900 tracking-tighter leading-none mb-4">Campus Hiring & Internships</h1>
  <p className="text-gray-400 font-bold text-sm max-w-md">Manage institutional partnerships, track student engagement, and post verified opportunities.</p>
  </div>

  {userRole === 'tpo' && (
  <button 
  onClick={() => setShowForm(!showForm)} 
  className="px-8 py-4 bg-gray-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-gray-900/20"
  >
  + Post Opportunity
  </button>
  )}
  </div>

  {/* Analytics Overview */}
  <div className="grid md:grid-cols-3 gap-6 mb-16">
  <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100">
  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Total Reach</p>
  <div className="flex items-baseline gap-2">
  <span className="text-4xl font-black text-gray-900">1,240</span>
  <span className="text-xs font-bold text-emerald-500">+12%</span>
  </div>
  </div>
  <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100">
  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Active Applications</p>
  <div className="flex items-baseline gap-2">
  <span className="text-4xl font-black text-gray-900">86</span>
  <span className="text-xs font-bold text-gray-400">across 12 posts</span>
  </div>
  </div>
  <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100">
  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Success Rate</p>
  <div className="flex items-baseline gap-2">
  <span className="text-4xl font-black text-gray-900">92%</span>
  <span className="text-xs font-bold text-emerald-500">Industry Peak</span>
  </div>
  </div>
  </div>

  <div className="grid lg:grid-cols-12 gap-12">
  <div className="lg:col-span-8">
  <div className="flex items-center justify-between mb-8">
  <h3 className="text-xl font-black text-gray-900 tracking-tight">Active Opportunities</h3>
  <div className="flex gap-2">
  <span className="px-4 py-1.5 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">All</span>
  <span className="px-4 py-1.5 bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-gray-100 cursor-pointer transition-colors">Internships</span>
  </div>
  </div>

  {showForm && (
  <motion.form 
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  onSubmit={handlePost} 
  className="bg-white border-2 border-gray-900 p-10 rounded-[3rem] mb-12 space-y-6 shadow-2xl"
  >
  <div className="space-y-2">
  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Opportunity Title</label>
  <input required value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Summer SDE Internship 2026" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-gray-900 transition-all"/>
  </div>
  <div className="space-y-2">
  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Mission Details</label>
  <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Outline requirements and benefits..." rows={4} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-gray-900 transition-all resize-none"/>
  </div>
  <div className="grid grid-cols-2 gap-6">
  <div className="space-y-2">
  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Category</label>
  <select value={type} onChange={e => setType(e.target.value)} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-gray-900 transition-all">
  <option>internship</option>
  <option>job</option>
  <option>project</option>
  <option>hackathon</option>
  </select>
  </div>
  <div className="space-y-2">
  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Deadline</label>
  <input type="date" value={deadline} onChange={e => setDeadline(e.target.value)} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-gray-900 transition-all"/>
  </div>
  </div>
  <div className="flex gap-4 pt-4">
  <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-4 border-2 border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all">Cancel</button>
  <button type="submit" disabled={loading} className="flex-1 py-4 bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 disabled:opacity-50 transition-all">
  {loading ? 'Processing...' : 'Publish Mission'}
  </button>
  </div>
  </motion.form>
  )}

  {posts.length === 0 ? (
  <div className="bg-gray-50 rounded-[3rem] p-20 text-center border-2 border-dashed border-gray-200">
  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-gray-300">
  <Layers size={24} />
  </div>
  <h3 className="text-lg font-black text-gray-900 mb-2">No active missions</h3>
  <p className="text-sm text-gray-500 max-w-xs mx-auto">Start by posting your first hiring or internship opportunity.</p>
  </div>
  ) : (
  <div className="space-y-6">
  {posts.map((p: any) => (
  <div key={p.id} className="bg-white border border-gray-100 rounded-[2.5rem] p-8 hover:border-gray-900/10 transition-all group">
  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
  <div className="space-y-4">
  <div className="flex items-center gap-3">
  <span className="px-3 py-1 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">{p.type}</span>
  {p.profiles?.is_verified && <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1"><ShieldCheck size={12} /> Verified</span>}
  </div>
  <div>
  <h3 className="text-2xl font-black text-gray-900 tracking-tighter mb-2">{p.title}</h3>
  <p className="text-sm font-bold text-gray-400 line-clamp-2 max-w-xl">{p.description}</p>
  </div>
  <Link href={`/profile/${p.tpo_id}`} className="inline-flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-900 transition-colors">
  Post by {p.profiles?.name} <ArrowRight size={12} />
  </Link>
  </div>
  {p.deadline && (
  <div className="flex-shrink-0 bg-gray-50 px-6 py-4 rounded-2xl text-center">
  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Deadline</p>
  <p className="text-sm font-black text-gray-900">{new Date(p.deadline).toLocaleDateString()}</p>
  </div>
  )}
  </div>
  </div>
  ))}
  </div>
  )}
  </div>

  <div className="lg:col-span-4 space-y-8">
  <div>
  <h3 className="text-lg font-black text-gray-900 tracking-tight mb-6">Recent Placements</h3>
  <div className="bg-gray-50 rounded-[2.5rem] p-8 space-y-6">
  {[1, 2, 3].map(i => (
  <div key={i} className="flex items-center gap-4">
  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-300">
  <User size={20} />
  </div>
  <div>
  <p className="text-sm font-black text-gray-900">Student Alpha {i}</p>
  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Hired @ Startup {i}</p>
  </div>
  </div>
  ))}
  <button className="w-full py-4 bg-white border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-all">View All Tracked Students</button>
  </div>
  </div>

  <div className="bg-brand-primary p-8 rounded-[2.5rem] border-2 border-gray-900/5">
  <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-4">Pro Tip</h3>
  <p className="text-xs font-bold text-gray-900/60 leading-relaxed mb-6">Verified TPO posts get 4x more visibility on the student feed. Ensure all descriptions are clear and concise.</p>
  <div className="w-full h-1 bg-gray-900/10 rounded-full overflow-hidden">
  <div className="h-full bg-gray-900 w-1/3" />
  </div>
  </div>
  </div>
  </div>
  </div>
 )
}
