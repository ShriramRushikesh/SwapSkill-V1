import Link from 'next/link'

export default function GuidelinesPage() {
  return (
    <div className="min-h-screen bg-white pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-4xl font-black text-gray-900 mb-8">Community Guidelines</h1>
        <div className="prose prose-gray max-w-none space-y-6 text-gray-600">
          <p>SwapSkill is built on trust and mutual growth. Help us keep it professional and impactful.</p>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Be Real</h2>
            <p>Use your real name and verified credentials. Misrepresentation of skills or identity leads to permanent ban.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Honor Swaps</h2>
            <p>A "swap" is a commitment. Delivering quality work on time is essential for maintaining your reputation score.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Professionalism</h2>
            <p>Treat every interaction as you would in a professional workplace. Respect privacy and confidentiality of startup projects.</p>
          </section>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-100">
          <Link href="/" className="text-gray-600 hover:text-gray-900 font-medium">← Back to home</Link>
        </div>
      </div>
    </div>
  )
}
