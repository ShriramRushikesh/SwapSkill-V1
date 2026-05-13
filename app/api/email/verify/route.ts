import { sendVerificationEmail } from '@/lib/email/send'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email, name, verificationLink } = await request.json()

    if (!email || !name || !verificationLink) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await sendVerificationEmail(email, name, verificationLink)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('API Error sending verification email:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
