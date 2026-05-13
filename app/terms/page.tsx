import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-4xl font-black text-gray-900 mb-8">Terms of Service</h1>
        <div className="prose prose-gray max-w-none space-y-6 text-gray-600">
          <p>Last updated: May 13, 2026</p>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p>By accessing or using SwapSkill, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
            <p>SwapSkill is a platform that connects students, startups, and mentors for skill exchange and real-world project collaboration.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Conduct</h2>
            <p>Users are expected to maintain professional behavior, honor their commitments in "swaps", and respect the intellectual property of others.</p>
          </section>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-100">
          <Link href="/" className="text-gray-600 hover:text-gray-900 font-medium">← Back to home</Link>
        </div>
      </div>
    </div>
  )
}
