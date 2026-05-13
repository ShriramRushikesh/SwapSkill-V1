import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-4xl font-black text-gray-900 mb-8">Privacy Policy</h1>
        <div className="prose prose-gray max-w-none space-y-6 text-gray-600">
          <p>Last updated: May 13, 2026</p>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
            <p>We collect information you provide directly to us when you create an account, build your profile, or communicate with other users. This includes your name, email address, LinkedIn profile, and any other information you choose to share.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Information</h2>
            <p>We use the information we collect to provide, maintain, and improve our services, to facilitate connections between students, startups, and mentors, and to verify user identities.</p>
          </section>
          <p>For any questions regarding this policy, please contact us at support@swapskill.com</p>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-100">
          <Link href="/" className="text-gray-600 hover:text-gray-900 font-medium">← Back to home</Link>
        </div>
      </div>
    </div>
  )
}
