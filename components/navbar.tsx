'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/lib/contexts/auth-context'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, Menu, X, ChevronDown, User, LayoutDashboard, Bookmark, Settings, LogOut, MessageSquare } from 'lucide-react'

export default function Navbar() {
  const { profile, loading, signOut } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdowns on route change
  useEffect(() => {
    setMobileMenuOpen(false)
    setProfileDropdownOpen(false)
  }, [pathname])

  const GUEST_LINKS = [
    { label: 'Discover Swaps', href: '/explore' },
    { label: 'Join Startups', href: '/startups' },
    { label: 'Find Mentors', href: '/mentors' },
    { label: 'Success Stories', href: '/stories' },
  ]

  const AUTH_LINKS = [
    { label: 'Discover Swaps', href: '/explore' },
    { label: 'Startup Missions', href: '/missions' },
    { label: 'Mentorship Hub', href: '/mentors' },
    { label: 'Dashboard', href: '/dashboard' },
  ]

  const navLinks = profile ? AUTH_LINKS : GUEST_LINKS

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'py-3 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm' : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gray-900 rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform duration-300 shadow-lg shadow-gray-900/20">
            <span className="text-white font-black text-xl italic">S</span>
          </div>
          <span className="text-2xl font-black text-gray-900 tracking-tighter">SwapSkill</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link 
              key={link.label}
              href={link.href} 
              className={`px-4 py-2 text-sm font-bold transition-all rounded-xl ${
                pathname === link.href 
                  ? 'text-gray-900 bg-gray-100' 
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          {loading ? (
            <div className="w-10 h-10 bg-gray-100 rounded-full animate-pulse" />
          ) : profile ? (
            <div className="flex items-center gap-3">
              <Link href="/messages" className="p-2.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all relative">
                <MessageSquare size={20} />
              </Link>
              <button className="p-2.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </button>
              
              <div className="relative">
                <button 
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-1 py-1 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-2xl transition-all group"
                >
                  <div className="w-8 h-8 rounded-xl bg-gray-200 overflow-hidden shadow-inner">
                    {profile.avatar_url ? (
                      <Image src={profile.avatar_url} alt="" width={32} height={32} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <User size={16} />
                      </div>
                    )}
                  </div>
                  <ChevronDown size={14} className={`text-gray-400 transition-transform duration-300 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {profileDropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-64 bg-white border border-gray-200 rounded-[2rem] shadow-2xl shadow-gray-200/50 p-2 z-50"
                    >
                      <div className="px-4 py-3 border-b border-gray-50 mb-1">
                        <p className="text-sm font-black text-gray-900 truncate">{profile.name}</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{profile.role}</p>
                      </div>
                      
                      <div className="space-y-1">
                        <DropdownItem icon={<User size={16} />} label="My Profile" href={`/profile/${profile.id}`} />
                        <DropdownItem icon={<LayoutDashboard size={16} />} label="Dashboard" href="/dashboard" />
                        <DropdownItem icon={<Bookmark size={16} />} label="Saved Opportunities" href="/saved" />
                        <DropdownItem icon={<Settings size={16} />} label="Settings" href="/settings" />
                      </div>

                      <div className="mt-1 pt-1 border-t border-gray-50">
                        <button 
                          onClick={() => signOut()}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-500 hover:bg-red-50 transition-all font-bold text-sm"
                        >
                          <LogOut size={16} />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login" className="px-6 py-2.5 text-sm font-bold text-gray-600 hover:text-gray-900 transition-all">
                Login
              </Link>
              <Link href="/signup" className="px-6 py-2.5 text-sm font-black text-white bg-gray-900 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-gray-900/20">
                Join Community
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-gray-900"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-6 py-8 space-y-6">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link 
                    key={link.label}
                    href={link.href} 
                    className="text-2xl font-black text-gray-900 tracking-tighter"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="pt-8 border-t border-gray-100 flex flex-col gap-4">
                {profile ? (
                  <>
                    <Link href="/dashboard" className="px-6 py-4 text-center font-black text-white bg-gray-900 rounded-2xl">
                      Dashboard
                    </Link>
                    <button onClick={() => signOut()} className="px-6 py-4 text-center font-black text-red-500 bg-red-50 rounded-2xl">
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/signup" className="px-6 py-4 text-center font-black text-white bg-gray-900 rounded-2xl">
                      Join Community
                    </Link>
                    <Link href="/login" className="px-6 py-4 text-center font-black text-gray-900 bg-gray-100 rounded-2xl">
                      Login
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

function DropdownItem({ icon, label, href }: { icon: React.ReactNode, label: string, href: string }) {
  return (
    <Link 
      href={href}
      className="flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all group"
    >
      <span className="text-gray-400 group-hover:text-gray-900 transition-colors">{icon}</span>
      <span className="text-sm font-bold">{label}</span>
    </Link>
  )
}
