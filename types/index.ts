export type Role = 'student' | 'mentor' | 'startup' | 'tpo'
export type SwapStatus = 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled'
export type VerificationStatus = 'pending' | 'approved' | 'rejected'

export interface Profile {
  id: string
  email: string
  name: string | null
  avatar_url: string | null
  role: Role
  bio: string | null
  college: string | null
  company: string | null
  location: string | null
  linkedin_url: string | null
  is_verified: boolean
  verification_status: VerificationStatus
  reputation_score?: number
  credits?: number
  swap_count?: number
  created_at: string
}

export interface UserSkill {
  id: string
  user_id: string
  skill_name: string
  type: 'offer' | 'want'
  level: 'beginner' | 'intermediate' | 'expert'
}

export interface SwapPost {
  id: string
  user_id: string
  title: string
  description: string | null
  offering: string
  looking_for: string
  category: string | null
  mode: 'online' | 'offline' | 'both'
  duration_hrs: number
  is_open: boolean
  views: number
  created_at: string
  profiles?: Profile
}

export interface SwapRequest {
  id: string
  post_id: string
  requester_id: string
  post_owner_id: string
  message: string | null
  status: SwapStatus
  created_at: string
  profiles?: Profile
  swap_posts?: SwapPost
}

export interface Review {
  id: string
  swap_request_id: string
  reviewer_id: string
  reviewee_id: string
  rating: number
  comment: string | null
  created_at: string
  profiles?: Profile
}

export interface TpoPost {
  id: string
  tpo_id: string
  title: string
  description: string | null
  type: 'internship' | 'job' | 'project' | 'hackathon'
  skills_required: string[]
  deadline: string | null
  is_active: boolean
  created_at: string
  profiles?: Profile
}

export interface AppNotification {
  id: string
  user_id: string
  type: string
  title: string
  body: string | null
  link: string | null
  is_read: boolean
  created_at: string
}
