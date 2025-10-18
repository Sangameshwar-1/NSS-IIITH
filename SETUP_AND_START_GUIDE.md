# NSS-IIITH Setup and Start Guide

This guide explains how to set up and run the NSS-IIITH website using the automated scripts.

## 📋 Prerequisites

Before running the scripts, ensure you have:

- **Ubuntu/Debian Linux** (WSL2 on Windows is supported)
- **Docker** installed and running
- **Node.js** (v18 or higher) and npm
- **curl** and **lsof** utilities
- **sudo** access (for MongoDB installation)

## 🚀 Quick Start

### 1. Initial Setup (First Time Only)

Run the setup script to install MongoDB and create the database:

```bash
./setup.sh
```

This script will:
- ✅ Check if MongoDB is installed (skip if already installed)
- ✅ Install MongoDB 7.0 if needed (Ubuntu/Debian only)
- ✅ Start MongoDB service
- ✅ Create `nss_db` database
- ✅ Seed database with sample data (10 members, 6 events)
- ✅ Verify the setup

**What it checks:**
- MongoDB installation status
- MongoDB service status
- Port 27017 availability
- Database creation and seeding

**Sample Output:**
```
==========================================
   NSS-IIITH Database Setup Script
==========================================

Step 1: Checking MongoDB installation...
✓ MongoDB is already installed
  Version: MongoDB 7.0.x

Step 2: Checking MongoDB service...
✓ MongoDB is already running

Step 3: Checking port availability...
✓ Port 27017 is available

Step 4: Setting up database...
  Creating collections and inserting sample data...
✓ Database seeded with sample data

Step 5: Verifying setup...
✓ MongoDB connection successful
  Database: nss_db
  Members: 10
  Events: 6

==========================================
   Setup completed successfully! ✓
==========================================
```

### 2. Start the Application

Once setup is complete, start all services:

```bash
./start.sh
```

This script will:
- ✅ Verify MongoDB is running
- ✅ Build and start Backend (Docker container)
- ✅ Start Frontend (Next.js dev server)
- ✅ Display service status and access URLs

**Sample Output:**
```
==========================================
    NSS-IIITH Application Starter
==========================================

→ Checking MongoDB...
✓ MongoDB is running on port 27017
  Database: nss_db (10 members)

→ Starting Backend (Port 8000)...
  Starting backend container...
  Waiting for backend to be ready...
✓ Backend is running at http://localhost:8000
  GraphQL endpoint: http://localhost:8000/graphql

→ Starting Frontend (Port 3000)...
  Starting Next.js development server...
  Waiting for frontend to be ready...
✓ Frontend is running at http://localhost:3000
  PID: 12345

==========================================
          Service Status
==========================================
✓ MongoDB      : Running (Port 27017)
✓ Backend      : Running (Port 8000)
✓ Frontend     : Running (Port 3000)
==========================================

Access URLs:
  🌐 Frontend      : http://localhost:3000
  🔧 Admin Panel   : http://localhost:3000/admin
  📊 Backend API   : http://localhost:8000/graphql
  🗄️  MongoDB      : mongodb://localhost:27017/nss_db
```

## 🔧 Port Configuration

The application uses the following ports:

| Service  | Port  | URL                           |
|----------|-------|-------------------------------|
| Frontend | 3000  | http://localhost:3000         |
| Backend  | 8000  | http://localhost:8000/graphql |
| MongoDB  | 27017 | mongodb://localhost:27017     |

**Note:** The scripts do NOT modify any existing configuration files. They use these ports as configured in your application.

## 📝 Managing Services

### Stop Services

**Stop Backend:**
```bash
docker stop nss-backend-manual
```

**Stop Frontend:**
```bash
# Find the PID
cat .frontend.pid

# Kill the process
kill $(cat .frontend.pid)

# Or find and kill all node processes
pkill -f "next dev"
```

**Stop MongoDB:**
```bash
sudo systemctl stop mongod
```

### Restart Services

**Restart Everything:**
```bash
./start.sh
```

**Restart Backend Only:**
```bash
docker restart nss-backend-manual
```

**Restart Frontend Only:**
```bash
kill $(cat .frontend.pid) 2>/dev/null
cd frontend && npm run dev &
```

### View Logs

**Backend Logs:**
```bash
docker logs -f nss-backend-manual
```

**Frontend Logs:**
```bash
tail -f frontend-dev.log
```

**MongoDB Logs:**
```bash
sudo tail -f /var/log/mongodb/mongod.log
```

## 🔍 Troubleshooting

### Port Already in Use

If you get "port already in use" errors:

**Find what's using the port:**
```bash
# Check port 3000
lsof -i :3000

# Check port 8000
lsof -i :8000

# Check port 27017
lsof -i :27017
```

**Kill the process:**
```bash
# Replace PID with the process ID from lsof
kill -9 <PID>
```

### MongoDB Won't Start

**Check status:**
```bash
sudo systemctl status mongod
```

**Restart MongoDB:**
```bash
sudo systemctl restart mongod
```

**Check logs:**
```bash
sudo journalctl -u mongod -n 50
```

### Backend Container Issues

**Remove and rebuild:**
```bash
docker rm -f nss-backend-manual
docker rmi nss-backend
docker build -t nss-backend -f backend/Dockerfile.dev backend/
docker run -d --name nss-backend-manual --network host -e MONGODB_DB_NAME=nss_db nss-backend
```

**Check container status:**
```bash
docker ps -a | grep nss-backend
docker logs nss-backend-manual
```

### Frontend Won't Start

**Clear Next.js cache:**
```bash
cd frontend
rm -rf .next node_modules
npm install
npm run dev
```

**Check Node version:**
```bash
node --version  # Should be v18 or higher
```

### Database Issues

**Check database exists:**
```bash
mongosh nss_db --eval "db.members.countDocuments()"
```

**Recreate database:**
```bash
./setup.sh
# Choose 'y' when asked to recreate
```

**Manually seed database:**
```bash
cd backend
python3 seed_members.py
cd ..
```

## 🎯 Access the Application

Once both scripts complete successfully:

### 1. **Frontend Homepage**
   - URL: http://localhost:3000
   - Browse events, view members, explore NSS activities

### 2. **Admin Dashboard**
   - URL: http://localhost:3000/admin
   - Login with your IIIT credentials
   - Must be an admin user (team: "ADMIN")
   - Full CRUD operations on members and events

### 3. **GraphQL Playground**
   - URL: http://localhost:8000/graphql
   - Test GraphQL queries and mutations
   - View schema documentation

### 4. **MongoDB Direct Access**
   ```bash
   # Connect to MongoDB
   mongosh nss_db
   
   # List collections
   show collections
   
   # Count members
   db.members.countDocuments()
   
   # Find all admins
   db.members.find({team: "ADMIN"})
   ```

## 🔐 Admin Access

To promote a user to admin:

```bash
cd backend
python3 make_admin.py <username>

# Example:
python3 make_admin.py sangameshwar.sale
```

To list all admins:
```bash
cd backend
python3 make_admin.py --list
```

## 📦 What the Scripts Do

### setup.sh
- ✅ Does NOT modify existing files
- ✅ Only installs MongoDB if missing
- ✅ Creates database if doesn't exist
- ✅ Uses existing seed_members.py for data
- ✅ Idempotent (safe to run multiple times)

### start.sh
- ✅ Does NOT modify existing files
- ✅ Uses existing Docker configuration
- ✅ Reads ports from existing configs
- ✅ Starts services with proper environment variables
- ✅ Shows real-time logs

## 🛠️ Environment Variables

The scripts use these environment variables:

**Backend (Docker container):**
- `MONGODB_URL` = `mongodb://localhost:27017/`
- `MONGODB_DB_NAME` = `nss_db`

**Frontend:**
- `NEXT_PUBLIC_API_URL` = `http://localhost:8000`

These match your existing configuration and are set automatically by the scripts.

## 📚 Additional Resources

- [Admin Dashboard Guide](./ADMIN_DASHBOARD_README.md)
- [Members Date Sorting](./MEMBERS_DATE_SORTING.md)
- [Testing Guide](./TESTING_GUIDE.md)
- [Backend Updates](./backend/BACKEND_UPDATES.md)

## ⚠️ Important Notes

1. **WSL2 Users**: Scripts work in WSL2, but you need Docker Desktop running on Windows
2. **Port Conflicts**: Ensure ports 3000, 8000, and 27017 are not in use
3. **Database Persistence**: MongoDB data persists in `/var/lib/mongodb`
4. **Docker Network**: Backend uses `--network host` to access localhost MongoDB
5. **No File Modifications**: Scripts do NOT change your existing code or configs

## 🔄 Daily Workflow

```bash
# Morning: Start everything
./start.sh

# Work on your code...
# Frontend auto-reloads on changes
# Backend requires Docker restart for changes

# Evening: Stop services
docker stop nss-backend-manual
kill $(cat .frontend.pid)
```

## 💡 Tips

1. **Keep logs open** in separate terminals to debug issues
2. **Use Docker logs** to see backend errors
3. **Check browser console** for frontend errors
4. **Test GraphQL queries** directly at http://localhost:8000/graphql
5. **Backup database** before major changes:
   ```bash
   mongodump --db nss_db --out backup/
   ```

---

**Need help?** Check the troubleshooting section or view logs for detailed error messages.
