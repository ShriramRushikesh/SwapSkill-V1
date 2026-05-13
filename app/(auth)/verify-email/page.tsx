'use client'

import { motion } from 'framer-motion'
import { Mail, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20 pb-12 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-gray-50 rounded-full blur-[120px] opacity-60" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-brand-border rounded-full blur-[120px] opacity-60" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg relative z-10 text-center"
      >
        <div className="bg-white border border-gray-100 shadow-2xl shadow-gray-200/50 rounded-[3rem] p-12 md:p-16">
          <div className="w-20 h-20 bg-gray-900 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-gray-900/20">
            <Mail size={32} className="text-white" />
          </div>
          
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter mb-4">Check your inbox</h1>
          <p className="text-gray-500 font-medium mb-10 leading-relaxed">
            We've sent a verification link to your email. Please click it to activate your account and start your journey.
          </p>

          <div className="space-y-4">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Didn't receive it?</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/login"
                className="flex-1 py-5 bg-gray-50 rounded-2xl font-black text-xs text-gray-900 uppercase tracking-widest hover:bg-gray-100 transition-all"
              >
                Back to Login
              </Link>
              <button 
                onClick={() => window.location.reload()}
                className="flex-1 py-5 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-gray-900/20"
              >
                Resend Link
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
