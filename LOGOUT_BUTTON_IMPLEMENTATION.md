# Logout Button Implementation

## Overview
Added a logout button to the Navbar that appears when a user is logged in (when `uid` cookie exists).

## Changes Made

### File: `frontend/src/utils/Navbar.tsx`

1. **Added logout handler function**:
   ```typescript
   const handleLogout = () => {
       // Clear the uid cookie
       document.cookie = "uid=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
       // Redirect to home page
       window.location.href = "/";
   };
   ```

2. **Updated the authenticated user UI**:
   - Wrapped the profile button and logout button in a flex container
   - Added a red "Logout" button next to the profile icon
   - Button uses `ACTIVE_BG` (#E90000 - Airtel Red) for consistency

## UI Behavior

### When User is NOT Logged In:
- Shows "Login" button
- Clicking redirects to: `http://localhost:8000/login`

### When User IS Logged In:
- Shows profile icon button (navigates to user's profile)
- Shows red "Logout" button
- Clicking "Logout":
  1. Clears the `uid` cookie
  2. Redirects to home page (`/`)

## Visual Layout

```
┌─────────────────────────────────────────────┐
│ NSS Logo | Home | Events | FAQs | Members  │
│                         [👤] [Logout]       │
└─────────────────────────────────────────────┘
```

- Profile icon: White circle with blue border, 40px x 40px
- Logout button: Red background, white text, rounded corners
- Gap between buttons: 0.5rem

## Testing

1. **Test Logout Functionality**:
   - Set a cookie: Open browser console and run:
     ```javascript
     document.cookie = "uid=sangameshwar.sale; path=/";
     ```
   - Refresh the page - you should see the profile icon and Logout button
   - Click "Logout" - should clear cookie and redirect to home

2. **Test Profile Navigation**:
   - When logged in, click the profile icon
   - Should navigate to `/me/profile/[username]`

3. **Test Login State**:
   - Clear all cookies
   - Refresh page - should only see "Login" button

## Browser Compatibility
- Works in all modern browsers
- Cookie clearing uses standard `document.cookie` API
- Navigation uses `window.location.href` for full page reload

## Future Enhancements

Possible improvements:
1. **Smooth transition**: Add fade-in/fade-out animation when switching between login/logout states
2. **Confirmation dialog**: Ask "Are you sure you want to logout?" before logging out
3. **Backend logout**: Call a backend endpoint to invalidate session server-side
4. **Remember me**: Keep user logged in across browser sessions
5. **Dropdown menu**: Instead of separate buttons, show a dropdown from profile icon with:
   - My Profile
   - Settings
   - Logout

## Related Files
- `frontend/src/utils/Navbar.tsx` - Main navbar component
- `frontend/src/app/me/profile/[username]/page.tsx` - User profile page
- `frontend/src/components/me/profile/ProfileCard.tsx` - Profile edit interface

## Notes
- The navbar has multiple responsive breakpoints (desktop, tablet, mobile)
- Currently only updated the desktop view
- Mobile menu may need similar logout button implementation
- Cookie name used: `uid` (username/user ID)
