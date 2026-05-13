'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SwapPost, Profile } from '@/types'
import { timeAgo } from '@/lib/utils'
import RequestModal from '@/components/request-modal'

const CATEGORIES = ['All','Design','Development','Marketing','Finance','Language','Music','Other']

export default function ExploreClient({ posts, currentUserId }: { posts: (SwapPost & { profiles: Profile })[], currentUserId: string | null }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [selectedPost, setSelectedPost] = useState<SwapPost | null>(null)

  const filtered = posts.filter(p => {
    const matchSearch = !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.offering.toLowerCase().includes(search.toLowerCase()) ||
      p.looking_for.toLowerCase().includes(search.toLowerCase())
    const matchCat = category === 'All' || p.category === category
    return matchSearch && matchCat
  })

  return (
    <div className="section-py container-x container-max">
      {/* Category filters */}
      <div className="flex gap-2 mb-12 overflow-x-auto pb-4 no-scrollbar">
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)}
            className={`flex-shrink-0 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
              category === cat 
                ? 'bg-gray-900 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Posts grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-24 card-base card-p">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">✨</div>
          <h3 className="h3 mb-2">No projects found</h3>
          <p className="body text-gray-500 mb-8 max-w-xs mx-auto">Try adjusting your filters or be the first to post a new project!</p>
          <Link href="/post" className="btn-base btn-primary inline-block">
            Post a Project
          </Link>
        </div>
      ) : (
        <div className="grid-responsive">
          {filtered.map(post => (
            <div key={post.id} className="card-base card-hover card-p group flex flex-col">
              {/* User info */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex-shrink-0 overflow-hidden border border-gray-100">
                  {post.profiles?.avatar_url ? (
                    <Image src={post.profiles.avatar_url} alt="" width={40} height={40} className="w-full h-full object-cover"/>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold">
                      {post.profiles?.name?.[0]?.toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">{post.profiles?.name}</p>
                  <p className="caption tracking-tight">{post.profiles?.role}</p>
                </div>
              </div>
              
              {/* Title + description */}
              <div className="flex-1">
                <h3 className="text-base font-bold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-gray-600 transition-colors">{post.title}</h3>
                <p className="small text-gray-500 mb-6 line-clamp-2">{post.description}</p>
              </div>
              
              {/* Tags/Offers */}
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <span className="caption !text-[10px] mt-1 text-emerald-500 font-black">Offer:</span>
                  <span className="small font-semibold text-gray-700">{post.offering}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="caption !text-[10px] mt-1 text-indigo-500 font-black">Want:</span>
                  <span className="small font-semibold text-gray-700">{post.looking_for}</span>
                </div>
              </div>
              
              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="caption !text-[10px] !lowercase">{timeAgo(post.created_at)}</span>
                {currentUserId === post.user_id ? (
                  <span className="caption !text-indigo-500 font-black">My Post</span>
                ) : (
                  <button onClick={() => setSelectedPost(post)}
                    className="btn-base btn-primary !py-2 !px-5 text-xs">
                    Request
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedPost && (
        <RequestModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onSuccess={() => { setSelectedPost(null) }}
        />
      )}
    </div>
  )
}
