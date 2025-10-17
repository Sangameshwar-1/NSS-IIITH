# How to View Member Profiles

## Quick Reference

### 1. **Direct URL Access**

#### View Any Member's Profile (Public View)
```
http://localhost:3000/member/[username]
```

**Available usernames** (from mock data):
- `akshay.chanda`
- `sangameshwar.sale`
- `aditi.sharma`
- `rahul.verma`
- `priya.singh`
- `neha.patel`
- `vikram.reddy`
- `ananya.krishnan`

**Examples:**
```
http://localhost:3000/member/akshay.chanda
http://localhost:3000/member/aditi.sharma
http://localhost:3000/member/rahul.verma
```

#### View Your Own Profile (With Edit Button)
```
http://localhost:3000/me/profile/[your-username]
```

**Example:**
```
http://localhost:3000/me/profile/sangameshwar.sale
```

**Note:** You need to set a cookie to see the Edit button:
```javascript
// Run in browser console:
document.cookie = "uid=sangameshwar.sale; path=/; domain=localhost"
```

---

### 2. **Through Member Cards (Clickable)**

The member cards on the `/members` page are now clickable!

**How it works:**
1. Go to `http://localhost:3000/members`
2. Click on any member card
3. You'll be redirected to their profile at `/member/[username]`

The username is extracted from the member's email:
- Email: `akshay.chanda@students.iiit.ac.in`
- Username: `akshay.chanda`
- Profile URL: `/member/akshay.chanda`

---

### 3. **Navigation Bar Profile Icon**

If you're logged in (cookie set), clicking the profile icon in the navbar will take you to:
```
/me/profile/[your-uid]
```

---

## Route Differences

| Route | Purpose | Edit Button | Who Can Access |
|-------|---------|-------------|----------------|
| `/me/profile/[uid]` | Your own profile | ✅ Yes | Only you (requires cookie match) |
| `/member/[username]` | Public member view | ❌ No | Anyone |

---

## Auto-Redirect Behavior

**Security Feature:**
If you try to access someone else's profile via `/me/profile/[other-username]`, you'll be automatically redirected to `/member/[other-username]`.

**Example:**
```
Visit: /me/profile/akshay.chanda (but your cookie says sangameshwar.sale)
Redirected to: /member/akshay.chanda
```

---

## Testing Steps

### Test Public View
1. Open `http://localhost:3000/member/akshay.chanda`
2. You should see Akshay's profile **without** an Edit button

### Test Own Profile View
1. Set cookie in browser console:
   ```javascript
   document.cookie = "uid=sangameshwar.sale; path=/; domain=localhost"
   ```
2. Open `http://localhost:3000/me/profile/sangameshwar.sale`
3. You should see your profile **with** an Edit button

### Test Member Cards
1. Go to `http://localhost:3000/members`
2. Click on any member card
3. You should be redirected to their profile page

### Test Auto-Redirect
1. Set cookie: `document.cookie = "uid=sangameshwar.sale; path=/; domain=localhost"`
2. Visit `http://localhost:3000/me/profile/akshay.chanda`
3. You should be redirected to `/member/akshay.chanda`

---

## Troubleshooting

### Member Card Not Clickable?
- Clear cache and restart server:
  ```bash
  rm -rf .next
  npm run dev
  ```
- Hard refresh browser: `Ctrl + Shift + R`

### Profile Not Found?
- Check that the username exists in MOCK_MEMBERS array
- Verify the format is `firstname.lastname` (lowercase, dot-separated)
- Check browser console for errors

### Edit Button Not Showing?
- Verify cookie is set: `document.cookie` in browser console
- Check that cookie value matches the profile uid
- Make sure you're on `/me/profile/[uid]` not `/member/[username]`

---

## Implementation Details

### MemberCard Component (Updated)
- Added `Link` from `next/link`
- Extracts username from email: `member.email.split('@')[0]`
- Wraps entire card in `<Link href={profileUrl}>`
- Profile URL: `/member/${username}`

### Profile Routes
1. **`/me/profile/[uid]/page.tsx`**
   - Checks cookie for ownership
   - Shows Edit button if `isOwnProfile=true`
   - Redirects to `/member/[uid]` if not own profile

2. **`/member/[username]/page.tsx`**
   - Always shows read-only view
   - No cookie checking
   - `isOwnProfile=false` always

---

## Next Steps

When backend is ready:
1. Replace MOCK_MEMBERS with real data from `getMembersFromDB()`
2. Update cookie authentication to use real auth system
3. Implement Activity and Settings tabs
4. Make Edit Profile button functional
