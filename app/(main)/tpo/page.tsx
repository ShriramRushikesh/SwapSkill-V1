import { createClient } from '@/lib/supabase/server'
import TpoClient from './tpo-client'

export default async function TpoPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: posts } = await supabase.from('tpo_posts').select('*, profiles(*)').eq('is_active', true).order('created_at', { ascending: false })

  return <TpoClient posts={posts || []} userId={user?.id} userRole={user ? (await supabase.from('profiles').select('role').eq('id', user.id).single()).data?.role : null} />
}
