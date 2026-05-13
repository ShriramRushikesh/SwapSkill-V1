'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { toast } from 'sonner'

export default function ForgotPasswordPage() {
 const [email, setEmail] = useState('')
 const [loading, setLoading] = useState(false)
 const [sent, setSent] = useState(false)
 const supabase = createClient()

 async function handleReset(e: React.FormEvent) {
 e.preventDefault()
 if (!email) return
 setLoading(true)
 const { error } = await supabase.auth.resetPasswordForEmail(email, {
 redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`
 })
 if (error) { toast.error(error.message); setLoading(false); return }
 toast.success('Check your email for reset link')
 setSent(true)
 setLoading(false)
 }

 return (
 <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
 {/* Decorative Blobs */}
 <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-100 rounded-full blur-[120px] opacity-40"></div>
 <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-border rounded-full blur-[120px] opacity-40"></div>

 <div className="w-full max-w-md relative animate-slide-up">
 <div className="card-responsive p-12 backdrop-blur-xl">
 {sent ? (
 <div className="text-center">
 <div className="text-4xl mb-6">📧</div>
 <h1 className="text-3xl font-black text-gray-900 tracking-tighter mb-3">Check your email</h1>
 <p className="text-gray-400 font-bold text-sm mb-6">We sent a password reset link to <strong>{email}</strong></p>
 <p className="text-[12px] text-gray-400 mb-10">Didn&apos;t receive it? Check spam folder or try again in a few minutes.</p>
 <Link href="/login" className="btn-primary !py-4 text-[14px] inline-block w-full">
 Back to login
 </Link>
 </div>
 ) : (
 <div>
 <div className="mb-10 text-center">
 <h1 className="text-3xl font-black text-gray-900 tracking-tighter mb-3">Reset Password</h1>
 <p className="text-gray-400 font-bold text-xs uppercase tracking-widest leading-relaxed mt-2">Enter your email and we&apos;ll send you a link to create a new password.</p>
 </div>
 <form onSubmit={handleReset} className="space-y-6">
 <div>
 <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-2.5 ml-1">Email Address</label>
 <input type="email" required value={email} onChange={e => setEmail(e.target.value)} 
 placeholder="you@example.com" 
 className="w-full border-2 border-gray-200 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-gray-900 transition-all bg-gray-50/30 placeholder:text-gray-300"/>
 </div>
 <button type="submit" disabled={loading} className="w-full btn-primary !py-4 text-[14px] disabled:opacity-50 mt-2">
 {loading ? 'Sending...' : 'Send Reset Link'}
 </button>
 </form>
 <p className="text-center text-[12px] font-bold text-gray-400 mt-10">
 Remember your password? <Link href="/login" className="text-gray-900 underline decoration-2 underline-offset-4 hover:text-gray-700 transition-colors">Sign in</Link>
 </p>
 </div>
 )}
 </div>
 </div>
 </div>
 )
}
