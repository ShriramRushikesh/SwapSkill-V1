# SwapSkill Testing Checklist

## Before Launch (Smoke Test)

### 1. Authentication Flow
- [ ] Sign up with email works (receives verification email)
- [ ] Verify email link works
- [ ] Login with email/password works
- [ ] Google OAuth signup works
- [ ] Google OAuth login works
- [ ] Forgot password flow works (reset link in email)
- [ ] Session persists across page refresh
- [ ] Logout clears session

### 2. Onboarding Flow
- [ ] All 3 onboarding steps complete and save data
- [ ] Avatar upload works to Supabase Storage
- [ ] Skills can be added/removed
- [ ] Profile data saves correctly to DB
- [ ] Redirect to /explore after onboarding
- [ ] Can skip onboarding steps
- [ ] College/Company fields appear for correct roles

### 3. Explore Page
- [ ] Search works (filters posts by title/offering/looking_for)
- [ ] Category filters work
- [ ] Posts load from database
- [ ] Request Swap button visible
- [ ] Not logged in users see "Sign in to request" instead of button
- [ ] Post cards display all info correctly
- [ ] Pagination works (load more button)
- [ ] Empty state shows correctly

### 4. Create Post
- [ ] Can fill all form fields
- [ ] Submit creates record in swap_posts table
- [ ] Redirect to /explore after posting
- [ ] Posted swap appears on explore page immediately
- [ ] Can edit own post (delete functionality)
- [ ] Form validation works (required fields marked)

### 5. Request & Dashboard
- [ ] Request Swap modal opens and sends request
- [ ] Modal contains post info
- [ ] Database creates swap_requests record
- [ ] Request appears in recipient's dashboard
- [ ] Can accept/reject request
- [ ] Accepted request shows contact email
- [ ] Can mark swap complete
- [ ] Review form appears after completion
- [ ] Reviews save to database

### 6. Profile Pages
- [ ] Public profile displays all user info
- [ ] Skills show as tagged badges
- [ ] Reviews display with stars
- [ ] Avatar loads correctly
- [ ] Open posts section shows active swaps
- [ ] Profile edit page loads pre-filled data
- [ ] Can update all fields
- [ ] Changes save to database immediately

### 7. TPO Board
- [ ] TPO users can see + Post button
- [ ] Post form accepts all fields
- [ ] Posts appear on TPO board
- [ ] Non-TPO users can browse but can't post
- [ ] Opportunities show deadline
- [ ] Can click to view TPO creator's profile

### 8. Admin Dashboard
- [ ] Only admin user can access /admin
- [ ] Stats display correct counts (users, posts, swaps)
- [ ] Users tab shows all users with filters
- [ ] Can verify/reject pending users
- [ ] Posts can be deleted for spam
- [ ] Requests tab shows all swap requests

### 9. Mobile Responsiveness
- [ ] All pages render on 375px (iPhone SE width)
- [ ] Navigation works on mobile (hamburger menu)
- [ ] Forms are easy to fill on mobile
- [ ] Buttons are tappable (min 44x44px)
- [ ] Text is readable (no overflow)
- [ ] Images scale properly
- [ ] Modals work on mobile

### 10. Email Flows
- [ ] Verification email arrives within 2 minutes
- [ ] Verification link works and confirms email
- [ ] Welcome email arrives after signup
- [ ] Swap request notification email sent
- [ ] Review reminder emails work
- [ ] Emails render correctly on mobile (Outlook, Gmail, Apple)

### 11. Security
- [ ] RLS policies prevent unauthorized access (try accessing other user's profile edit via URL)
- [ ] Cannot delete other users' posts via API
- [ ] Cannot modify other users' reviews
- [ ] Password reset token expires
- [ ] Admin IDs correctly restrict /admin access
- [ ] Passwords not stored in plaintext (check Supabase)

### 12. Error Handling
- [ ] 404 page shows for non-existent routes
- [ ] 500 error page shows for server errors
- [ ] Form validation errors display clearly
- [ ] Network errors show toast notification
- [ ] Retrying failed requests works

### 13. Legal Compliance
- [ ] Privacy policy accessible from footer
- [ ] Terms of Service accessible from footer
- [ ] Contact form works
- [ ] Contact emails receive submissions
- [ ] Footer links to all legal pages

### 14. Analytics & Monitoring
- [ ] Google Analytics tracking fires on pages
- [ ] Vercel Analytics shows page views
- [ ] No console errors (check DevTools)
- [ ] No network request errors (check Network tab)
- [ ] Performance: Lighthouse score 85+

### 15. Desktop/Laptop Testing
- [ ] All pages render correctly at 1920px
- [ ] Hover states work on buttons/cards
- [ ] Responsive grid layouts work (1col → 3col progression)
- [ ] Animations perform smoothly (60fps)

## Test Devices
- [ ] iPhone 13/14 (Mobile Safari)
- [ ] Android phone (Chrome)
- [ ] iPad (Mobile Safari)
- [ ] MacBook/Laptop (Chrome, Safari, Firefox)
- [ ] Windows laptop (Chrome, Edge)

## Test Browsers
- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari
- [ ] Mobile Chrome

## Performance Targets
- [ ] Lighthouse Performance: 90+
- [ ] Lighthouse Accessibility: 95+
- [ ] Lighthouse Best Practices: 95+
- [ ] Core Web Vitals: All green
- [ ] Page load time: <3 seconds
- [ ] API response time: <500ms

## Go-Live Checklist
- [ ] All tests passing
- [ ] No console errors
- [ ] No sensitive data in logs
- [ ] Env variables set in Vercel
- [ ] Google OAuth configured
- [ ] Supabase RLS policies verified
- [ ] Email templates tested
- [ ] Admin IDs set
- [ ] Domain DNS configured
- [ ] SSL certificate valid
- [ ] Backup strategy in place
