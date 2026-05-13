'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Profile, SwapPost, SwapRequest } from '@/types'
import { timeAgo } from '@/lib/utils'
import { toast } from 'sonner'

export default function AdminClient({
 profiles,
 posts,
 requests,
 totalUsers,
 totalSwaps
}: {
 profiles: Profile[]
 posts: SwapPost[]
 requests: SwapRequest[]
 totalUsers: number | null
 totalSwaps: number | null
}) {
 const [tab, setTab] = useState('dashboard')
 const supabase = createClient()

 async function verifyUser(id: string) {
 await supabase.from('profiles').update({ is_verified: true, verification_status: 'approved' }).eq('id', id)
 toast.success('User verified')
 window.location.reload()
 }

 async function rejectUser(id: string) {
 await supabase.from('profiles').update({ verification_status: 'rejected' }).eq('id', id)
 toast.success('User rejected')
 window.location.reload()
 }

 async function deletePost(id: string) {
 if (!confirm('Delete this post?')) return
 await supabase.from('swap_posts').delete().eq('id', id)
 toast.success('Post deleted')
 window.location.reload()
 }

 const TABS = [
 { id: 'dashboard', label: 'Overview' },
 { id: 'users', label: 'Users' },
 { id: 'posts', label: 'Posts' },
 { id: 'requests', label: 'Requests' }
 ]

 return (
 <div className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden">
 {/* Decorative Blobs */}
 <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-gray-50 rounded-full blur-[150px] opacity-40"></div>
 <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-brand-border rounded-full blur-[150px] opacity-40"></div>

 <div className="max-w-6xl mx-auto relative animate-slide-up">
 <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
 <div>
 <h1 className="text-5xl font-black text-gray-900 tracking-tighter mb-4">Admin Portal</h1>
 <p className="text-gray-400 font-bold text-sm uppercase tracking-[0.15em]">Manage users, posts, and verify accounts</p>
 </div>

 <div className="flex bg-white/50 backdrop-blur-md border border-gray-200 rounded-[2rem] p-1.5">
 {TABS.map(t => (
 <button key={t.id} onClick={() => setTab(t.id)}
 className={`relative px-8 py-3.5 rounded-[1.5rem] text-[13px] font-black transition-all duration-300 ${
 tab === t.id ? 'bg-gray-900 text-white scale-105' : 'text-gray-400 hover:text-gray-900'
 }`}>
 {t.label}
 </button>
 ))}
 </div>
 </div>

 {tab === 'dashboard' && (
 <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-fade-in">
 {[
 { label: 'Total Users', value: totalUsers || 0 },
 { label: 'Completed Swaps', value: totalSwaps || 0 },
 { label: 'Active Posts', value: posts.length },
 { label: 'Pending Verification', value: profiles.filter(p => p.verification_status === 'pending').length }
 ].map((stat, i) => (
 <div key={i} className="card-responsive p-8">
 <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">{stat.label}</p>
 <p className="text-5xl font-black text-gray-900">{stat.value}</p>
 </div>
 ))}
 </div>
 )}

 {tab === 'users' && (
 <div className="card-responsive overflow-hidden animate-fade-in">
 <div className="overflow-x-auto">
 <table className="w-full text-sm">
 <thead className="bg-gray-50/30 border-b border-gray-200">
 <tr>
 <th className="text-left px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Name</th>
 <th className="text-left px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Email</th>
 <th className="text-left px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Role</th>
 <th className="text-left px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Verification</th>
 <th className="text-left px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Joined</th>
 <th className="text-left px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Actions</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-brand-border">
 {profiles.map(p => (
 <tr key={p.id} className="hover:bg-gray-50/10 transition-colors">
 <td className="px-8 py-5 font-black text-gray-900">{p.name || 'N/A'}</td>
 <td className="px-8 py-5 text-gray-500 font-bold">{p.email}</td>
 <td className="px-8 py-5 capitalize font-bold text-gray-400">{p.role}</td>
 <td className="px-8 py-5">
 <span className={`text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest ${
 p.verification_status === 'approved' ? 'bg-gray-50 text-gray-700 border border-gray-200' : 
 p.verification_status === 'pending' ? 'bg-gray-50 text-gray-700 border border-gray-200' : 
 'bg-gray-50 text-gray-700 border border-gray-200'
 }`}>
 {p.verification_status}
 </span>
 </td>
 <td className="px-8 py-5 text-[11px] font-bold text-gray-400">{timeAgo(p.created_at)}</td>
 <td className="px-8 py-5">
 {p.verification_status === 'pending' && (
 <div className="flex gap-2">
 <button onClick={() => verifyUser(p.id)} className="text-[10px] font-black uppercase tracking-widest bg-gray-50 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">Verify</button>
 <button onClick={() => rejectUser(p.id)} className="text-[10px] font-black uppercase tracking-widest bg-gray-50 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">Reject</button>
 </div>
 )}
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 )}

 {tab === 'posts' && (
 <div className="space-y-4 animate-fade-in">
 {posts.map(p => (
 <div key={p.id} className="card-responsive p-6 flex items-center justify-between group">
 <div>
 <p className="text-lg font-black text-gray-900 mb-1">{p.title}</p>
 <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{p.offering} ↔ {p.looking_for}</p>
 </div>
 <button onClick={() => deletePost(p.id)} className="text-[10px] font-black text-gray-500 uppercase tracking-widest hover:text-gray-900 transition-colors opacity-0 group-hover:opacity-100">Delete</button>
 </div>
 ))}
 </div>
 )}

 {tab === 'requests' && (
 <div className="space-y-4 animate-fade-in">
 {requests.map(r => (
 <div key={r.id} className="card-responsive p-6 flex items-center justify-between">
 <div>
 <p className="text-lg font-black text-gray-900 mb-1">Swap Request #{r.id.slice(0, 8)}</p>
 <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Status: {r.status}</p>
 </div>
 <span className={`text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest ${
 r.status === 'completed' ? 'bg-gray-50 text-gray-700 border border-gray-200' : 
 r.status === 'accepted' ? 'bg-gray-50 text-gray-700 border border-gray-200' : 
 'bg-slate-50 text-slate-400 border border-slate-100'
 }`}>
 {r.status}
 </span>
 </div>
 ))}
 </div>
 )}
 </div>
 </div>
 )
}
