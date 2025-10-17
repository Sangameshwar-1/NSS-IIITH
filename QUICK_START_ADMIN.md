# 🎉 ADMIN DASHBOARD - QUICK START GUIDE

## ✅ You're Already an Admin!

Your username **`sangameshwar.sale`** is already set as ADMIN in the database.

## 🚀 Access the Admin Dashboard

### Step 1: Make sure backend is running
```bash
# Check if backend is running
docker ps | grep backend

# If not running, start it:
docker start nss-backend-manual
# OR rebuild with new mutations:
cd /mnt/c/Users/SANGAMESHWAR/Downloads/Website-master1/Website-master
docker build -t nss-backend -f backend/Dockerfile.dev backend/
docker run -d --name nss-backend-manual -p 8000:8000 nss-backend
```

### Step 2: Access the dashboard
1. Open browser: `http://localhost:3000`
2. **Login** with your CAS credentials (sangameshwar.sale)
3. **Hover** over your profile icon (top right)
4. Click **"🛠️ Admin Dashboard"**

Or go directly to: `http://localhost:3000/admin`

## 📊 Current Database Status

**Total Members:** 9
- Admins: 4 (aditi.sharma, akshay.chanda, rahul.verma, sangameshwar.sale)
- Tech: 2 (priya.singh, test.user)
- Design: 1 (neha.patel)
- Content: 1 (vikram.reddy)
- Logistics: 1 (rithik.palla)

**Collections:** members, events

## 🛠️ What You Can Do

### From Admin Dashboard:
✅ Add new members
✅ Edit existing members
✅ Delete members
✅ Change member teams
✅ Update member status (active/inactive)
✅ Add new events
✅ Edit events
✅ Delete events
✅ Search and filter members
✅ View all data

### Using make_admin.py:
```bash
cd backend

# List all members
python3 make_admin.py --list

# Make someone else admin
python3 make_admin.py username.here

# Examples:
python3 make_admin.py priya.singh
python3 make_admin.py test.user
```

## 🔧 Managing Members

### Add a New Member (via dashboard):
1. Go to admin dashboard
2. Click "👥 Members" tab
3. Click "➕ Add Member"
4. Fill in details:
   - Username (required): firstname.lastname
   - Name (required)
   - Email (required)
   - Team (required): ADMIN, TECH, DESIGN, CONTENT, LOGISTICS, VOLUNTEER
   - Status (required): ACTIVE or INACTIVE
   - Optional: Roll Number, Role, Year, Department, Phone, LinkedIn, GitHub, Bio
5. Click "💾 Save"

### Edit a Member:
1. Find the member (use search if needed)
2. Click "✏️ Edit" on their card
3. Update fields
4. Click "💾 Save"

### Delete a Member:
1. Find the member
2. Click "🗑️ Delete"
3. Confirm deletion

## 🔧 Managing Events

### Add a New Event:
1. Click "📅 Events" tab
2. Click "➕ Add Event"
3. Fill in:
   - Event Name (required)
   - Location (required)
   - Start Time (required)
   - End Time (required)
   - Description (optional)
4. Click "💾 Save"

### Edit/Delete Events:
- Similar to members, use "✏️ Edit" or "🗑️ Delete" buttons

## 📝 Notes

- **MongoDB** runs without authentication (connection string 2 worked)
- **Backend** needs to be rebuilt to include delete mutations
- **All changes** are immediate and permanent
- **Deletions** require confirmation
- **Search** works on name, email, and username
- **Filters** help find specific team members

## 🐛 Troubleshooting

**Can't access dashboard?**
- Make sure you're logged in
- Your username must be `sangameshwar.sale`
- Backend must be running on port 8000

**Changes not showing?**
- Refresh the page
- Check browser console for errors
- Verify backend is running

**Delete buttons not working?**
- Backend needs to be rebuilt with new mutations
- Run the docker build command above

## 🎯 Next Steps

1. ✅ You're already admin
2. ⬜ Start backend (if not running)
3. ⬜ Login to website
4. ⬜ Access admin dashboard
5. ⬜ Start managing your database!

Enjoy your admin powers! 🚀
