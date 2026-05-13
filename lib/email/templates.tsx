import React from 'react'

export function VerificationEmail({ name, verificationLink }: { name: string; verificationLink: string }) {
  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ backgroundColor: '#f3f4f6', padding: '40px 20px', textAlign: 'center' }}>
        <h1 style={{ color: '#111827', margin: '0 0 20px 0', fontSize: '28px', fontWeight: 'bold' }}>
          Verify Your Email
        </h1>
      </div>
      
      <div style={{ padding: '40px 20px', backgroundColor: '#ffffff' }}>
        <p style={{ color: '#374151', fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>
          Hi {name},
        </p>
        
        <p style={{ color: '#374151', fontSize: '16px', lineHeight: '1.6', marginBottom: '30px' }}>
          Welcome to SwapSkill! Click the button below to verify your email address and activate your account.
        </p>

        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <a href={verificationLink} style={{
            backgroundColor: '#1f2937',
            color: '#ffffff',
            padding: '12px 32px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold',
            display: 'inline-block',
            fontSize: '16px'
          }}>
            Verify Email
          </a>
        </div>

        <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
          Or copy and paste this link in your browser:
        </p>
        <p style={{ color: '#2563eb', fontSize: '12px', wordBreak: 'break-all', marginBottom: '30px' }}>
          {verificationLink}
        </p>

        <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: '1.6', marginBottom: '10px' }}>
          This link expires in 24 hours.
        </p>

        <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
          If you didn&apos;t sign up for SwapSkill, you can safely ignore this email.
        </p>
      </div>

      <div style={{ backgroundColor: '#f3f4f6', padding: '20px', textAlign: 'center', color: '#6b7280', fontSize: '12px' }}>
        <p>© 2026 SwapSkill. All rights reserved.</p>
      </div>
    </div>
  )
}

export function WelcomeEmail({ name, dashboardLink }: { name: string; dashboardLink: string }) {
  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ backgroundColor: '#1f2937', color: '#ffffff', padding: '40px 20px', textAlign: 'center' }}>
        <h1 style={{ margin: '0', fontSize: '28px', fontWeight: 'bold' }}>Welcome to SwapSkill!</h1>
      </div>
      
      <div style={{ padding: '40px 20px', backgroundColor: '#ffffff' }}>
        <p style={{ color: '#374151', fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>
          Hi {name},
        </p>
        
        <p style={{ color: '#374151', fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>
          Your account is now active! You&apos;re ready to start building real experience, posting projects, and growing your network.
        </p>

        <h2 style={{ color: '#111827', fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>What&apos;s Next?</h2>
        <ul style={{ color: '#374151', fontSize: '14px', lineHeight: '1.8', marginBottom: '30px', paddingLeft: '20px' }}>
          <li>Complete your profile with skills and experience</li>
          <li>Browse projects and connect with others</li>
          <li>Post your first project or apply to existing ones</li>
          <li>Build your reputation through completed work</li>
        </ul>

        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <a href={dashboardLink} style={{
            backgroundColor: '#1f2937',
            color: '#ffffff',
            padding: '12px 32px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold',
            display: 'inline-block',
            fontSize: '16px'
          }}>
            Go to Dashboard
          </a>
        </div>

        <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: '1.6', marginBottom: '10px' }}>
          Need help? Check out our FAQ or contact <a href="mailto:support@swapskill.com" style={{ color: '#2563eb', textDecoration: 'none' }}>support@swapskill.com</a>
        </p>
      </div>

      <div style={{ backgroundColor: '#f3f4f6', padding: '20px', textAlign: 'center', color: '#6b7280', fontSize: '12px' }}>
        <p>© 2026 SwapSkill. Building the future of skill exchange.</p>
      </div>
    </div>
  )
}

export function SwapRequestEmail({ recipientName, senderName, projectTitle, link }: any) {
  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ padding: '40px 20px', backgroundColor: '#ffffff' }}>
        <p style={{ color: '#374151', fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>
          Hi {recipientName},
        </p>
        
        <p style={{ color: '#374151', fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>
          <strong>{senderName}</strong> has requested to collaborate on <strong>&quot;{projectTitle}&quot;</strong>.
        </p>

        <div style={{ backgroundColor: '#f3f4f6', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
          <p style={{ margin: '0', color: '#6b7280', fontSize: '14px' }}>View their request and respond in your dashboard.</p>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <a href={link} style={{
            backgroundColor: '#1f2937',
            color: '#ffffff',
            padding: '12px 32px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold',
            display: 'inline-block'
          }}>
            View Request
          </a>
        </div>
      </div>
    </div>
  )
}

export function ReviewReminderEmail({ name, link }: any) {
  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ padding: '40px 20px', backgroundColor: '#ffffff' }}>
        <p style={{ color: '#374151', fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>
          Hi {name},
        </p>
        
        <p style={{ color: '#374151', fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>
          Your recent swap has been completed! Help build our trusted community by leaving a review.
        </p>

        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <a href={link} style={{
            backgroundColor: '#1f2937',
            color: '#ffffff',
            padding: '12px 32px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold',
            display: 'inline-block'
          }}>
            Leave Review
          </a>
        </div>
      </div>
    </div>
  )
}
