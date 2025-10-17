# 🔒 Profile Routes Explained

## Two Separate Routes

### 1️⃣ `/me/profile/[uid]` - Your Own Profile Only
**Purpose:** For logged-in users to view and edit their OWN profile

**Access:** 
- Must be logged in (have `uid` cookie)
- Can only view YOUR OWN profile
- Shows "Edit Profile" button
- If you try to view someone else, redirects to `/member/`

**Example:**
```
Cookie: uid=sangameshwar.sale
URL: /me/profile/sangameshwar.sale
Result: ✅ Your profile with Edit button
```

```
Cookie: uid=sangameshwar.sale
URL: /me/profile/akshay.chanda
Result: 🔀 Redirects to /member/akshay.chanda
```

### 2️⃣ `/member/[username]` - Public Member Profiles
**Purpose:** For viewing ANY member's profile (public view)

**Access:**
- No login required
- View-only (no Edit button)
- Can view anyone's profile
- Used by Members page links

**Example:**
```
URL: /member/akshay.chanda
Result: ✅ Akshay's profile (view-only)
```

```
URL: /member/sangameshwar.sale
Result: ✅ Your profile (view-only, no Edit button)
```

## URL Structure

### ✅ Correct Usage:

**View Your Own Profile (with Edit):**
```bash
# Set cookie first
document.cookie = "uid=sangameshwar.sale; path=/; domain=localhost";

# Then visit
http://localhost:3000/me/profile/sangameshwar.sale
```

**View Others' Profiles (read-only):**
```bash
http://localhost:3000/member/akshay.chanda
http://localhost:3000/member/rithik.palla
http://localhost:3000/member/jane.smith
```

### ❌ What Happens When:

**Try to view another's profile under `/me/profile/`:**
```bash
Cookie: uid=sangameshwar.sale
Visit: /me/profile/akshay.chanda

Result: Shows redirect page for 2 seconds, then:
→ Redirects to: /member/akshay.chanda
```

**View your own profile under `/member/`:**
```bash
Visit: /member/sangameshwar.sale

Result: ✅ Shows profile but NO Edit button (public view)
```

## Quick Reference

| Scenario | Route | Edit Button | Login Required |
|----------|-------|-------------|----------------|
| Your own profile | `/me/profile/sangameshwar.sale` | ✅ Yes | ✅ Yes |
| Another's profile | `/member/akshay.chanda` | ❌ No | ❌ No |
| Wrong route | `/me/profile/akshay.chanda` | 🔀 Redirects | ✅ Yes |
| Public view of self | `/member/sangameshwar.sale` | ❌ No | ❌ No |

## Navigation Flow

```
Members Page
    ↓
Click on Member Card
    ↓
    → /member/[username] (public view)

Navbar Profile Icon (when logged in)
    ↓
    → /me/profile/[your-uid] (your profile with edit)
```

## Testing

### Test as Logged-in User:
```javascript
// Set cookie
document.cookie = "uid=sangameshwar.sale; path=/; domain=localhost";
location.reload();
```

**Then try:**
1. http://localhost:3000/me/profile/sangameshwar.sale → ✅ Your profile with Edit
2. http://localhost:3000/me/profile/akshay.chanda → 🔀 Redirects to /member/akshay.chanda
3. http://localhost:3000/member/akshay.chanda → ✅ Akshay's profile (view-only)

### Test as Guest (not logged in):
```javascript
// Clear cookie
document.cookie = "uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
location.reload();
```

**Then try:**
1. http://localhost:3000/member/sangameshwar.sale → ✅ View-only
2. http://localhost:3000/member/akshay.chanda → ✅ View-only
3. http://localhost:3000/me/profile/sangameshwar.sale → ❌ Shows "Profile Not Found" (no cookie)

## Benefits

✅ **Security:** Users can only edit their own profile  
✅ **Clean URLs:** Different routes for different purposes  
✅ **User-friendly:** Clear separation between "my profile" and "view member"  
✅ **SEO:** Public member profiles are crawlable at `/member/`  
✅ **Privacy:** Edit functionality only on authenticated route  

## Implementation

- `/me/profile/[uid]` checks if `cookie.uid === params.uid`
- If match: Shows profile with Edit button
- If no match: Redirects to `/member/[uid]`
- `/member/[username]` always shows view-only, never checks cookies
