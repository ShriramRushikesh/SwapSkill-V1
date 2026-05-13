'use client'
import { useState } from 'react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'

export default function AvatarUpload({ userId, onUploadComplete }: { userId: string; onUploadComplete: (url: string) => void }) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const supabase = createClient()

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) { toast.error('File too large. Max 5MB.'); return }

    setUploading(true)
    const reader = new FileReader()
    reader.onload = () => setPreview(reader.result as string)
    reader.readAsDataURL(file)

    const filename = `${userId}-${Date.now()}-${file.name.replace(/\s+/g, '-')}`
    const { error: uploadError } = await supabase.storage.from('avatars').upload(filename, file)
    
    if (uploadError) { toast.error(uploadError.message); setUploading(false); return }

    const { data } = supabase.storage.from('avatars').getPublicUrl(filename)
    const url = data.publicUrl

    const { error: updateError } = await supabase.from('profiles').update({ avatar_url: url }).eq('id', userId)
    if (updateError) { toast.error(updateError.message); setUploading(false); return }

    onUploadComplete(url)
    setUploading(false)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-24 h-24 rounded-2xl bg-gray-100 border-2 border-dashed border-gray-300 overflow-hidden flex items-center justify-center">
        {preview ? (
          <Image src={preview} alt="preview" width={96} height={96} unoptimized className="w-full h-full object-cover"/>
        ) : (
          <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400" viewBox="0 0 24 24">
            <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
        )}
      </div>
      <label className="cursor-pointer">
        <input type="file" accept="image/*" onChange={handleUpload} disabled={uploading} className="hidden"/>
        <span className="text-sm font-medium text-teal-600 hover:text-teal-700 block text-center">
          {uploading ? 'Uploading...' : 'Upload photo'}
        </span>
      </label>
      <p className="text-xs text-gray-400 text-center">JPG, PNG. Max 5MB.</p>
    </div>
  )
}
