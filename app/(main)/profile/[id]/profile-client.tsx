'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Profile, UserSkill, SwapPost, Review } from '@/types'
import { timeAgo } from '@/lib/utils'
import RequestModal from '@/components/request-modal'

export default function ProfileClient({ profile, skills, posts, reviews, avgRating, currentUserId }: {
  profile: Profile
  skills: UserSkill[]
  posts: SwapPost[]
  reviews: Review[]
  avgRating: string | null
  currentUserId: string | null
}) {
  const [selectedPost, setSelectedPost] = useState<SwapPost | null>(null)
  const isOwn = currentUserId === profile.id

  const offerSkills = skills.filter(s => s.type === 'offer')
  const wantSkills = skills.filter(s => s.type === 'want')

  return (
    <div className="section-py container-x container-max max-w-4xl">
      {/* Header Card */}
      <div className="card-base card-p mb-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-28 h-28 rounded-2xl bg-gray-50 flex items-center justify-center text-5xl font-bold text-gray-900 flex-shrink-0 border border-gray-100 overflow-hidden shadow-sm">
            {profile.avatar_url ? (
              <Image src={profile.avatar_url} alt={profile.name || ''} width={112} height={112} className="w-full h-full object-cover"/>
            ) : (
              profile.name?.[0]?.toUpperCase()
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="h2">{profile.name}</h1>
              {profile.is_verified && <span className="text-gray-900 text-xl">✓</span>}
            </div>
            <p className="body !text-gray-500 capitalize mb-4">
              {profile.role} {profile.location ? `· ${profile.location}` : ''}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8 mb-6">
              {profile.college && <p className="small text-gray-500 flex items-center gap-2"><span>📚</span> {profile.college}</p>}
              {profile.company && <p className="small text-gray-500 flex items-center gap-2"><span>🏢</span> {profile.company}</p>}
            </div>

            {profile.bio && <p className="body mb-6">{profile.bio}</p>}
            
            {avgRating && (
              <div className="flex items-center gap-2">
                <span className="text-amber-400">★</span>
                <span className="text-sm font-bold">{avgRating}</span>
                <span className="caption">({reviews.length} reviews)</span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 w-full md:w-auto">
            {isOwn ? (
              <>
                <Link href="/profile/edit" className="btn-base btn-primary text-center !py-3">
                  Edit Profile
                </Link>
                <Link href="/dashboard" className="btn-base btn-secondary text-center !py-3">
                  Dashboard
                </Link>
              </>
            ) : (
              <button 
                onClick={() => posts.length > 0 && setSelectedPost(posts[0])} 
                disabled={posts.length === 0}
                className="btn-base btn-primary !py-3 px-8 disabled:opacity-50"
              >
                Collaborate
              </button>
            )}
          </div>
        </div>

        {/* Skills Section */}
        {(offerSkills.length > 0 || wantSkills.length > 0) && (
          <div className="mt-10 pt-8 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-8">
            {offerSkills.length > 0 && (
              <div>
                <p className="caption font-black uppercase mb-3">Skills & Expertise</p>
                <div className="flex flex-wrap gap-2">
                  {offerSkills.map(s => (
                    <span key={s.id} className="bg-gray-100 text-gray-900 text-[11px] font-bold px-3 py-1.5 rounded-lg border border-gray-200">
                      {s.skill_name}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {wantSkills.length > 0 && (
              <div>
                <p className="caption font-black uppercase mb-3">Open to Collaborate On</p>
                <div className="flex flex-wrap gap-2">
                  {wantSkills.map(s => (
                    <span key={s.id} className="bg-indigo-50 text-indigo-600 text-[11px] font-bold px-3 py-1.5 rounded-lg border border-indigo-100">
                      {s.skill_name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Projects */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="h3">Active Projects</h2>
          <div className="space-y-4">
            {posts.map(post => (
              <div key={post.id} className="card-base card-p card-hover group cursor-pointer" onClick={() => setSelectedPost(post)}>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-base font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{post.title}</h3>
                  <span className="caption !text-[10px]">{post.category}</span>
                </div>
                <div className="space-y-2 mb-6">
                  <p className="small !text-gray-600 flex items-center gap-2"><span className="text-emerald-500 font-black">Offer:</span> {post.offering}</p>
                  <p className="small !text-gray-600 flex items-center gap-2"><span className="text-indigo-500 font-black">Want:</span> {post.looking_for}</p>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                  <span className="caption !text-[10px]">{timeAgo(post.created_at)}</span>
                  {!isOwn && <span className="text-xs font-black text-gray-900">Request →</span>}
                </div>
              </div>
            ))}
            {posts.length === 0 && (
              <div className="py-12 text-center card-base card-p">
                <p className="body text-gray-500">No active projects yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Reviews */}
        <div className="space-y-6">
          <h2 className="h3">Reviews</h2>
          <div className="space-y-4">
            {reviews.map(r => (
              <div key={r.id} className="card-base card-p bg-gray-50/50">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-sm ${i < r.rating ? 'text-amber-400' : 'text-gray-200'}`}>★</span>
                  ))}
                </div>
                {r.comment && <p className="small !text-gray-600 mb-3 line-clamp-3 italic">&quot;{r.comment}&quot;</p>}
                <p className="caption !text-[10px]">{timeAgo(r.created_at)}</p>
              </div>
            ))}
            {reviews.length === 0 && (
              <div className="py-12 text-center card-base card-p">
                <p className="body text-gray-500">No reviews yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedPost && (
        <RequestModal 
          post={selectedPost} 
          onClose={() => setSelectedPost(null)} 
          onSuccess={() => setSelectedPost(null)} 
        />
      )}
    </div>
  )
}
