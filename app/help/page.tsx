'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export default function HelpPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const faqs = [
    {
      q: 'Is SwapSkill really free?',
      a: 'Yes, SwapSkill is completely free for students. They can browse projects, post swaps, build portfolios, and get reviews at no cost. Mentors and startups have optional paid plans for advanced features like priority listing and analytics.'
    },
    {
      q: 'How does the verification process work?',
      a: 'We verify users based on their role: Students through college email or LinkedIn, Startups through GST/website, Mentors through LinkedIn profile review, and TPOs through official institute email. Verification takes 24-48 hours.'
    },
    {
      q: 'Can I do multiple swaps at once?',
      a: 'Yes! You can have multiple projects going simultaneously. Manage them all in your dashboard. We recommend starting with 1-2 until you\'re comfortable with the platform.'
    },
    {
      q: 'What if someone doesn\'t complete their part of the swap?',
      a: 'Both parties can report issues in the dashboard. Our team reviews disputes and can mediate. Repeated non-compliance results in account suspension. Reputation is everything on SwapSkill.'
    },
    {
      q: 'How do I withdraw my reputation credits?',
      a: 'Reputation credits don\'t get "withdrawn" like money. They stay on your profile as proof of your work quality. In future versions, you\'ll be able to convert them to paid work opportunities or premium features.'
    },
    {
      q: 'Can I edit or delete my projects?',
      a: 'Yes! You can edit active projects anytime. Once someone has requested or started your project, you can only close it (not delete). This keeps history intact for accountability.'
    },
    {
      q: 'Is there a minimum commitment period?',
      a: 'No. Every project is flexible. You define the duration (1 hour to multiple weeks). Both parties must agree before starting. No long-term contracts.'
    },
    {
      q: 'How do reviews and ratings work?',
      a: 'After completing a swap, both parties can leave a review (1-5 stars + comment). Reviews are public and permanent. They build your reputation over time. Be honest and fair.'
    }
  ]

  const support = [
    {
      icon: '📧',
      title: 'Email Support',
      desc: 'Response within 24 hours',
      link: 'support@swapskill.com'
    },
    {
      icon: '💬',
      title: 'Live Chat',
      desc: 'Mon-Fri, 10 AM - 6 PM IST',
      link: 'Chat with us'
    },
    {
      icon: '🎓',
      title: 'Learning Resources',
      desc: 'Guides, tutorials, tips',
      link: '/blog'
    },
    {
      icon: '🐛',
      title: 'Report a Bug',
      desc: 'Help us improve the platform',
      link: 'bugs@swapskill.com'
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
            How Can We Help?
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600"
          >
            Find answers to common questions or reach out to our support team.
          </motion.p>
        </div>
      </section>

      {/* Support Options */}
      <section className="px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-16 sm:mb-20">
            {support.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                className="p-6 sm:p-8 bg-white border border-gray-200 rounded-2xl hover:shadow-lg transition-all"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.desc}</p>
                {item.link.startsWith('http') || item.link.startsWith('mailto:') ? (
                  <a href={item.link} className="text-gray-900 font-semibold text-sm hover:text-gray-600">
                    {item.link === '/blog' ? 'View Resources →' : item.link} →
                  </a>
                ) : item.link.startsWith('/') ? (
                  <Link href={item.link} className="text-gray-900 font-semibold text-sm hover:text-gray-600">
                    {item.link} →
                  </Link>
                ) : (
                  <a href={`mailto:${item.link}`} className="text-gray-900 font-semibold text-sm hover:text-gray-600">
                    {item.link} →
                  </a>
                )}
              </motion.div>
            ))}
          </div>

          {/* FAQs */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-8">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  className="border border-gray-200 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full p-5 sm:p-6 flex items-center justify-between bg-white hover:bg-gray-50 transition text-left"
                  >
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{faq.q}</h3>
                    <motion.span
                      animate={{ rotate: openFaq === i ? 180 : 0 }}
                      className="text-xl flex-shrink-0 ml-4"
                    >
                      ↓
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border-t border-gray-200 bg-gray-50"
                      >
                        <p className="p-5 sm:p-6 text-sm sm:text-base text-gray-600 leading-relaxed">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Still need help? */}
      <section className="px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 bg-gray-900 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">Still Need Help?</h2>
          <p className="text-gray-300 mb-8">Our support team is here to help. Reach out anytime.</p>
          <Link 
            href="/contact"
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-900 px-8 py-4 rounded-xl font-semibold transition"
          >
            Contact Support
            <span>→</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
