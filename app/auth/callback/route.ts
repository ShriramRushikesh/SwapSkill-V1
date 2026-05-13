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
        const { data: profile } = await supabase
          .from('profiles')
          .select('name, email, role')
          .eq('id', user.id)
          .single()

        // Send welcome email if profile exists
        if (profile?.name && profile?.email) {
          await sendWelcomeEmail(
            profile.email,
            profile.name,
            `${origin}/dashboard`
          )
        }

        // Redirect logic
        if (!profile?.name || !profile?.role) {
          return NextResponse.redirect(`${origin}/onboarding`)
        }
      }

      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth`)
}
