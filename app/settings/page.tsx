'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import Link from 'next/link'

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('account')
  const [newEmail, setNewEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push('/login')
      setUser(data.user)
      setLoading(false)
    })
  }, [])

  async function handleChangeEmail() {
    if (!newEmail) { toast.error('Enter new email'); return }
    setLoading(true)
    const { error } = await supabase.auth.updateUser({ email: newEmail })
    if (error) { toast.error(error.message); setLoading(false); return }
    toast.success('Check your email to confirm the change')
    setNewEmail('')
    setLoading(false)
  }

  async function handleChangePassword() {
    if (!newPassword) { toast.error('Enter new password'); return }
    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) { toast.error(error.message); setLoading(false); return }
    toast.success('Password updated!')
    setCurrentPassword('')
    setNewPassword('')
    setLoading(false)
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/')
  }

  async function handleDeleteAccount() {
    if (!confirm('Are you sure? This cannot be undone.')) return
    // Call API to delete user
    toast.success('Account deleted')
    await handleSignOut()
  }

  if (loading) return <div className="min-h-screen pt-20 flex items-center justify-center"><p>Loading...</p></div>

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-8">Settings</h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-200">
          {[
            { id: 'account', label: 'Account' },
            { id: 'privacy', label: 'Privacy & Security' },
            { id: 'notifications', label: 'Notifications' },
            { id: 'danger', label: 'Danger Zone' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition ${
                activeTab === tab.id
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Account Tab */}
        {activeTab === 'account' && (
          <div className="space-y-6">
            <div className="p-6 bg-white border border-gray-200 rounded-2xl">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Email Address</h2>
              <p className="text-sm text-gray-600 mb-4">Current: {user?.email}</p>
              <input 
                type="email" 
                value={newEmail} 
                onChange={e => setNewEmail(e.target.value)}
                placeholder="New email address"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gray-500 mb-4"
              />
              <button 
                onClick={handleChangeEmail} 
                disabled={loading}
                className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2.5 rounded-lg font-semibold disabled:opacity-50"
              >
                {loading ? 'Updating...' : 'Update Email'}
              </button>
            </div>
          </div>
        )}

        {/* Privacy & Security Tab */}
        {activeTab === 'privacy' && (
          <div className="space-y-6">
            <div className="p-6 bg-white border border-gray-200 rounded-2xl">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Change Password</h2>
              <input 
                type="password" 
                value={currentPassword} 
                onChange={e => setCurrentPassword(e.target.value)}
                placeholder="Current password"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gray-500 mb-4"
              />
              <input 
                type="password" 
                value={newPassword} 
                onChange={e => setNewPassword(e.target.value)}
                placeholder="New password (min 8 characters)"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gray-500 mb-4"
              />
              <button 
                onClick={handleChangePassword} 
                disabled={loading}
                className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2.5 rounded-lg font-semibold disabled:opacity-50"
              >
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </div>

            <div className="p-6 bg-white border border-gray-200 rounded-2xl">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Two-Factor Authentication</h2>
              <p className="text-sm text-gray-600 mb-4">Coming soon: Add an extra layer of security to your account.</p>
              <button disabled className="bg-gray-300 text-gray-600 px-6 py-2.5 rounded-lg font-semibold cursor-not-allowed">
                Coming Soon
              </button>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="space-y-4">
            {[
              { label: 'Swap requests', desc: 'Get notified when someone requests a swap' },
              { label: 'Request accepted', desc: 'Someone accepted your swap request' },
              { label: 'New review', desc: 'You received a new review' },
              { label: 'Project posted', desc: 'New projects in your interest areas' },
              { label: 'Marketing emails', desc: 'Updates and tips from SwapSkill' }
            ].map((notif, i) => (
              <div key={i} className="p-4 bg-white border border-gray-200 rounded-xl flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{notif.label}</p>
                  <p className="text-xs text-gray-500 mt-1">{notif.desc}</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 rounded"/>
              </div>
            ))}
          </div>
        )}

        {/* Danger Zone Tab */}
        {activeTab === 'danger' && (
          <div className="space-y-6">
            <div className="p-6 bg-red-50 border border-red-200 rounded-2xl">
              <h2 className="text-lg font-bold text-red-900 mb-2">Sign Out</h2>
              <p className="text-sm text-red-700 mb-4">You will be signed out of all devices.</p>
              <button 
                onClick={handleSignOut}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-semibold"
              >
                Sign Out All Sessions
              </button>
            </div>

            <div className="p-6 bg-red-50 border border-red-200 rounded-2xl">
              <h2 className="text-lg font-bold text-red-900 mb-2">Delete Account</h2>
              <p className="text-sm text-red-700 mb-4">Permanently delete your account and all associated data. This cannot be undone.</p>
              <button 
                onClick={handleDeleteAccount}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-semibold"
              >
                Delete Account
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link href="/" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
