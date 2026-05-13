'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Profile, SwapPost, SwapRequest, AppNotification } from '@/types'
import { timeAgo } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Bell, Settings, MessageSquare, ArrowRight, User, Rocket, ShieldCheck, Zap, Layers, Send } from 'lucide-react'

type DashboardProps = {
  profile: Profile
  posts: (SwapPost & { requests: SwapRequest[] })[]
  sentRequests: (SwapRequest & { posts: SwapPost & { profiles: Profile } })[]
  notifications: AppNotification[]
}

export default function DashboardClient({ profile, posts, sentRequests, notifications }: DashboardProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab') || 'overview'
  const supabase = createClient()
  
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good Morning')
    else if (hour < 18) setGreeting('Good Afternoon')
    else setGreeting('Good Evening')
  }, [])

  const setTab = (newTab: string) => {
    router.push(`/dashboard?tab=${newTab}`)
  }

  // Role-specific navigation items
  const getNavItems = () => {
    const common = [
      { id: 'overview', label: 'Overview', icon: <Layers size={18} /> },
      { id: 'notifications', label: 'Activity', icon: <Bell size={18} />, count: notifications.filter(n => !n.is_read).length },
    ]

    if (profile.role === 'student') {
      return [
        ...common,
        { id: 'swaps', label: 'My Swaps', icon: <Rocket size={18} /> },
        { id: 'certificates', label: 'Certificates', icon: <ShieldCheck size={18} /> },
      ]
    }
    if (profile.role === 'startup') {
      return [
        ...common,
        { id: 'posts', label: 'Project Board', icon: <Rocket size={18} />, count: posts.length },
        { id: 'requests', label: 'Incoming Offers', icon: <Send size={18} />, count: posts.reduce((acc, p) => acc + p.requests.length, 0) },
      ]
    }
    if (profile.role === 'mentor') {
      return [
        ...common,
        { id: 'sessions', label: 'Guidance', icon: <User size={18} /> },
        { id: 'reviews', label: 'Review Requests', icon: <MessageSquare size={18} /> },
      ]
    }
    return common
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 container-max">
      {/* Dynamic Header */}
      <div className="flex flex-col lg:flex-row gap-10 items-start justify-between mb-16">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
              {profile.role === 'student' ? `Reputation: ${profile.reputation_score || 0}` : `Member Tier: Alpha`}
            </span>
            {profile.verification_status === 'pending' && (
              <span className="px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-amber-100 flex items-center gap-1.5">
                <ShieldCheck size={12} /> Verification Pending
              </span>
            )}
          </div>
          <div>
            <h1 className="text-5xl font-black text-gray-900 tracking-tighter leading-none mb-4">
              {greeting}, {profile.name?.split(' ')[0]}
            </h1>
            <p className="text-gray-400 font-bold text-sm max-w-md">
              {profile.role === 'student' ? "Build your portfolio, earn credits, and transform your career." : "Your ecosystem is thriving. Manage your collaborations and guidance."}
            </p>
          </div>
        </motion.div>

        {profile.role === 'student' ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full lg:w-80 bg-brand-primary border-2 border-gray-900/5 shadow-xl rounded-[2.5rem] p-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Available Credits</h3>
              <Zap size={16} className="text-gray-900" />
            </div>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-5xl font-black text-gray-900">{profile.credits || 0}</span>
              <span className="text-xs font-black text-gray-900/40 uppercase tracking-widest">CR</span>
            </div>
            <p className="text-[10px] font-bold text-gray-900/60 leading-relaxed mb-6">
              Credits unlock premium mentorship and priority startup projects.
            </p>
            <button className="w-full py-3 bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest">Redeem Rewards</button>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full lg:w-80 bg-white border border-gray-100 shadow-xl shadow-gray-200/50 rounded-[2.5rem] p-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ecosystem Health</h3>
              <span className="text-xs font-black text-gray-900">Optimal</span>
            </div>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                <span className="text-gray-400">Response Rate</span>
                <span className="text-gray-900">98%</span>
              </div>
              <div className="w-full h-2 bg-gray-50 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[98%]" />
              </div>
            </div>
            <Link href="/settings" className="w-full py-3 bg-gray-50 rounded-2xl text-[10px] font-black text-gray-900 uppercase tracking-widest flex items-center justify-center gap-2">Manage Settings <Settings size={14} /></Link>
          </motion.div>
        )}
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-12 gap-10">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 space-y-2">
          {getNavItems().map(t => (
            <button 
              key={t.id} 
              onClick={() => setTab(t.id)}
              className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                tab === t.id ? 'bg-gray-900 text-white shadow-xl shadow-gray-900/20 translate-x-2' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-4">
                {t.icon} {t.label}
              </div>
              {t.count !== undefined && (
                <span className={`text-[10px] min-w-[20px] h-5 rounded-full flex items-center justify-center ${tab === t.id ? 'bg-white/20' : 'bg-gray-100 text-gray-500'}`}>
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-9">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="min-h-[500px]"
            >
              {tab === 'overview' && (
                <div className="space-y-10">
                  {profile.role === 'student' ? (
                    <div className="grid md:grid-cols-3 gap-6">
                      <StatCard title="Reputation" value={profile.reputation_score || 0} icon={<ShieldCheck size={24} />} desc="Trust Score" />
                      <StatCard title="Active Swaps" value={sentRequests.filter(r => r.status === 'accepted').length} icon={<Rocket size={24} />} desc="In progress" />
                      <StatCard title="Total Credits" value={profile.credits || 0} icon={<Zap size={24} />} desc="Earned" />
                    </div>
                  ) : profile.role === 'startup' ? (
                    <div className="grid md:grid-cols-3 gap-6">
                      <StatCard title="Live Missions" value={posts.length} icon={<Rocket size={24} />} desc="Posted projects" />
                      <StatCard title="Incoming Offers" value={posts.reduce((acc, p) => acc + p.requests.length, 0)} icon={<Send size={24} />} desc="Pending review" />
                      <StatCard title="Success Rate" value="96%" icon={<Zap size={24} />} desc="Completion" />
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                      <StatCard title="Total Guidance" value="42" icon={<User size={24} />} desc="Hours shared" />
                      <StatCard title="Rating" value="4.9" icon={<Zap size={24} />} desc="Mentor score" />
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-black text-gray-900 tracking-tight mb-6">Recent Activity</h3>
                    <div className="space-y-4">
                      {notifications.length > 0 ? notifications.slice(0, 3).map(notif => (
                        <div key={notif.id} className="bg-white border border-gray-100 p-6 rounded-[2rem] flex items-center justify-between group hover:border-gray-900/10 transition-colors">
                          <div className="flex items-center gap-5">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${!notif.is_read ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-400'}`}>
                              <Bell size={18} />
                            </div>
                            <div>
                              <p className="text-sm font-black text-gray-900">{notif.title}</p>
                              <p className="text-xs font-bold text-gray-400">{notif.body}</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{timeAgo(notif.created_at)}</span>
                        </div>
                      )) : (
                        <p className="text-sm text-gray-400 italic">No recent activity.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Default fallback for other tabs */}
              {tab !== 'overview' && (
                <div className="bg-gray-50 rounded-[3rem] p-20 text-center border-2 border-dashed border-gray-200">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-gray-300">
                    <Layers size={24} />
                  </div>
                  <h3 className="text-lg font-black text-gray-900 mb-2">Module under optimization</h3>
                  <p className="text-sm text-gray-500 max-w-xs mx-auto">We're refining the {tab} experience to match your premium workflow.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon, desc }: any) {
  return (
    <div className="bg-white border border-gray-100 p-10 rounded-[3rem] shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all relative overflow-hidden group">
      <div className="absolute -right-6 -bottom-6 text-gray-900/5 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div className="relative z-10 space-y-4">
        <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-900">
          {icon}
        </div>
        <div>
          <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{title}</h4>
          <p className="text-4xl font-black text-gray-900 tracking-tighter">{value}</p>
        </div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{desc}</p>
      </div>
    </div>
  )
}
