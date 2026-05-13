import { createClient } from '@/lib/supabase/server'
import MentorshipClient from './mentorship-client'

export default async function MentorshipHubPage() {
  const supabase = await createClient()
  
  const { data: mentors } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'mentor')
    .eq('is_verified', true)
    .order('reputation_score', { ascending: false })
    .limit(50)

  return <MentorshipClient initialMentors={mentors || []} />
}
