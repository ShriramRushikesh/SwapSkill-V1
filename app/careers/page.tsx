import Link from 'next/link'

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">Join Our Team</h1>
          <p className="text-xl text-gray-600">Help us democratize skill exchange across India.</p>
        </div>

        <div className="space-y-6 mb-12">
          {[
            { title: 'Product Designer', dept: 'Product', type: 'Full-time' },
            { title: 'Backend Engineer', dept: 'Engineering', type: 'Full-time' },
            { title: 'Growth Manager', dept: 'Marketing', type: 'Full-time' },
            { title: 'Community Manager', dept: 'Operations', type: 'Full-time' }
          ].map((job, i) => (
            <div key={i} className="p-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                  <p className="text-sm text-gray-600">{job.dept}</p>
                </div>
                <span className="text-xs font-semibold bg-gray-100 text-gray-700 px-3 py-1 rounded-full">{job.type}</span>
              </div>
              <a href="#" className="text-gray-900 font-semibold hover:text-gray-600">Learn more →</a>
            </div>
          ))}
        </div>

        <div className="bg-gray-900 text-white p-8 rounded-2xl text-center">
          <p className="text-lg mb-4">Don't see the role you want?</p>
          <Link href="/contact" className="inline-block bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
            Send us your profile
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <Link href="/" className="text-gray-600 hover:text-gray-900 font-medium">← Back to home</Link>
        </div>
      </div>
    </div>
  )
}
