'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { Mail, Lock, Chrome, Linkedin, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      toast.error(error.message)
      setLoading(false)
      return
    }
    router.push('/dashboard')
    router.refresh()
  }

  async function handleOAuth(provider: 'google' | 'linkedin_oidc') {
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback` }
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden pt-20">
      {/* Background elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gray-50 rounded-full blur-[120px] opacity-60" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-border rounded-full blur-[120px] opacity-60" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white border border-gray-100 shadow-2xl shadow-gray-200/50 rounded-[2.5rem] p-10 md:p-14">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-gray-900 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-gray-900/20 rotate-3">
              <span className="text-white font-black text-2xl italic">S</span>
            </div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tighter mb-2">Welcome Back</h1>
            <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Sign in to scale your future</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <OAuthButton 
              onClick={() => handleOAuth('google')} 
              icon={<Chrome size={18} />} 
              label="Google" 
            />
            <OAuthButton 
              onClick={() => handleOAuth('linkedin_oidc')} 
              icon={<Linkedin size={18} />} 
              label="LinkedIn" 
            />
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100" /></div>
            <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest">
              <span className="bg-white px-4 text-gray-300">or use email</span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-gray-900 transition-colors" size={18} />
                <input 
                  type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="w-full pl-14 pr-6 py-4 bg-gray-50/50 border-2 border-transparent rounded-2xl outline-none focus:bg-white focus:border-gray-900 transition-all font-bold text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Password</label>
                <Link href="/forgot-password" className="text-[10px] font-black text-gray-900 uppercase tracking-widest hover:underline">Forgot?</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-gray-900 transition-colors" size={18} />
                <input 
                  type="password" required value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-14 pr-6 py-4 bg-gray-50/50 border-2 border-transparent rounded-2xl outline-none focus:bg-white focus:border-gray-900 transition-all font-bold text-sm"
                />
              </div>
            </div>

            <button 
              type="submit" disabled={loading}
              className="w-full py-5 bg-gray-900 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-gray-900/20 disabled:opacity-50 mt-4"
            >
              {loading ? 'Authenticating...' : (
                <>
                  Sign In <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <p className="text-center mt-10 text-xs font-bold text-gray-400">
            New here? <Link href="/signup" className="text-gray-900 underline decoration-2 underline-offset-4 hover:text-gray-700 transition-colors">Create account</Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

function OAuthButton({ onClick, icon, label }: { onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className="flex items-center justify-center gap-3 py-4 border-2 border-gray-50 rounded-2xl text-xs font-black text-gray-900 hover:bg-gray-50 hover:border-gray-100 transition-all active:scale-95"
    >
      {icon} {label}
    </button>
  )
}
