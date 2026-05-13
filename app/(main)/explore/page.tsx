import { createClient } from '@/lib/supabase/server'
import ExploreClient from './explore-client'

export default async function ExplorePage() {
  const supabase = await createClient()
  
  const [
    { data: { user } },
    { data: posts }
  ] = await Promise.all([
    supabase.auth.getUser(),
    supabase
      .from('swap_posts')
      .select('*, profiles(*)')
      .eq('is_open', true)
      .order('created_at', { ascending: false })
      .limit(50)
  ])

  return (
    <div className="min-h-screen bg-brand-offwhite pt-16">
      {/* Hero Section */}
      <section className="hero-gradient py-20 px-6 border-b border-brand-border">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-charcoal tracking-tighter mb-6">
            Find Startup Projects
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10">
            Browse real opportunities to gain experience and build your portfolio.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <ExploreClient posts={posts || []} currentUserId={user?.id || null} />
      </div>
    </div>
  )
}
