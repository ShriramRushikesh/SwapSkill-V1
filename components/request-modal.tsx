'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { SwapPost } from '@/types'
import { toast } from 'sonner'

export default function RequestModal({ post, onClose, onSuccess }: {
 post: SwapPost & { profiles?: any }
 onClose: () => void
 onSuccess: () => void
}) {
 const [message, setMessage] = useState('')
 const [loading, setLoading] = useState(false)
 const supabase = createClient()

 async function sendRequest() {
 setLoading(true)
 const { data: { user } } = await supabase.auth.getUser()
 if (!user) { toast.error('Please login first'); setLoading(false); return }

 // Check if already requested
 const { data: existing } = await supabase
 .from('swap_requests')
 .select('id')
 .eq('post_id', post.id)
 .eq('requester_id', user.id)
 .single()

 if (existing) { toast.error('You already requested this swap'); setLoading(false); return }

 const { error } = await supabase.from('swap_requests').insert({
 post_id: post.id,
 requester_id: user.id,
 post_owner_id: post.user_id,
 message: message.trim() || null,
 })

 if (error) { toast.error(error.message); setLoading(false); return }
 toast.success('Swap request sent!')
 onSuccess()
 setLoading(false)
 }

 return (
 <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-md flex items-center justify-center z-[100] px-4 animate-fade-in" onClick={onClose}>
 <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg p-10 animate-slide-up relative overflow-hidden" onClick={e => e.stopPropagation()}>
 {/* Decorative corner */}
 <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50/50 rounded-bl-[5rem] -mr-16 -mt-16 blur-2xl"></div>

 <div className="relative">
 <div className="flex items-center justify-between mb-8">
 <div>
 <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-1">Propose a Swap</h2>
 <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Connect with {post.profiles?.name || 'this user'}</p>
 </div>
 <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-200 transition-colors group">
 <svg className="w-5 h-5 text-gray-900 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
 </svg>
 </button>
 </div>

 <div className="bg-gray-50/50 rounded-[2rem] p-6 mb-8 border-2 border-gray-200">
 <h3 className="text-sm font-black text-gray-900 mb-3">{post.title}</h3>
 <div className="flex flex-wrap gap-2">
 <span className="text-[10px] font-black uppercase tracking-widest bg-gray-900 text-white px-3 py-1.5 rounded-full">Offering: {post.offering}</span>
 <span className="text-[10px] font-black uppercase tracking-widest bg-white border border-gray-200 text-gray-900 px-3 py-1.5 rounded-full">Wants: {post.looking_for}</span>
 </div>
 </div>

 <div className="mb-10">
 <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-3 ml-2">Personal Message</label>
 <textarea
 value={message}
 onChange={e => setMessage(e.target.value)}
 placeholder="Explain why you'd be a great swap partner..."
 rows={5}
 maxLength={500}
 className="w-full border-2 border-gray-200 rounded-[1.5rem] px-6 py-5 text-sm font-bold outline-none focus:border-gray-900 transition-all bg-white resize-none placeholder:text-gray-300"
 />
 <div className="flex justify-between mt-3 px-2">
 <span className="text-[10px] font-bold text-gray-300">Minimum 20 characters recommended</span>
 <span className="text-[10px] font-black text-gray-900">{message.length}/500</span>
 </div>
 </div>

 <div className="flex gap-4">
 <button onClick={onClose} className="flex-1 py-4 text-sm font-black text-gray-400 hover:text-gray-900 transition-colors">
 Go Back
 </button>
 <button onClick={sendRequest} disabled={loading} 
 className="flex-[2] btn-primary !py-4 disabled:opacity-50">
 {loading ? 'Sending Proposal...' : 'Send Swap Proposal'}
 </button>
 </div>
 </div>
 </div>
 </div>
 )
}
