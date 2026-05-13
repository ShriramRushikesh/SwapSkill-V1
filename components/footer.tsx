import Link from 'next/link'
import { Linkedin, Instagram, Twitter, Github } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const SECTIONS = [
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Vision', href: '/vision' },
        { label: 'Careers', href: '/careers' },
        { label: 'Blog', href: '/blog' },
        { label: 'Help Center', href: '/help' },
      ]
    },
    {
      title: 'Platform',
      links: [
        { label: 'Discover Swaps', href: '/explore' },
        { label: 'Success Stories', href: '/success-stories' },
        { label: 'Mentorship Hub', href: '/mentorship-hub' },
        { label: 'Community', href: '/community' },
      ]
    },
    {
      title: 'Account',
      links: [
        { label: 'Login', href: '/login' },
        { label: 'Register', href: '/signup' },
        { label: 'TPO Registration', href: '/tpo-registration' },
        { label: 'Startup Access', href: '/startup-access' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms', href: '/terms' },
        { label: 'Community Guidelines', href: '/guidelines' },
      ]
    }
  ]

  return (
    <footer className="bg-white pt-32 pb-12 border-t border-gray-100 relative overflow-hidden">
      {/* Decorative Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gray-50 rounded-[100%] blur-[120px] opacity-50 -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 lg:gap-8 mb-24">
          
          {/* Brand Section */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-8 group">
              <div className="w-10 h-10 bg-gray-900 rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform shadow-lg shadow-gray-900/10">
                <span className="text-white font-black text-xl italic">S</span>
              </div>
              <span className="text-2xl font-black text-gray-900 tracking-tighter">SwapSkill</span>
            </Link>
            <p className="text-gray-400 font-bold text-sm leading-relaxed mb-8 max-w-xs uppercase tracking-wider">
              Built for ambitious students, startups, and mentors.
            </p>
            <div className="flex items-center gap-4">
              <SocialLink icon={<Linkedin size={18} />} href="#" />
              <SocialLink icon={<Instagram size={18} />} href="#" />
              <SocialLink icon={<Twitter size={18} />} href="#" />
              <SocialLink icon={<Github size={18} />} href="#" />
            </div>
          </div>

          {/* Nav Sections */}
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-8">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href}
                      className="text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.1em]">
            © {currentYear} SwapSkill Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <Link href="/privacy" className="text-[11px] font-bold text-gray-400 hover:text-gray-900 uppercase tracking-[0.1em] transition-colors">Privacy</Link>
            <Link href="/terms" className="text-[11px] font-bold text-gray-400 hover:text-gray-900 uppercase tracking-[0.1em] transition-colors">Terms</Link>
            <Link href="/cookies" className="text-[11px] font-bold text-gray-400 hover:text-gray-900 uppercase tracking-[0.1em] transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

function SocialLink({ icon, href }: { icon: React.ReactNode, href: string }) {
  return (
    <a 
      href={href}
      className="w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-50 hover:border-gray-200 transition-all shadow-sm"
    >
      {icon}
    </a>
  )
}
