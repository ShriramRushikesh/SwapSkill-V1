import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminClient from './admin-client'

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Check if user is admin (hardcoded for now, update later with admin table)
  const ADMIN_IDS = process.env.NEXT_PUBLIC_ADMIN_IDS?.split(',') || []
  if (!user || !ADMIN_IDS.includes(user.id)) redirect('/login')

  const [
    { data: profiles },
    { data: posts },
    { data: requests },
    { count: totalUsers },
    { count: totalSwaps }
  ] = await Promise.all([
    supabase.from('profiles').select('*').order('created_at', { ascending: false }).limit(50),
    supabase.from('swap_posts').select('*').order('created_at', { ascending: false }).limit(50),
    supabase.from('swap_requests').select('*').order('created_at', { ascending: false }).limit(50),
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('swap_requests').select('*', { count: 'exact', head: true }).eq('status', 'completed')
  ])

  return <AdminClient profiles={profiles || []} posts={posts || []} requests={requests || []} totalUsers={totalUsers} totalSwaps={totalSwaps} />
}
