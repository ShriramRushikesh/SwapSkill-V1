import Link from 'next/link'

export default function StartupAccess() {
  return (
    <div className="min-h-screen bg-white pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">For Startups</h1>
          <p className="text-xl text-gray-600">Find skilled talent. Scale affordably. Grow faster.</p>
        </div>

        <div className="space-y-8 mb-12">
          <div className="p-8 bg-gray-50 border border-gray-200 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Why Startups Love SwapSkill</h2>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold">✓</span>
                <span>Find skilled students without hefty hiring costs</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold">✓</span>
                <span>Complete critical tasks 30% faster</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold">✓</span>
                <span>Access verified, motivated talent</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold">✓</span>
                <span>Scale your team without long-term commitment</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold">✓</span>
                <span>Build a loyal network of contributors</span>
              </li>
            </ul>
          </div>

          <div className="p-8 bg-gray-50 border border-gray-200 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Pricing Plans</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-white border border-gray-100 rounded-xl">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Free Tier</p>
                <p className="text-3xl font-black text-gray-900 mb-4">₹0</p>
                <p className="text-sm text-gray-600 mb-6">Perfect for early founders exploring the community.</p>
                <ul className="space-y-2 text-xs text-gray-500 mb-8">
                  <li>• Post 2 projects/month</li>
                  <li>• Community support</li>
                  <li>• Basic analytics</li>
                </ul>
                <button className="w-full py-2 bg-gray-100 text-gray-600 rounded-lg font-bold hover:bg-gray-200 transition-all">Get Started</button>
              </div>
              <div className="p-6 bg-gray-900 text-white rounded-xl shadow-xl shadow-gray-900/20 relative overflow-hidden">
                <div className="absolute top-2 right-2 px-2 py-1 bg-yellow-400 text-gray-900 text-[10px] font-bold rounded uppercase">Popular</div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Scale Plan</p>
                <p className="text-3xl font-black mb-4">₹2,999<span className="text-xs text-gray-400">/mo</span></p>
                <p className="text-sm text-gray-300 mb-6">Unlimited projects and advanced team features.</p>
                <ul className="space-y-2 text-xs text-gray-400 mb-8">
                  <li>• Unlimited project posts</li>
                  <li>• Priority listing</li>
                  <li>• Team collaboration</li>
                  <li>• API Access</li>
                </ul>
                <button className="w-full py-2 bg-white text-gray-900 rounded-lg font-bold hover:scale-[1.02] transition-all">Go Pro</button>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link href="/signup" className="inline-block bg-gray-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/20">
            Register as Startup
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <Link href="/" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">← Back to home</Link>
        </div>
      </div>
    </div>
  )
}
