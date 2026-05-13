'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, Chrome, Linkedin, ArrowRight, User, Rocket, GraduationCap, Briefcase } from 'lucide-react'

const ROLES = [
  { 
    id: 'student', 
    label: 'Student', 
    desc: 'Trade skills for experience',
    icon: <GraduationCap size={24} />
  },
  { 
    id: 'startup', 
    label: 'Founder', 
    desc: 'Build your dream team',
    icon: <Rocket size={24} />
  },
  { 
    id: 'mentor', 
    label: 'Mentor', 
    desc: 'Guide the next generation',
    icon: <User size={24} />
  },
  { 
    id: 'freelancer', 
    label: 'Freelancer', 
    desc: 'Collaborate on projects',
    icon: <Briefcase size={24} />
  },
]

export default function SignupPage() {
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleOAuth(provider: 'google' | 'linkedin_oidc') {
    if (!role) { toast.error('Please select your role first'); return }
    localStorage.setItem('swapskill_role', role)
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback` }
    })
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    if (!role) { toast.error('Please select a role'); return }
    setLoading(true)
    
    const { data, error } = await supabase.auth.signUp({
      email, 
      password,
      options: { 
        data: { full_name: name },
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    })

    if (error) { 
      toast.error(error.message)
      setLoading(false)
      return 
    }

    if (data.user) {
      await supabase.from('profiles').upsert({ 
        id: data.user.id,
        role, 
        name,
        email 
      })

      // Send verification email via API
      try {
        await fetch('/api/email/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            name,
            verificationLink: `${window.location.origin}/auth/callback`
          })
        })
      } catch (err) {
        console.error('Email failed:', err)
      }
    }

    toast.success('Check your email to verify!')
    router.push('/onboarding')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden pt-20 pb-12">
      {/* Background elements */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-gray-50 rounded-full blur-[120px] opacity-60" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-brand-border rounded-full blur-[120px] opacity-60" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl relative z-10"
      >
        <div className="bg-white border border-gray-100 shadow-2xl shadow-gray-200/50 rounded-[3rem] p-10 md:p-16">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gray-900 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-gray-900/20 rotate-3">
              <span className="text-white font-black text-2xl italic">S</span>
            </div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tighter mb-3">Join the Community</h1>
            <p className="text-gray-400 font-bold text-[11px] uppercase tracking-[0.25em]">Step {step} of 2: {step === 1 ? 'Select Role' : 'Your Details'}</p>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {ROLES.map((r) => (
                    <button 
                      key={r.id}
                      onClick={() => { setRole(r.id); setStep(2); }}
                      className={`group flex flex-col items-center text-center p-8 border-2 rounded-[2.5rem] transition-all duration-300 ${
                        role === r.id ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-50 bg-gray-50/50 hover:border-gray-200 hover:bg-white'
                      }`}
                    >
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-colors ${
                        role === r.id ? 'bg-white/10' : 'bg-white shadow-sm text-gray-400 group-hover:text-gray-900'
                      }`}>
                        {r.icon}
                      </div>
                      <h3 className="text-sm font-black uppercase tracking-widest mb-1">{r.label}</h3>
                      <p className={`text-[10px] font-bold ${role === r.id ? 'text-white/60' : 'text-gray-400'}`}>{r.desc}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-2 gap-4">
                  <OAuthButton onClick={() => handleOAuth('google')} icon={<Chrome size={18} />} label="Google" />
                  <OAuthButton onClick={() => handleOAuth('linkedin_oidc')} icon={<Linkedin size={18} />} label="LinkedIn" />
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100" /></div>
                  <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest">
                    <span className="bg-white px-4 text-gray-300">or use email</span>
                  </div>
                </div>

                <form onSubmit={handleSignup} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                    <input 
                      required value={name} onChange={e => setName(e.target.value)}
                      placeholder="Alex Rivera"
                      className="w-full px-6 py-4 bg-gray-50/50 border-2 border-transparent rounded-2xl outline-none focus:bg-white focus:border-gray-900 transition-all font-bold text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email</label>
                    <input 
                      type="email" required value={email} onChange={e => setEmail(e.target.value)}
                      placeholder="alex@example.com"
                      className="w-full px-6 py-4 bg-gray-50/50 border-2 border-transparent rounded-2xl outline-none focus:bg-white focus:border-gray-900 transition-all font-bold text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Password</label>
                    <input 
                      type="password" required value={password} onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••" minLength={8}
                      className="w-full px-6 py-4 bg-gray-50/50 border-2 border-transparent rounded-2xl outline-none focus:bg-white focus:border-gray-900 transition-all font-bold text-sm"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <button 
                      type="button" onClick={() => setStep(1)}
                      className="flex-1 py-5 border-2 border-gray-50 rounded-2xl font-black text-sm text-gray-400 hover:bg-gray-50 transition-all"
                    >
                      Back
                    </button>
                    <button 
                      type="submit" disabled={loading}
                      className="flex-[2] py-5 bg-gray-900 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-gray-900/20 disabled:opacity-50"
                    >
                      {loading ? 'Creating...' : (
                        <>
                          Create Account <ArrowRight size={18} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-center mt-12 text-xs font-bold text-gray-400">
            Already a member? <Link href="/login" className="text-gray-900 underline decoration-2 underline-offset-4 hover:text-gray-700 transition-colors">Sign in</Link>
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
      className="flex items-center justify-center gap-3 py-4 border-2 border-gray-50 rounded-2xl text-[11px] font-black text-gray-900 hover:bg-gray-50 hover:border-gray-100 transition-all active:scale-95"
    >
      {icon} {label}
    </button>
  )
}
