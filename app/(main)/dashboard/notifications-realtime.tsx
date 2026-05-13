'use client'
import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function NotificationsRealtime({ userId, onNewNotification }: { userId: string; onNewNotification: () => void }) {
  const supabase = createClient()

  useEffect(() => {
    if (!userId) return

    const channel = supabase.channel(`notifications:${userId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`
      }, () => {
        onNewNotification()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId, onNewNotification, supabase])

  return null
}
