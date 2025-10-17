# 🧪 Profile Page Testing Guide

## Quick Setup

### 1. Frontend is already running
Your dev server should be running at http://localhost:3000

### 2. Set a test cookie to simulate login

Open browser console (F12) on http://localhost:3000 and run:

```javascript
// Option 1: Test as Akshay Chanda
document.cookie = "uid=1; path=/; domain=localhost";
location.reload();

// Option 2: Test as Rithik Reddy Palla  
document.cookie = "uid=7; path=/; domain=localhost";
location.reload();

// Option 3: Test with roll number
document.cookie = "uid=2024102014; path=/; domain=localhost";
location.reload();

// Option 4: Test with email
document.cookie = "uid=chanda.kumar@students.iiit.ac.in; path=/; domain=localhost";
location.reload();
```

## Test Scenarios

### ✅ Scenario 1: View Your Own Profile
1. Set cookie: `document.cookie = "uid=1; path=/; domain=localhost"`
2. Navigate to: http://localhost:3000/me/profile/1
3. **Expected**: 
   - ✨ See full profile with gradient hero
   - ✅ "Edit Profile" button visible
   - 🟢 Green active status indicator (pulsing)
   - 📑 Three tabs: Overview, Activity, Settings
   - 🎨 Colorful gradient cards

### ✅ Scenario 2: View Someone Else's Profile  
1. Set cookie: `document.cookie = "uid=1; path=/; domain=localhost"`
2. Navigate to: http://localhost:3000/me/profile/2
3. **Expected**:
   - ✨ See full profile with gradient hero
   - ❌ NO "Edit Profile" button
   - 🔴 Gray inactive status (if Jane Smith is inactive)
   - 📑 Same tabs and cards

### ✅ Scenario 3: Test Different UID Formats
All these should show Akshay Chanda's profile:
- http://localhost:3000/me/profile/1 (by ID)
- http://localhost:3000/me/profile/2024102014 (by roll number)
- http://localhost:3000/me/profile/chanda.kumar@students.iiit.ac.in (by email)

### ✅ Scenario 4: Test Not Found
1. Navigate to: http://localhost:3000/me/profile/nonexistent
2. **Expected**:
   - 🔍 Search icon
   - "Profile Not Found" message
   - Link to browse all members

### ✅ Scenario 5: Test Tab Navigation
1. Go to any profile
2. Click "Activity" tab
3. **Expected**: "Activity Coming Soon" placeholder
4. Click "Settings" tab  
5. **Expected**: "Settings Coming Soon" placeholder
6. Click "Overview" tab
7. **Expected**: Back to info cards

### ✅ Scenario 6: Test Responsive Design
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Test at:
   - 320px (mobile)
   - 768px (tablet)
   - 1024px (desktop)
4. **Expected**: Layout adapts smoothly

### ✅ Scenario 7: Test Hover Effects
1. Hover over info cards
   - **Expected**: Card lifts up, shadow enhances
2. Hover over tabs
   - **Expected**: Tab moves up slightly
3. Hover over Edit Profile button
   - **Expected**: Button scales up slightly

### ✅ Scenario 8: Test Navbar Integration
1. Set cookie: `document.cookie = "uid=1; path=/; domain=localhost"`
2. Refresh home page
3. **Expected**: Profile icon in navbar (instead of Login)
4. Click profile icon
5. **Expected**: Navigate to /me/profile/1

### ✅ Scenario 9: Test Without Login
1. Clear cookies: `document.cookie = "uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"`
2. Try to access: http://localhost:3000/me/profile/1
3. **Expected**: 
   - Profile still visible (public view)
   - No Edit Profile button
   - Navbar shows "Login" instead of profile icon

### ✅ Scenario 10: Test Edit Mode Toggle
1. View your own profile (uid=1, profile=1)
2. Click "Edit Profile" button
3. **Expected**: 
   - Button turns red
   - Text changes to "Cancel"
4. Click "Cancel"
5. **Expected**:
   - Button turns blue
   - Text changes back to "Edit Profile"

## Visual Checks

### Colors
- [ ] Hero gradient: Blue → Red
- [ ] Email card: Light blue gradient
- [ ] Roll card: Yellow gradient  
- [ ] Team card: Pink gradient
- [ ] Tenure card: Green gradient
- [ ] Active badge: Green background
- [ ] Inactive badge: Gray background

### Animations
- [ ] Page fades in on load
- [ ] Active status dot pulses
- [ ] Cards lift on hover
- [ ] Tabs lift on hover
- [ ] Button scales on hover

### Typography
- [ ] Name is large and bold
- [ ] Labels are small and uppercase
- [ ] Content is readable
- [ ] No text overflow

### Spacing
- [ ] Cards have consistent gaps
- [ ] Padding feels comfortable
- [ ] No elements touching edges
- [ ] Tab spacing is even

## Browser Testing

Test in:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if on Mac)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## Performance Checks

1. Open DevTools → Performance tab
2. Start recording
3. Navigate to profile page
4. Stop recording
5. **Expected**:
   - Load time < 1 second
   - No layout shifts
   - Smooth 60fps animations

## Accessibility Checks

1. Tab through page with keyboard
2. **Expected**: All interactive elements accessible
3. Right-click → Inspect → Lighthouse
4. Run Accessibility audit
5. **Expected**: Score > 90

## Console Errors

1. Open Console (F12)
2. Navigate to profile page
3. **Expected**: No red errors
4. Yellow warnings are okay for now

## Clear Cache Test

1. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. **Expected**: Page still loads correctly

## Common Issues & Solutions

### Issue: "Profile not found" even with valid UID
**Solution**: 
- Check if backend is running
- Check if getMembersFromDB() is working
- Try with different UID formats

### Issue: No Edit button on own profile
**Solution**:
- Check cookie is set: `document.cookie`
- Clear cookies and set again
- Check browser console for errors

### Issue: Animations not working
**Solution**:
- Check browser supports CSS animations
- Try different browser
- Disable browser extensions

### Issue: Styles look broken
**Solution**:
- Hard refresh (Ctrl+Shift+R)
- Clear browser cache
- Check for console errors

### Issue: Tabs not switching
**Solution**:
- Check browser console for errors
- Try clicking different tabs
- Hard refresh page

## Success Criteria

✅ All 10 test scenarios pass  
✅ All visual checks pass  
✅ No console errors  
✅ Responsive on mobile  
✅ Smooth animations  
✅ Edit button shows only on own profile  
✅ Multiple UID formats work  
✅ Navbar integration works  

## Next Steps After Testing

Once all tests pass:
1. Test with real backend (when available)
2. Add Activity tab features
3. Add Settings tab features
4. Implement actual edit functionality
5. Add more profile fields
6. Add profile photo upload

---

**Pro Tip**: Use browser DevTools "Device Mode" to test mobile without a physical device!

**Shortcut**: Save this cookie-setting snippet as a bookmark:
```javascript
javascript:(function(){var uid=prompt('Enter UID:','1');document.cookie='uid='+uid+'; path=/; domain=localhost';location.reload();})()
```
