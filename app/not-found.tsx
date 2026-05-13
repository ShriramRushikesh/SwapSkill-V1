import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 pt-20">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-black text-gray-900 mb-4">404</h1>
        <h2 className="h2 mb-3">Page Not Found</h2>
        <p className="body text-gray-600 mb-8">Sorry, the page you&apos;re looking for doesn&apos;t exist. It might have been moved or deleted.</p>
        
        <div className="flex flex-col gap-3">
          <Link href="/explore" className="btn-base btn-primary inline-block">
            Back to Explore
          </Link>
          <Link href="/" className="btn-base btn-secondary inline-block">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
