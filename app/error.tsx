'use client'
import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 pt-20">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-black text-gray-900 mb-4">500</h1>
        <h2 className="h2 mb-3">Something Went Wrong</h2>
        <p className="body text-gray-600 mb-8">We encountered an unexpected error. Our team has been notified and we&apos;re working to fix it.</p>
        
        <div className="flex flex-col gap-3">
          <button onClick={() => reset()} className="btn-base btn-primary w-full">
            Try Again
          </button>
          <Link href="/" className="btn-base btn-secondary inline-block">
            Back to Home
          </Link>
        </div>

        {error.digest && <p className="text-xs text-gray-400 mt-12 font-mono uppercase tracking-widest">Error ID: {error.digest}</p>}
      </div>
    </div>
  )
}
