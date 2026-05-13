'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const CATEGORIES = ['Design','Development','Marketing','Data','Business','Writing','Other']
const DURATIONS = [1,2,4,8,12]

export default function PostSwapPage() {
  const [title, setTitle] = useState('')
  const [offering, setOffering] = useState('')
  const [lookingFor, setLookingFor] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [mode, setMode] = useState<'online'|'offline'|'both'>('online')
  const [duration, setDuration] = useState(1)
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState('')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { router.push('/login'); return }
      setUserId(data.user.id)
    })
  }, [router, supabase])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title || !offering || !lookingFor || !category) {
      toast.error('Please fill all required fields')
      return
    }
    setLoading(true)
    const { error } = await supabase.from('swap_posts').insert({
      user_id: userId,
      title, offering,
      looking_for: lookingFor,
      description: description || null,
      category, mode,
      duration_hrs: duration,
    })
    if (error) { toast.error(error.message); setLoading(false); return }
    toast.success('Project posted successfully!')
    router.push('/explore')
  }

  return (
    <div className="section-py container-x container-max max-w-3xl">
      <div className="mb-12">
        <h1 className="h1 mb-2">Post a Project</h1>
        <p className="body text-gray-500">Describe the work you need done and what you&apos;re offering in return.</p>
      </div>

      <form onSubmit={handleSubmit} className="card-base card-p space-y-10">
        <div className="space-y-6">
          <div>
            <label className="label-base">Project Title *</label>
            <input value={title} onChange={e => setTitle(e.target.value)} required
              placeholder="e.g. Build our Landing Page in React"
              className="input-base"/>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label-base">Work needed *</label>
              <input value={offering} onChange={e => setOffering(e.target.value)} required
                placeholder="e.g. Full-stack development for MVP"
                className="input-base"/>
            </div>
            <div>
              <label className="label-base">What you offer *</label>
              <input value={lookingFor} onChange={e => setLookingFor(e.target.value)} required
                placeholder="e.g. 1% Equity + Mentorship"
                className="input-base"/>
            </div>
          </div>

          <div>
            <label className="label-base">Project Details</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)}
              placeholder="Details about your timeline, availability, and specific goals..."
              rows={4} className="input-base resize-none"/>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <label className="label-base mb-4 text-center block">Category</label>
            <div className="flex flex-wrap justify-center gap-2">
              {CATEGORIES.map(c => (
                <button key={c} type="button" onClick={() => setCategory(c)}
                  className={`px-6 py-2.5 rounded-lg text-xs font-bold transition-all ${
                    category === c 
                      ? 'bg-gray-900 text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="label-base mb-4 block">Mode</label>
              <div className="flex gap-2">
                {(['online','offline','both'] as const).map(m => (
                  <button key={m} type="button" onClick={() => setMode(m)}
                    className={`flex-1 py-3 rounded-lg text-xs font-bold transition-all ${
                      mode === m 
                        ? 'bg-gray-900 text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}>
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="label-base mb-4 block">Est. Duration</label>
              <div className="flex gap-2">
                {DURATIONS.map(d => (
                  <button key={d} type="button" onClick={() => setDuration(d)}
                    className={`flex-1 py-3 rounded-lg text-xs font-bold transition-all ${
                      duration === d 
                        ? 'bg-gray-900 text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}>
                    {d}h
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <button type="submit" disabled={loading}
          className="btn-base btn-primary w-full !py-4 text-sm font-bold">
          {loading ? 'Posting...' : 'Post Project'}
        </button>
      </form>
    </div>
  )
}
