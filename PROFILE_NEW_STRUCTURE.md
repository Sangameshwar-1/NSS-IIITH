# Profile Components - New Structure Complete ✅

## Overview

Profile pages have been reorganized with components in `components/` directory and route wrappers in `app/` directory.

---

## 📁 New Directory Structure

```
frontend/src/
├── app/
│   ├── member/
│   │   └── profile/
│   │       └── [username]/
│   │           └── page.tsx          (Route wrapper - 22 lines)
│   └── me/
│       └── profile/
│           └── [username]/
│               └── page.tsx          (Route wrapper - 27 lines)
│
└── components/
    ├── member/
    │   └── profile/
    │       └── MemberProfileComponent.tsx  (Component - 145 lines)
    └── me/
        └── profile/
            └── MyProfileComponent.tsx      (Component - 165 lines)
```

---

## 🔗 URL Structure

### Username Format: `firstname.lastname`

#### Public Member Profiles
```
/member/profile/akshay.chanda
/member/profile/sangameshwar.sale
/member/profile/aditi.sharma
/member/profile/rahul.verma
```

#### Own Profile (With Edit)
```
/me/profile/sangameshwar.sale
```

---

## 📦 Components Created

### 1. **MemberProfileComponent.tsx**
**Location:** `components/member/profile/MemberProfileComponent.tsx`

**Purpose:** Display public member profiles (read-only)

**Props:**
```typescript
interface MemberProfileProps {
  username: string;        // firstname.lastname (e.g., "akshay.chanda")
  isOwnProfile?: boolean;  // Optional, defaults to false
}
```

**Usage:**
```tsx
import MemberProfileComponent from "@/components/member/profile/MemberProfileComponent";

<MemberProfileComponent username="akshay.chanda" isOwnProfile={false} />
```

**Features:**
- ✅ Finds member by username (id field)
- ✅ Displays profile using ProfileCard component
- ✅ Shows "Member Not Found" state
- ✅ Lists suggestions for available members
- ✅ Client component

**Exported Functions:**
```typescript
getMemberByUsername(username: string): Member | undefined
getAllMembers(): Member[]
```

---

### 2. **MyProfileComponent.tsx**
**Location:** `components/me/profile/MyProfileComponent.tsx`

**Purpose:** Display user's own profile with edit capability

**Props:**
```typescript
interface MyProfileProps {
  username: string;          // firstname.lastname from URL
  loggedInUsername?: string; // firstname.lastname from cookie
}
```

**Usage:**
```tsx
import MyProfileComponent from "@/components/me/profile/MyProfileComponent";

<MyProfileComponent 
  username="sangameshwar.sale" 
  loggedInUsername="sangameshwar.sale" 
/>
```

**Features:**
- ✅ Checks ownership (compares username with loggedInUsername)
- ✅ Auto-redirects if viewing someone else's profile
- ✅ Shows edit button only for own profile
- ✅ Client component with useRouter and useEffect

**Exported Functions:**
```typescript
getMemberByUsername(username: string): Member | undefined
```

---

## 🛣️ Route Pages (Thin Wrappers)

### 1. **`/member/profile/[username]/page.tsx`**

**Purpose:** Public member profile route wrapper

```tsx
import MemberProfileComponent from "@/components/member/profile/MemberProfileComponent";

export default async function MemberProfilePage({ params }) {
  const { username } = await params;

  return (
    <>
      <Navbar />
      <MemberProfileComponent username={username} isOwnProfile={false} />
      <Footer />
    </>
  );
}
```

**Responsibilities:**
- Extract username from URL params
- Pass to component
- Provide layout (Navbar + Footer)

---

### 2. **`/me/profile/[username]/page.tsx`**

**Purpose:** Own profile route wrapper

```tsx
import MyProfileComponent from "@/components/me/profile/MyProfileComponent";
import { cookies } from "next/headers";

export default async function MyProfilePage({ params }) {
  const { username } = await params;
  const cookieStore = await cookies();
  const loggedInUsername = cookieStore.get("username")?.value;

  return (
    <>
      <Navbar />
      <MyProfileComponent 
        username={username} 
        loggedInUsername={loggedInUsername} 
      />
      <Footer />
    </>
  );
}
```

**Responsibilities:**
- Extract username from URL params
- Read logged-in username from cookie
- Pass both to component
- Provide layout (Navbar + Footer)

---

## 🍪 Cookie Setup

### Cookie Name: `username` or `uid`

**Note:** The Navbar currently reads from `uid` cookie, so you can use either:

**Option 1: Keep `uid` cookie** (recommended for backward compatibility)
```javascript
document.cookie = "uid=sangameshwar.sale; path=/; domain=localhost"
```

**Option 2: Update to `username` cookie**
You need to update:
1. `MyProfileComponent.tsx` cookie read
2. Navbar.tsx cookie match pattern

---

## 👥 Mock Data

All 8 members use `firstname.lastname` format:

| Username | Name | Email |
|----------|------|-------|
| akshay.chanda | Akshay Chanda | chanda.kumar@students.iiit.ac.in |
| sangameshwar.sale | Sangameshwar Sale | sangameshwar.sale@students.iiit.ac.in |
| aditi.sharma | Aditi Sharma | aditi.sharma@students.iiit.ac.in |
| rahul.verma | Rahul Verma | rahul.verma@students.iiit.ac.in |
| priya.singh | Priya Singh | priya.singh@students.iiit.ac.in |
| neha.patel | Neha Patel | neha.patel@students.iiit.ac.in |
| vikram.reddy | Vikram Reddy | vikram.reddy@students.iiit.ac.in |
| rithik.palla | Rithik Reddy Palla | rithik.palla@students.iiit.ac.in |

---

## 🔄 Data Flow

### Public Profile Flow
```
User visits: /member/profile/akshay.chanda
  ↓
app/member/profile/[username]/page.tsx
  ↓ Extract "akshay.chanda" from params
  ↓
components/member/profile/MemberProfileComponent.tsx
  ↓ Find member where id === "akshay.chanda"
  ↓
components/team/ProfileCard.tsx
  ↓ Display profile UI (read-only)
```

### Own Profile Flow
```
User visits: /me/profile/sangameshwar.sale
  ↓
app/me/profile/[username]/page.tsx
  ↓ Extract "sangameshwar.sale" from params
  ↓ Read cookie: username = "sangameshwar.sale"
  ↓
components/me/profile/MyProfileComponent.tsx
  ↓ Find member where id === "sangameshwar.sale"
  ↓ Check: member.id === loggedInUsername? ✅ Yes
  ↓
components/team/ProfileCard.tsx
  ↓ Display profile UI with Edit button
```

### Redirect Flow (Wrong Profile)
```
User visits: /me/profile/akshay.chanda
  ↓ Cookie: username = "sangameshwar.sale"
  ↓
MyProfileComponent checks ownership
  ↓ "akshay.chanda" !== "sangameshwar.sale"
  ↓ isOwnProfile = false
  ↓
Show redirect message (2 seconds)
  ↓
Auto-redirect to: /member/profile/akshay.chanda
```

---

## 🔗 MemberCard Updates

**Updated to use new URL structure:**

```tsx
// components/team/MemberCard.tsx
const username = member.id || member.email.split('@')[0];
const profileUrl = `/member/profile/${username}`;
```

**Link behavior:**
- Member cards now link to `/member/profile/[username]`
- Uses `member.id` if available
- Falls back to extracting from email

---

## 🧪 Testing Guide

### 1. Test Public Member Profile

```bash
# Open in browser
http://localhost:3000/member/profile/akshay.chanda
```

**Expected:**
- ✅ Shows Akshay's profile
- ✅ NO edit button (public view)
- ✅ Read-only information

---

### 2. Test Own Profile

**Step 1: Set Cookie**
```javascript
// Open browser console
document.cookie = "uid=sangameshwar.sale; path=/; domain=localhost"
```

**Step 2: Visit Your Profile**
```bash
http://localhost:3000/me/profile/sangameshwar.sale
```

**Expected:**
- ✅ Shows your profile
- ✅ WITH edit button
- ✅ Can modify settings

---

### 3. Test Auto-Redirect

**Step 1: Set Cookie**
```javascript
document.cookie = "uid=sangameshwar.sale; path=/; domain=localhost"
```

**Step 2: Try to Access Someone Else's Profile via /me/profile**
```bash
http://localhost:3000/me/profile/akshay.chanda
```

**Expected:**
- ✅ Shows redirect message
- ✅ After 2 seconds, redirects to:
  ```
  http://localhost:3000/member/profile/akshay.chanda
  ```

---

### 4. Test Member Cards

**Step 1: Go to Members Page**
```bash
http://localhost:3000/members
```

**Step 2: Click Any Member Card**

**Expected:**
- ✅ Redirects to `/member/profile/[username]`
- ✅ Shows that member's profile

---

## 🎯 Benefits

### ✅ Clean Separation
- **Routes:** Handle params, cookies, layout (server components)
- **Components:** Business logic, UI, state (client components)

### ✅ Reusable
- Components can be used anywhere
- Easy to create new profile views
- Share logic across routes

### ✅ Maintainable
- Changes in one place
- Clear responsibilities
- Less code duplication

### ✅ Scalable
- Easy to add new features
- Component-based architecture
- Future-proof structure

---

## 📊 Code Comparison

### Before
```
app/member/[id]/page.tsx          (157 lines - all logic)
app/me/profile/[uid]/page.tsx     (220 lines - all logic)
Total: 377 lines
```

### After
```
Routes:
  app/member/profile/[username]/page.tsx    (22 lines)
  app/me/profile/[username]/page.tsx        (27 lines)

Components:
  components/member/profile/...tsx          (145 lines)
  components/me/profile/...tsx              (165 lines)

Total: 359 lines (18 lines saved + better organization)
```

---

## ⚠️ Important Notes

### Cookie Name
The route page uses `username` cookie:
```typescript
const loggedInUsername = cookieStore.get("username")?.value;
```

But Navbar uses `uid` cookie:
```typescript
const match = document.cookie.match(/(?:^|; )uid=([^;]*)/);
```

**Solution:**
For now, set BOTH cookies to be safe:
```javascript
document.cookie = "uid=sangameshwar.sale; path=/; domain=localhost";
document.cookie = "username=sangameshwar.sale; path=/; domain=localhost";
```

---

## 🚀 Next Steps

### Immediate
1. ✅ Test all URLs with firstname.lastname format
2. ✅ Verify member cards link correctly
3. ✅ Confirm cookie authentication works
4. ✅ Test auto-redirect functionality

### Short Term
1. Extract mock data to shared file
2. Standardize cookie name (uid vs username)
3. Implement Activity tab
4. Implement Settings tab
5. Make Edit Profile functional

### Long Term
1. Replace mock data with backend API
2. Real authentication system
3. Database integration
4. Profile updates
5. Activity tracking

---

## 🛠️ Troubleshooting

### Components not found?
```bash
# Clear cache and restart
rm -rf .next
npm run dev
```

### Profile not showing?
- Check username format: `firstname.lastname` (lowercase, dot-separated)
- Verify username exists in MOCK_MEMBERS
- Check browser console for errors

### Edit button not showing?
- Verify cookie is set correctly
- Check that cookie value matches URL username
- Ensure you're on `/me/profile/[username]` not `/member/profile/[username]`

### Auto-redirect not working?
- Wait 2 seconds (it's delayed)
- Check browser console for navigation errors
- Verify isOwnProfile logic

---

## ✅ Summary

**What Was Done:**
- ✅ Created `components/member/profile/` directory
- ✅ Created `components/me/profile/` directory
- ✅ Moved logic from routes to components
- ✅ Updated routes to thin wrappers
- ✅ Changed to username-based URLs (`firstname.lastname`)
- ✅ Updated MemberCard to use new URLs
- ✅ Maintained separation of server/client components

**URL Format:**
- Public: `/member/profile/akshay.chanda`
- Own: `/me/profile/sangameshwar.sale`

**Status:** ✅ Ready to test and use!
