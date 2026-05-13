import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import ProfileClient from './profile-client'

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', params.id).single()
  const { data: skills } = await supabase.from('user_skills').select('*').eq('user_id', params.id)
  const { data: posts } = await supabase.from('swap_posts').select('*').eq('user_id', params.id).eq('is_open', true).limit(5)
  const { data: reviews } = await supabase.from('reviews').select('*').eq('reviewee_id', params.id)

  if (!profile) notFound()

  const avgRating = reviews?.length ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : null

  return <ProfileClient profile={profile} skills={skills || []} posts={posts || []} reviews={reviews || []} avgRating={avgRating} currentUserId={user?.id || null} />
}
