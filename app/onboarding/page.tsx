'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'
import { User, MapPin, Building, GraduationCap, Briefcase, Plus, X, ArrowRight, ShieldCheck, Linkedin, Globe } from 'lucide-react'
import AvatarUpload from './avatar-upload'

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [bio, setBio] = useState('')
  const [college, setCollege] = useState('')
  const [company, setCompany] = useState('')
  const [location, setLocation] = useState('')
  const [offerInput, setOfferInput] = useState('')
  const [wantInput, setWantInput] = useState('')
  const [offerSkills, setOfferSkills] = useState<string[]>([])
  const [wantSkills, setWantSkills] = useState<string[]>([])
  const [linkedinUrl, setLinkedinUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [role, setRole] = useState('')
  const [userId, setUserId] = useState('')
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { router.push('/login'); return }
      setUserId(data.user.id)
      supabase.from('profiles').select('role').eq('id', data.user.id).single()
      .then(({ data: p }) => { if (p) setRole(p.role) })
    })
  }, [router, supabase])

  function addSkill(type: 'offer' | 'want') {
    const val = type === 'offer' ? offerInput.trim() : wantInput.trim()
    if (!val) return
    if (type === 'offer') { 
      if (offerSkills.includes(val)) return
      setOfferSkills(s => [...s, val]); 
      setOfferInput('') 
    }
    else { 
      if (wantSkills.includes(val)) return
      setWantSkills(s => [...s, val]); 
      setWantInput('') 
    }
  }

  async function saveStep1() {
    setLoading(true)
    const { error } = await supabase.from('profiles').update({
      bio, location,
      college: role === 'student' ? college : null,
      company: ['startup','mentor'].includes(role) ? company : null,
    }).eq('id', userId)
    if (error) { toast.error(error.message); setLoading(false); return }
    setStep(2); setLoading(false)
  }

  async function saveStep2() {
    setLoading(true)
    const skillRows = [
      ...offerSkills.map(s => ({ user_id: userId, skill_name: s, type: 'offer', level: 'intermediate' })),
      ...wantSkills.map(s => ({ user_id: userId, skill_name: s, type: 'want', level: 'intermediate' })),
    ]
    if (skillRows.length > 0) {
      const { error } = await supabase.from('user_skills').insert(skillRows)
      if (error) { toast.error(error.message); setLoading(false); return }
    }
    setStep(3); setLoading(false)
  }

  async function saveStep3() {
    setLoading(true)
    await supabase.from('profiles').update({
      linkedin_url: linkedinUrl,
      verification_status: 'pending'
    }).eq('id', userId)
    toast.success('Profile complete! Welcome to SwapSkill.')
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen pt-24 pb-20 relative overflow-hidden flex items-center justify-center">
      {/* Background Decor */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-gray-50 rounded-full blur-[120px] opacity-60" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-brand-border rounded-full blur-[120px] opacity-60" />

      <div className="w-full max-w-2xl px-6 relative z-10">
        <div className="bg-white border border-gray-100 shadow-2xl shadow-gray-200/50 rounded-[3rem] p-10 md:p-16">
          {/* Progress Header */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex gap-3">
              {[1, 2, 3].map(i => (
                <div 
                  key={i} 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    i === step ? 'w-12 bg-gray-900' : i < step ? 'w-4 bg-gray-900/20' : 'w-4 bg-gray-100'
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Phase {step} of 3</span>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-10"
              >
                <div>
                  <h2 className="text-4xl font-black text-gray-900 tracking-tighter mb-2">The Basics</h2>
                  <p className="text-gray-400 font-bold text-[11px] uppercase tracking-widest">How the community sees you</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <AvatarUpload userId={userId} onUploadComplete={() => toast.success('Photo uploaded!')} />
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-4">Profile Photo</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">About You</label>
                    <textarea 
                      value={bio} onChange={e => setBio(e.target.value)} 
                      placeholder="Share your story, your drive, and what you're building..." 
                      rows={4} 
                      className="w-full px-6 py-5 bg-gray-50/50 border-2 border-transparent rounded-2xl outline-none focus:bg-white focus:border-gray-900 transition-all font-bold text-sm resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                        {role === 'student' ? 'Institution' : 'Organization'}
                      </label>
                      <div className="relative group">
                        {role === 'student' ? <GraduationCap className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} /> : <Building className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />}
                        <input 
                          value={role === 'student' ? college : company} 
                          onChange={e => role === 'student' ? setCollege(e.target.value) : setCompany(e.target.value)} 
                          placeholder={role === 'student' ? 'University' : 'Company'}
                          className="w-full pl-14 pr-6 py-4 bg-gray-50/50 border-2 border-transparent rounded-2xl outline-none focus:bg-white focus:border-gray-900 transition-all font-bold text-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Location</label>
                      <div className="relative group">
                        <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                        <input 
                          value={location} onChange={e => setLocation(e.target.value)} 
                          placeholder="San Francisco, CA" 
                          className="w-full pl-14 pr-6 py-4 bg-gray-50/50 border-2 border-transparent rounded-2xl outline-none focus:bg-white focus:border-gray-900 transition-all font-bold text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={saveStep1} disabled={loading || !bio || !location}
                  className="w-full py-5 bg-gray-900 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-gray-900/20 disabled:opacity-30"
                >
                  {loading ? 'Saving...' : <>Continue to Skills <ArrowRight size={18} /></>}
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-12"
              >
                <div>
                  <h2 className="text-4xl font-black text-gray-900 tracking-tighter mb-2">Expertise</h2>
                  <p className="text-gray-400 font-bold text-[11px] uppercase tracking-widest">Define your professional value</p>
                </div>
                
                <div className="space-y-10">
                  <SkillSection 
                    title="I can offer" 
                    subtitle="Skills you excel at"
                    value={offerInput}
                    onChange={setOfferInput}
                    onAdd={() => addSkill('offer')}
                    items={offerSkills}
                    onRemove={(s: string) => setOfferSkills(prev => prev.filter(x => x !== s))}
                    color="bg-gray-900 text-white"
                  />

                  <SkillSection 
                    title="I want to learn" 
                    subtitle="Growth areas"
                    value={wantInput}
                    onChange={setWantInput}
                    onAdd={() => addSkill('want')}
                    items={wantSkills}
                    onRemove={(s: string) => setWantSkills(prev => prev.filter(x => x !== s))}
                    color="bg-brand-primary text-gray-900 border-2 border-gray-900/5"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button onClick={() => setStep(1)} className="flex-1 py-5 border-2 border-gray-50 rounded-2xl font-black text-sm text-gray-400 hover:bg-gray-50 transition-all">Back</button>
                  <button 
                    onClick={saveStep2} disabled={loading || offerSkills.length === 0 || wantSkills.length === 0}
                    className="flex-[2] py-5 bg-gray-900 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-gray-900/20 disabled:opacity-30"
                  >
                    {loading ? 'Saving...' : <>Final Step <ArrowRight size={18} /></>}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-10"
              >
                <div>
                  <h2 className="text-4xl font-black text-gray-900 tracking-tighter mb-2">Credibility</h2>
                  <p className="text-gray-400 font-bold text-[11px] uppercase tracking-widest">Trust is the foundation of swapping</p>
                </div>

                <div className="bg-gray-50/50 rounded-[2.5rem] p-10 border-2 border-gray-100 text-center relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <ShieldCheck size={120} />
                  </div>
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-gray-100 text-gray-900">
                    <ShieldCheck size={32} />
                  </div>
                  <h3 className="text-sm font-black text-gray-900 mb-2 uppercase tracking-widest">Identity Verification</h3>
                  <p className="text-[11px] font-bold text-gray-400 leading-relaxed max-w-sm mx-auto">
                    Verified members receive 4x more mission requests and are trusted by mentors and top-tier startup founders.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">LinkedIn Profile</label>
                    <div className="relative group">
                      <Linkedin className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                      <input 
                        value={linkedinUrl} onChange={e => setLinkedinUrl(e.target.value)} 
                        placeholder="linkedin.com/in/username" 
                        className="w-full pl-14 pr-6 py-4 bg-gray-50/50 border-2 border-transparent rounded-2xl outline-none focus:bg-white focus:border-gray-900 transition-all font-bold text-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Portfolio or Website (Optional)</label>
                    <div className="relative group">
                      <Globe className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                      <input 
                        placeholder="yoursite.com" 
                        className="w-full pl-14 pr-6 py-4 bg-gray-50/50 border-2 border-transparent rounded-2xl outline-none focus:bg-white focus:border-gray-900 transition-all font-bold text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <button 
                    onClick={saveStep3} disabled={loading}
                    className="w-full py-5 bg-gray-900 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-gray-900/20 disabled:opacity-30"
                  >
                    {loading ? 'Finalizing...' : <>Complete Onboarding <ArrowRight size={18} /></>}
                  </button>
                  <button 
                    onClick={() => router.push('/dashboard')}
                    className="w-full py-2 text-[10px] font-black text-gray-300 uppercase tracking-widest hover:text-gray-900 transition-colors"
                  >
                    Skip for now
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

function SkillSection({ title, subtitle, value, onChange, onAdd, items, onRemove, color }: any) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end ml-1">
        <div>
          <h4 className="text-sm font-black text-gray-900 tracking-tight">{title}</h4>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{subtitle}</p>
        </div>
      </div>
      <div className="flex gap-3">
        <div className="relative flex-1 group">
          <Plus className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-gray-900 transition-colors" size={18} />
          <input 
            value={value} onChange={e => onChange(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), onAdd())}
            placeholder="Search or add skills..."
            className="w-full pl-14 pr-6 py-4 bg-gray-50/50 border-2 border-transparent rounded-2xl outline-none focus:bg-white focus:border-gray-900 transition-all font-bold text-sm"
          />
        </div>
        <button onClick={onAdd} className="px-8 bg-gray-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">Add</button>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item: string) => (
          <motion.span 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            key={item} 
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${color}`}
          >
            {item}
            <button onClick={() => onRemove(item)} className="hover:rotate-90 transition-transform">
              <X size={12} />
            </button>
          </motion.span>
        ))}
        {items.length === 0 && (
          <p className="text-[10px] font-bold text-gray-300 italic ml-2">No skills added yet...</p>
        )}
      </div>
    </div>
  )
}
