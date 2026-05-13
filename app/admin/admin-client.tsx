'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, User, Rocket, Bell, Search, Filter, Check, X, AlertCircle, ArrowRight } from 'lucide-react'

export default function AdminClient() {
  const [activeTab, setActiveTab] = useState('users')
  
  const stats = [
    { label: 'Total Users', value: '1,284', icon: <User size={18} /> },
    { label: 'Active Swaps', value: '432', icon: <Rocket size={18} /> },
    { label: 'Pending Verifications', value: '18', icon: <ShieldCheck size={18} /> },
    { label: 'Flags', value: '5', icon: <AlertCircle size={18} /> }
  ]

  return (
    <div className="min-h-screen bg-white pt-24 pb-20 px-6 container-max">
      <div className="flex flex-col lg:flex-row gap-10 items-start justify-between mb-16">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">System Admin</span>
            <span className="px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-amber-100 flex items-center gap-1.5">
              <ShieldCheck size={12} /> Root Access
            </span>
          </div>
          <h1 className="text-5xl font-black text-gray-900 tracking-tighter leading-none mb-4">Command Center</h1>
          <p className="text-gray-400 font-bold text-sm max-w-md">Full control over users, verification flows, and ecosystem moderation.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, i) => (
          <div key={i} className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 group hover:border-gray-900/10 transition-all">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-400 mb-6 group-hover:text-gray-900 transition-colors">
              {stat.icon}
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{stat.label}</p>
            <p className="text-3xl font-black text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Admin Navigation */}
        <div className="lg:col-span-3 space-y-2">
          {[
            { id: 'users', label: 'User Management', icon: <User size={18} /> },
            { id: 'verification', label: 'Verification Queue', icon: <ShieldCheck size={18} />, count: 18 },
            { id: 'moderation', label: 'Project Moderation', icon: <Rocket size={18} /> },
            { id: 'logs', label: 'System Logs', icon: <Bell size={18} /> }
          ].map(t => (
            <button 
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                activeTab === t.id ? 'bg-gray-900 text-white shadow-xl shadow-gray-900/20 translate-x-2' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-4">
                {t.icon} {t.label}
              </div>
              {t.count !== undefined && (
                <span className={`text-[10px] min-w-[20px] h-5 rounded-full flex items-center justify-center ${activeTab === t.id ? 'bg-white/20' : 'bg-gray-100 text-gray-500'}`}>
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Admin Content Area */}
        <div className="lg:col-span-9">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white border border-gray-100 rounded-[3rem] p-10 min-h-[600px] shadow-sm"
            >
              {activeTab === 'users' && (
                <div className="space-y-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">Active Users</h3>
                    <div className="flex items-center gap-4 bg-gray-50 px-6 py-3 rounded-2xl">
                      <Search size={16} className="text-gray-400" />
                      <input placeholder="Search users..." className="bg-transparent border-none outline-none text-xs font-bold text-gray-900 placeholder:text-gray-400" />
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-gray-50">
                          <th className="pb-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">User</th>
                          <th className="pb-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Role</th>
                          <th className="pb-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                          <th className="pb-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {[1, 2, 3, 4, 5].map(i => (
                          <tr key={i} className="group">
                            <td className="py-6">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-300">
                                  <User size={18} />
                                </div>
                                <div>
                                  <p className="text-sm font-black text-gray-900">User Alpha {i}</p>
                                  <p className="text-[10px] font-bold text-gray-400">user{i}@example.com</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-6">
                              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{i % 2 === 0 ? 'Startup' : 'Student'}</span>
                            </td>
                            <td className="py-6">
                              <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                                <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Active</span>
                              </div>
                            </td>
                            <td className="py-6 text-right">
                              <button className="p-2 text-gray-300 hover:text-gray-900 transition-colors">
                                <ArrowRight size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'verification' && (
                <div className="space-y-10">
                  <h3 className="text-2xl font-black text-gray-900 tracking-tight">Pending Verification</h3>
                  <div className="grid gap-6">
                    {[1, 2].map(i => (
                      <div key={i} className="bg-gray-50 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-gray-900/10 transition-all border border-transparent">
                        <div className="flex items-center gap-6">
                          <div className="w-16 h-16 bg-white rounded-[2rem] flex items-center justify-center text-gray-300 shadow-sm">
                            <User size={24} />
                          </div>
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <h4 className="text-lg font-black text-gray-900">University Beta {i}</h4>
                              <span className="px-2 py-0.5 bg-brand-primary text-[8px] font-black uppercase tracking-widest rounded-full">TPO Request</span>
                            </div>
                            <p className="text-xs font-bold text-gray-400">Verification doc attached: ID-2938{i}.pdf</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 w-full md:w-auto">
                          <button className="flex-1 md:flex-none p-4 bg-white text-rose-500 rounded-2xl hover:bg-rose-50 transition-colors">
                            <X size={20} />
                          </button>
                          <button className="flex-1 md:flex-none p-4 bg-gray-900 text-white rounded-2xl hover:scale-105 transition-all shadow-lg shadow-gray-900/20">
                            <Check size={20} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab !== 'users' && activeTab !== 'verification' && (
                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-8 text-gray-300">
                    <ShieldCheck size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 tracking-tight">Module Restricted</h3>
                  <p className="text-gray-400 font-bold max-w-xs mx-auto mt-2">This module is currently being synchronized with the main cluster.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
