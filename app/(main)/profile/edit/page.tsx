'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Profile } from '@/types'

export default function EditProfilePage() {
 const [profile, setProfile] = useState<Profile | null>(null)
 const [name, setName] = useState('')
 const [bio, setBio] = useState('')
 const [college, setCollege] = useState('')
 const [company, setCompany] = useState('')
 const [location, setLocation] = useState('')
 const [linkedinUrl, setLinkedinUrl] = useState('')
 const [loading, setLoading] = useState(false)
 const router = useRouter()
 const supabase = createClient()

 useEffect(() => {
 supabase.auth.getUser().then(async ({ data }) => {
 if (!data.user) { router.push('/login'); return }
 const { data: p } = await supabase.from('profiles').select('*').eq('id', data.user.id).single()
 if (p) {
 setProfile(p)
 setName(p.name || '')
 setBio(p.bio || '')
 setCollege(p.college || '')
 setCompany(p.company || '')
 setLocation(p.location || '')
 setLinkedinUrl(p.linkedin_url || '')
 }
 })
 }, [router, supabase])

 async function handleSave(e: React.FormEvent) {
 e.preventDefault()
 if (!profile) return
 setLoading(true)
 const { error } = await supabase.from('profiles').update({
 name, bio, college, company, location, linkedin_url: linkedinUrl
 }).eq('id', profile.id)
 if (error) { toast.error(error.message); setLoading(false); return }
 toast.success('Profile updated!')
 router.push(`/profile/${profile.id}`)
 }

 if (!profile) return <div className="min-h-screen pt-14 bg-gray-50 flex items-center justify-center"><p className="text-gray-400">Loading...</p></div>

 return (
 <div className="min-h-screen bg-gray-50 pt-14">
 <div className="max-w-2xl mx-auto px-4 py-10">
 <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Profile</h1>
 <form onSubmit={handleSave} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
 <div>
 <label className="text-sm font-medium text-gray-700 block mb-2">Name</label>
 <input value={name} onChange={e => setName(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-500"/>
 </div>
 <div>
 <label className="text-sm font-medium text-gray-700 block mb-2">Bio</label>
 <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-500 resize-none"/>
 </div>
 {profile.role === 'student' && (
 <div>
 <label className="text-sm font-medium text-gray-700 block mb-2">College</label>
 <input value={college} onChange={e => setCollege(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-500"/>
 </div>
 )}
 {['startup','mentor'].includes(profile.role) && (
 <div>
 <label className="text-sm font-medium text-gray-700 block mb-2">Company</label>
 <input value={company} onChange={e => setCompany(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-500"/>
 </div>
 )}
 <div>
 <label className="text-sm font-medium text-gray-700 block mb-2">Location</label>
 <input value={location} onChange={e => setLocation(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-500"/>
 </div>
 <div>
 <label className="text-sm font-medium text-gray-700 block mb-2">LinkedIn URL</label>
 <input value={linkedinUrl} onChange={e => setLinkedinUrl(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-500"/>
 </div>
 <button type="submit" disabled={loading} className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-xl py-3 text-sm font-semibold transition disabled:opacity-50">
 {loading ? 'Saving...' : 'Save Changes'}
 </button>
 </form>
 </div>
 </div>
 )
}
