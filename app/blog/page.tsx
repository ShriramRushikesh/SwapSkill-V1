'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function BlogPage() {
  const articles = [
    {
      id: 1,
      title: 'How to Build a Job-Ready Portfolio Without a Full-Time Job',
      category: 'Career Advice',
      readTime: '8 min read',
      date: 'May 10, 2026',
      excerpt: 'Learn how students are using real projects to build portfolios that actually impress employers.',
      image: '📚'
    },
    {
      id: 2,
      title: '5 Ways Startups Are Scaling Without Hiring Full-Time Teams',
      category: 'Startup Growth',
      readTime: '6 min read',
      date: 'May 8, 2026',
      excerpt: 'Discover how founders are using SwapSkill to complete critical tasks affordably.',
      image: '🚀'
    },
    {
      id: 3,
      title: 'Mentorship That Matters: Guiding the Next Generation',
      category: 'Mentorship',
      readTime: '7 min read',
      date: 'May 5, 2026',
      excerpt: 'Experienced professionals share how they\'re making meaningful impact through SwapSkill.',
      image: '🎯'
    },
    {
      id: 4,
      title: 'The Future of Skill Exchange in India',
      category: 'Industry Trends',
      readTime: '10 min read',
      date: 'May 1, 2026',
      excerpt: 'How reputation economies are reshaping education and employment in India.',
      image: '🌱'
    }
  ]

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Header */}
      <section className="px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6"
          >
            SwapSkill Blog
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600"
          >
            Stories, tips, and insights from our community.
          </motion.p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {articles.map((article, i) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="p-6 sm:p-8 bg-white border border-gray-200 rounded-2xl hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{article.image}</div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">{article.category}</span>
                  <span className="text-xs text-gray-500">{article.readTime}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 line-clamp-2">{article.title}</h2>
                <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-2">{article.excerpt}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-500">{article.date}</span>
                  <Link href="#" className="text-gray-900 font-semibold text-sm hover:text-gray-600">
                    Read →
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 bg-gray-900 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">Stay Updated</h2>
          <p className="text-gray-300 mb-8">Get weekly tips on building real experience, growing startups, and mentoring effectively.</p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Your email" 
              className="flex-1 px-4 py-3 rounded-xl text-gray-900 outline-none focus:ring-2 focus:ring-gray-600"
            />
            <button className="bg-white hover:bg-gray-100 text-gray-900 px-6 py-3 rounded-xl font-semibold transition">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
