'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Profile, SwapPost, SwapRequest, Notification } from '@/types'
import { timeAgo } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Bell, Settings, MessageSquare, ArrowRight, User, Rocket, ShieldCheck, Zap, Layers, Send } from 'lucide-react'

type DashboardProps = {
  profile: Profile
  posts: (SwapPost & { requests: SwapRequest[] })[]
  sentRequests: (SwapRequest & { posts: SwapPost & { profiles: Profile } })[]
  notifications: Notification[]
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

  // Calculate profile completion
  const completionItems = [
    !!profile.bio,
    !!profile.location,
    !!profile.avatar_url,
    !!profile.linkedin_url,
    (posts.length > 0)
  ]
  const completionPercentage = Math.round((completionItems.filter(Boolean).length / completionItems.length) * 100)

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
            <span className="px-3 py-1 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Member Tier: Alpha</span>
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
              Your ecosystem is thriving. You have <span className="text-gray-900">{notifications.filter(n => !n.is_read).length} new alerts</span> and <span className="text-gray-900">{posts.reduce((acc, p) => acc + p.requests.length, 0)} pending mission requests</span>.
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full lg:w-80 bg-white border border-gray-100 shadow-xl shadow-gray-200/50 rounded-[2.5rem] p-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Profile Power</h3>
            <span className="text-xs font-black text-gray-900">{completionPercentage}%</span>
          </div>
          <div className="w-full h-3 bg-gray-50 rounded-full mb-6 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              className="h-full bg-gray-900"
            />
          </div>
          <p className="text-[11px] font-bold text-gray-400 mb-6 leading-relaxed">
            Complete your profile to unlock <span className="text-gray-900">Premium Discovery</span> and direct messaging.
          </p>
          <Link 
            href="/profile/edit" 
            className="w-full py-3 bg-gray-50 rounded-2xl text-[10px] font-black text-gray-900 uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
          >
            Refine Identity <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-12 gap-10">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 space-y-2">
          {[
            { id: 'overview', label: 'Overview', icon: <Layers size={18} /> },
            { id: 'posts', label: 'My Missions', icon: <Rocket size={18} />, count: posts.length },
            { id: 'sent', label: 'Sent Offers', icon: <Send size={18} />, count: sentRequests.length },
            { id: 'notifications', label: 'Activity', icon: <Bell size={18} />, count: notifications.filter(n => !n.is_read).length },
            { id: 'settings', label: 'Account', icon: <Settings size={18} /> },
          ].map(t => (
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

          <Link href="/post" className="flex items-center gap-4 w-full px-6 py-6 mt-8 bg-brand-primary rounded-[2rem] text-gray-900 border-2 border-gray-900/5 hover:scale-[1.02] active:scale-95 transition-all">
            <div className="w-10 h-10 bg-gray-900 text-white rounded-xl flex items-center justify-center">
              <Plus size={20} />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">Launch New</p>
              <p className="text-sm font-black tracking-tight">Mission Post</p>
            </div>
          </Link>
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
                  <div className="grid md:grid-cols-2 gap-6">
                    <StatCard 
                      title="Total Connections" 
                      value={profile.swap_count || 0} 
                      icon={<User size={24} />} 
                      desc="Active collaborations"
                    />
                    <StatCard 
                      title="Success Rate" 
                      value="94%" 
                      icon={<Zap size={24} />} 
                      desc="Completion ratio"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-black text-gray-900 tracking-tight">Recent Activity</h3>
                      <button onClick={() => setTab('notifications')} className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-900 transition-colors">View All</button>
                    </div>
                    <div className="space-y-4">
                      {notifications.slice(0, 3).map(notif => (
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
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {tab === 'posts' && (
                <div className="grid md:grid-cols-2 gap-8">
                  {posts.map(post => (
                    <motion.div 
                      layoutId={post.id}
                      key={post.id} 
                      className="bg-white border border-gray-100 p-10 rounded-[2.5rem] flex flex-col group hover:shadow-2xl hover:shadow-gray-200/50 transition-all"
                    >
                      <div className="mb-6">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{post.category}</span>
                        <h3 className="text-2xl font-black text-gray-900 tracking-tighter mt-2">{post.title}</h3>
                      </div>
                      <p className="text-sm font-bold text-gray-400 line-clamp-2 mb-8 flex-1">{post.description}</p>
                      <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                            {[1, 2, 3].map(i => (
                              <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-100" />
                            ))}
                          </div>
                          <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">{post.requests.length} Requests</span>
                        </div>
                        <Link href={`/dashboard/post/${post.id}`} className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-900 hover:bg-gray-900 hover:text-white transition-all">
                          <ArrowRight size={18} />
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {tab === 'sent' && (
                <div className="space-y-4">
                  {sentRequests.map(req => (
                    <div key={req.id} className="bg-white border border-gray-100 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6 group hover:border-gray-900/10 transition-colors">
                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-100 shadow-sm">
                          {req.posts?.profiles?.avatar_url ? (
                            <Image src={req.posts.profiles.avatar_url} alt="" width={56} height={56} className="w-full h-full object-cover"/>
                          ) : <User size={24} className="text-gray-300" />}
                        </div>
                        <div>
                          <h3 className="text-base font-black text-gray-900 tracking-tight">{req.posts?.title}</h3>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{req.posts?.profiles?.name}</span>
                            <span className="w-1 h-1 bg-gray-200 rounded-full" />
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{timeAgo(req.created_at)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 w-full md:w-auto">
                        <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          req.status === 'accepted' ? 'bg-emerald-50 text-emerald-600' :
                          req.status === 'rejected' ? 'bg-rose-50 text-rose-600' :
                          'bg-amber-50 text-amber-600'
                        }`}>
                          {req.status}
                        </span>
                        <Link href={`/messages/${req.id}`} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
                          <MessageSquare size={14} /> Message
                        </Link>
                      </div>
                    </div>
                  ))}
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
