'use client'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'

// ============= SCROLL ANIMATIONS =============

function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end center'] })
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

  return (
    <motion.section ref={ref} style={{ opacity, scale }} className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 pt-20 overflow-hidden bg-white">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{ y: [0, 100, 0], x: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ y: [0, -100, 0], x: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, delay: 2 }}
        />
      </div>

      <motion.div 
        className="max-w-5xl mx-auto text-center z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Badge */}
        <motion.div 
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full text-xs sm:text-sm font-medium text-gray-700 mb-6"
          whileHover={{ scale: 1.05 }}
        >
          <span className="w-2 h-2 bg-gray-900 rounded-full animate-pulse"/>
          Real Work. Real Growth. Real Impact.
        </motion.div>

        {/* Main Heading with gradient */}
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Build Real
          <br className="hidden sm:block"/>
          <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
            Experience.
          </span>
          <br/>
          Scale Startups.
        </motion.h1>

        {/* Subheading */}
        <motion.p 
          className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Students work on real startup projects instead of dummy assignments. Startups hire affordably without heavy costs. Mentors guide meaningful growth. All through reputation and impact, not money.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link 
              href="/signup" 
              className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Start Building Free
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                →
              </motion.span>
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link 
              href="#how-it-works"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300"
            >
              See How It Works
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {[
            { number: '1000+', label: 'Students & Professionals' },
            { number: '150+', label: 'Projects Posted' },
            { number: '45+', label: 'Completed Swaps' }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="p-4 sm:p-5 md:p-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all"
            >
              <p className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900">{stat.number}</p>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

// ============= SCROLL TEXT REVEAL =============

function ScrollReveal() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-100px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start center', 'end center'] })
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.1])

  return (
    <motion.section ref={ref} className="py-12 sm:py-16 md:py-20 bg-white">
      <motion.div style={{ opacity, scale }} className="text-center px-4">
        <p className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900">
          Work that matters.<br/>Growth that compounds.<br/>Network that lasts.
        </p>
      </motion.div>
    </motion.section>
  )
}

// ============= HOW IT WORKS (4 USER TYPES) =============

function HowItWorks() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const roles = [
    {
      title: 'Students',
      description: 'Trade dummy assignments for real startup projects. Build portfolio. Earn reputation credits that employers actually respect.',
      icon: '👨🎓',
      color: 'from-blue-50 to-blue-100',
      highlight: 'Real work. Real portfolio.',
      benefits: ['Job-ready experience', 'Verified internship letters', 'Industry connections', 'Reputation score']
    },
    {
      title: 'Startups',
      description: 'Find skilled students. Complete critical tasks. Scale without the weight of hiring full-time teams during foundation stage.',
      icon: '🚀',
      color: 'from-purple-50 to-purple-100',
      highlight: 'Affordable scaling.',
      benefits: ['Access to talent on-demand', 'Complete tasks 30% faster', 'No hiring overhead', 'Quality work, real commitment']
    },
    {
      title: 'Mentors',
      description: 'Guide startups and students. Stay connected to innovation. Build reputation as a trusted advisor who shapes futures.',
      icon: '🎯',
      color: 'from-orange-50 to-orange-100',
      highlight: 'Meaningful impact.',
      benefits: ['Make real impact', 'Stay relevant', 'Build advisor network', 'Earn reputation']
    },
    {
      title: 'Colleges & TPOs',
      description: 'Track student growth through real work. Improve placements 3x. Build industry partnerships that last.',
      icon: '🏫',
      color: 'from-green-50 to-green-100',
      highlight: 'Better placements.',
      benefits: ['Real industry exposure', '90% placement rate', 'Student tracking', 'Industry partnerships']
    }
  ]

  return (
    <section id="how-it-works" className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Four user types. One ecosystem. Everyone wins.</p>
        </motion.div>

        {/* Grid of roles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {roles.map((role, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, shadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              className={`group p-6 sm:p-8 bg-gradient-to-br ${role.color} rounded-2xl border border-gray-200 hover:border-gray-300 cursor-pointer transition-all`}
            >
              <div className="text-4xl sm:text-5xl mb-4 group-hover:scale-110 transition-transform">{role.icon}</div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{role.title}</h3>
              <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-4">{role.highlight}</p>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6">{role.description}</p>
              
              {/* Benefits bullets */}
              <ul className="space-y-2">
                {role.benefits.map((benefit, j) => (
                  <li key={j} className="text-xs sm:text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-lg leading-none">✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============= WHY SWAPSKILL (FEATURES) =============

function Features() {
  const features = [
    {
      icon: '⚡',
      title: 'Real Work, Not Academics',
      description: 'Students work on actual startup challenges, not dummy college projects. Every project builds a real portfolio piece.'
    },
    {
      icon: '⭐',
      title: 'Reputation Economy',
      description: 'No hourly rates. Verified credits and reviews prove your skills. Reputation compounds over time.'
    },
    {
      icon: '📈',
      title: 'Scale Without Hiring',
      description: 'Startups complete critical tasks 30% faster with affordable skilled help. No full-time commitment needed.'
    },
    {
      icon: '🎓',
      title: 'Mentorship at Scale',
      description: 'Experienced professionals guide students and startups. Knowledge shared = innovation multiplied.'
    },
    {
      icon: '🎯',
      title: 'Better Placements',
      description: 'Colleges track real industry work. Students graduate with verified experience and connections.'
    },
    {
      icon: '✓',
      title: 'Verified Community',
      description: 'All users verified through LinkedIn, college emails, or GST. Trust from day one.'
    }
  ]

  return (
    <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4">Why SwapSkill?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Built for real-world impact, not just transactions.</p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ x: 8 }}
              className="p-6 sm:p-8 border border-gray-200 rounded-2xl hover:border-gray-300 hover:shadow-lg transition-all group"
            >
              <div className="text-4xl sm:text-5xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============= TESTIMONIALS =============

function Testimonials() {
  const testimonials = [
    {
      name: 'Priya Kumar',
      role: 'IIT Delhi, Final Year',
      text: 'Got real project experience in 3 months. Built a portfolio. Now have 3 internship offers. SwapSkill changed everything.',
      avatar: '👩💼'
    },
    {
      name: 'Arjun Patel',
      role: 'Founder, Series A Startup',
      text: 'Found talented interns affordably. Shipped features 2x faster. Without SwapSkill, we couldn\'t have scaled this fast.',
      avatar: '👨💼'
    },
    {
      name: 'Rajesh Sharma',
      role: 'Ex-Google, 15yr Experience',
      text: 'Guide young talent. Stay connected to innovation. Finally found a way to give back meaningfully.',
      avatar: '👴'
    }
  ]

  return (
    <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4">Trusted by Thousands</h2>
          <p className="text-lg text-gray-600">Real stories from real users.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="p-6 sm:p-8 bg-white border border-gray-200 rounded-2xl hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl">{testimonial.avatar}</div>
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-xs sm:text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed italic">"{testimonial.text}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============= PRICING (FUTURE) =============

function Pricing() {
  const plans = [
    {
      name: 'Student',
      price: 'Free',
      description: 'Everything you need to start',
      features: ['Browse projects', 'Post swap offers', 'Build portfolio', 'Get reviews', 'Join community']
    },
    {
      name: 'Mentor',
      price: '₹499',
      period: '/month',
      description: 'For experienced professionals',
      features: ['Priority listing', 'Analytics dashboard', 'Direct messaging', 'Verification badge', 'Featured profile']
    },
    {
      name: 'Startup',
      price: '₹2,999',
      period: '/month',
      description: 'For early-stage companies',
      features: ['Post projects', 'Hire students', 'Team dashboard', 'Bulk credits', 'Priority support']
    }
  ]

  return (
    <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4">Simple, Fair Pricing</h2>
          <p className="text-lg text-gray-600">Free for students. Affordable for everyone else.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className={`p-6 sm:p-8 rounded-2xl border-2 transition-all ${
                i === 1 ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 bg-white'
              }`}
            >
              <h3 className={`text-xl sm:text-2xl font-bold mb-2 ${i === 1 ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
              <p className={`text-sm ${i === 1 ? 'text-gray-300' : 'text-gray-600'} mb-4`}>{plan.description}</p>
              <div className="mb-6">
                <span className={`text-4xl sm:text-5xl font-black ${i === 1 ? 'text-white' : 'text-gray-900'}`}>{plan.price}</span>
                {plan.period && <span className={`text-sm ${i === 1 ? 'text-gray-300' : 'text-gray-600'}`}>{plan.period}</span>}
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className={`text-sm flex items-start gap-2 ${i === 1 ? 'text-gray-200' : 'text-gray-600'}`}>
                    <span className="text-lg">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                i === 1 ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}>
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============= CTA SECTION =============

function CTASection() {
  return (
    <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-8 bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
      </div>

      <motion.div 
        className="max-w-4xl mx-auto text-center relative z-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6">Ready to Build Something Real?</h2>
        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          Join 1000s of students, startups, and mentors building the future of work and learning in India.
        </p>
        
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link 
            href="/signup"
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl"
          >
            Start Free Today
            <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              →
            </motion.span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}

// ============= MAIN PAGE =============

export default function LandingPage() {
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUser(data.user)
    })
  }, [])

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <h1 className="h1 mb-4">Welcome back!</h1>
          <Link href="/explore" className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800">
            Go to Explore
            <span>→</span>
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* 
          NOTE: We are using the global Navbar and Footer from layout.tsx.
          If you want to customize the landing page nav specifically, 
          you can add a local one here and hide the global one in layout.tsx using route matching.
      */}

      {/* Sections */}
      <HeroSection />
      <ScrollReveal />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Pricing />
      <CTASection />
    </div>
  )
}
