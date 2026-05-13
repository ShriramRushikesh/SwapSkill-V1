import { Resend } from 'resend'
import {
  VerificationEmail,
  WelcomeEmail,
  SwapRequestEmail,
  ReviewReminderEmail
} from './templates'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendVerificationEmail(email: string, name: string, verificationLink: string) {
  try {
    await resend.emails.send({
      from: 'noreply@swapskill.com',
      to: email,
      subject: 'Verify Your SwapSkill Email',
      react: VerificationEmail({ name, verificationLink })
    })
  } catch (error) {
    console.error('Error sending verification email:', error)
  }
}

export async function sendWelcomeEmail(email: string, name: string, dashboardLink: string) {
  try {
    await resend.emails.send({
      from: 'noreply@swapskill.com',
      to: email,
      subject: 'Welcome to SwapSkill!',
      react: WelcomeEmail({ name, dashboardLink })
    })
  } catch (error) {
    console.error('Error sending welcome email:', error)
  }
}

export async function sendSwapRequestEmail(
  email: string,
  recipientName: string,
  senderName: string,
  projectTitle: string,
  link: string
) {
  try {
    await resend.emails.send({
      from: 'noreply@swapskill.com',
      to: email,
      subject: `${senderName} wants to collaborate on "${projectTitle}"`,
      react: SwapRequestEmail({ recipientName, senderName, projectTitle, link })
    })
  } catch (error) {
    console.error('Error sending swap request email:', error)
  }
}

export async function sendReviewReminderEmail(email: string, name: string, link: string) {
  try {
    await resend.emails.send({
      from: 'noreply@swapskill.com',
      to: email,
      subject: 'Leave a review for your recent swap',
      react: ReviewReminderEmail({ name, link })
    })
  } catch (error) {
    console.error('Error sending review reminder email:', error)
  }
}
