'use client'
import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'

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
 <div className="min-h-screen bg-gray-50 pt-14">
 <div className="max-w-4xl mx-auto px-4 py-8">
 <div className="flex items-center justify-between mb-6">
 <div>
 <h1 className="text-2xl font-bold text-gray-900">Campus Hiring & Internships</h1>
 <p className="text-sm text-gray-500 mt-1">Post verified internship, hiring, and project opportunities for students</p>
 </div>
 {userRole === 'tpo' && (
 <button onClick={() => setShowForm(!showForm)} className="bg-gray-900 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition">
 + Post Hiring / Internship
 </button>
 )}
 </div>

 {showForm && (
 <form onSubmit={handlePost} className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 space-y-4">
 <input required value={title} onChange={e => setTitle(e.target.value)} placeholder="Job title" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-500"/>
 <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description" rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-500 resize-none"/>
 <div className="grid grid-cols-2 gap-4">
 <select value={type} onChange={e => setType(e.target.value)} className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-500">
 <option>internship</option>
 <option>job</option>
 <option>project</option>
 <option>hackathon</option>
 </select>
 <input type="date" value={deadline} onChange={e => setDeadline(e.target.value)} className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-500"/>
 </div>
 <div className="flex gap-2">
 <button type="button" onClick={() => setShowForm(false)} className="flex-1 border border-gray-200 rounded-xl py-3 text-sm font-medium hover:bg-gray-50">Cancel</button>
 <button type="submit" disabled={loading} className="flex-1 bg-gray-900 text-white rounded-xl py-3 text-sm font-medium hover:bg-gray-800 disabled:opacity-50">
 {loading ? 'Posting...' : 'Post'}
 </button>
 </div>
 </form>
 )}

 {posts.length === 0 ? (
 <p className="text-center py-12 text-gray-400">No opportunities yet.</p>
 ) : (
 <div className="grid gap-3">
 {posts.map((p: any) => (
 <div key={p.id} className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-sm transition">
 <div className="flex items-start justify-between gap-4 mb-3">
 <div>
 <h3 className="text-sm font-semibold text-gray-900">{p.title}</h3>
 <div className="flex gap-2 mt-1">
 <span className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded capitalize">{p.type}</span>
 {p.profiles?.is_verified && <span className="text-xs bg-gray-50 text-gray-900 px-2 py-1 rounded">Verified TPO</span>}
 </div>
 </div>
 {p.deadline && <p className="text-xs text-gray-400 flex-shrink-0">Deadline: {new Date(p.deadline).toLocaleDateString()}</p>}
 </div>
 {p.description && <p className="text-xs text-gray-600 mb-3">{p.description}</p>}
 <Link href={`/profile/${p.tpo_id}`} className="text-xs font-medium text-gray-700 hover:underline">View {p.profiles?.name}</Link>
 </div>
 ))}
 </div>
 )}
 </div>
 </div>
 )
}
