import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import DashboardClient from './dashboard-client'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const [
    { data: posts },
    { data: sentRequests },
    { data: notifications },
    { data: profile }
  ] = await Promise.all([
    supabase.from('swap_posts').select('*, requests:swap_requests(*)').eq('user_id', user.id).order('created_at', { ascending: false }),
    supabase.from('swap_requests').select('*, posts:swap_posts(*, profiles(*))').eq('requester_id', user.id).order('created_at', { ascending: false }),
    supabase.from('notifications').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(20),
    supabase.from('profiles').select('*').eq('id', user.id).single()
  ])

  return <DashboardClient
    posts={posts || []}
    sentRequests={sentRequests || []}
    notifications={notifications || []}
    profile={profile}
  />
}
