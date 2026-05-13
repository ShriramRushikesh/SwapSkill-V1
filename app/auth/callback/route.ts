import { createClient } from '@/lib/supabase/server'
import { sendWelcomeEmail } from '@/lib/email/send'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/explore'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        let { data: profile } = await supabase
          .from('profiles')
          .select('name, email, role, bio, linkedin_url')
          .eq('id', user.id)
          .single()

        // Create profile if it doesn't exist (e.g. signup upsert failed)
        if (!profile) {
          const { data: newProfile, error: insertError } = await supabase.from('profiles').insert({
            id: user.id,
            email: user.email,
            name: user.user_metadata.full_name || 'User',
            role: user.user_metadata.role || 'student',
          }).select().single()
          
          if (!insertError) profile = newProfile
        }

        // Send welcome email if profile exists
        if (profile?.name && profile?.email) {
          await sendWelcomeEmail(
            profile.email,
            profile.name,
            `${origin}/explore`
          )
        }

        // Redirect logic
        const isOnboardingComplete = !!(profile?.bio && profile?.linkedin_url)
        if (!isOnboardingComplete) {
          return NextResponse.redirect(`${origin}/onboarding`)
        }
      }

      return NextResponse.redirect(`${origin}/explore`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth`)
}
