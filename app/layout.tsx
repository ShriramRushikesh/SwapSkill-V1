import type { Metadata } from 'next'
import { Toaster } from 'sonner'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Script from 'next/script'
import './globals.css'
import { AuthProvider } from '@/lib/contexts/auth-context'

export const metadata: Metadata = {
  title: 'SwapSkill — Build Real Experience, Scale Startups',
  description: 'Connect students with real startup projects. Help startups scale affordably. Enable mentors to guide meaningful growth. Join 1000s already building real experience.',
  keywords: 'skill exchange, internship, startup collaboration, mentorship, student projects, job ready',
  openGraph: {
    type: 'website',
    url: 'https://swapskill.com',
    title: 'SwapSkill — Build Real Experience, Scale Startups',
    description: 'Students gain job-ready experience. Startups scale without hiring costs. Mentors guide meaningful growth.',
    images: [
      {
        url: 'https://swapskill.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SwapSkill'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@swapskill',
    title: 'SwapSkill — Build Real Experience, Scale Startups',
    description: 'Students gain job-ready experience. Startups scale without hiring costs.',
    images: ['https://swapskill.com/og-image.png']
  },
  robots: 'index, follow',
  alternates: {
    canonical: 'https://swapskill.com'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="bg-white min-h-screen flex flex-col">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  )
}
