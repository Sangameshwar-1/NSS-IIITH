# NSS-IIITH Full Stack Setup - Complete Summary

## ✅ Successfully Connected Backend and Frontend!

**Date:** October 17, 2025  
**Status:** All services running and connected

---

## 🎯 What We Accomplished

### 1. **Backend Setup** ✓
- Built Docker image for the FastAPI backend
- Container running on port **8000** (host) → **8000** (container)
- GraphQL API accessible at `http://localhost:8000/graphql`
- Health endpoint working at `http://localhost:8000/health`
- Container name: `nss-backend-manual`

### 2. **Database Setup** ✓
- MongoDB running locally on port **27017**
- Database name: `nss_db`
- Created `seed_direct.py` script for easy database seeding
- Collection: `members` (ready for data)

### 3. **Frontend Setup** ✓
- Next.js development server running on port **3000**
- Successfully serving the homepage with all components
- Connected to backend API
- All static assets loading correctly

---

## 🚀 Services Running

| Service | URL | Status | Port |
|---------|-----|--------|------|
| **Frontend** | http://localhost:3000 | ✅ Running | 3000 |
| **Backend API** | http://localhost:8000 | ✅ Running | 8000 |
| **GraphQL Playground** | http://localhost:8000/graphql | ✅ Running | 8000 |
| **API Docs** | http://localhost:8000/docs | ✅ Running | 8000 |
| **MongoDB** | mongodb://localhost:27017 | ✅ Running | 27017 |

---

## 📁 Project Structure

```
Website-master/
├── backend/                    # FastAPI + GraphQL Backend
│   ├── main.py                # Main application entry
│   ├── database.py            # MongoDB connection
│   ├── seed_direct.py         # ✨ NEW: Direct DB seeding script
│   ├── test_db_connection.py  # ✨ NEW: DB connection test script
│   ├── requirements.txt       # Python dependencies
│   └── Dockerfile.dev         # Development Docker image
├── frontend/                   # Next.js Frontend
│   ├── src/                   # Source code
│   ├── public/                # Static assets
│   ├── package.json           # Node dependencies
│   └── next.config.ts         # Next.js configuration
└── docker-compose.yml         # Multi-service orchestration
```

---

## 🔧 Quick Start Commands

### Start All Services

```bash
# Terminal 1: Start Backend (already running in Docker)
docker ps | grep nss-backend-manual

# Terminal 2: Start Frontend (if not running)
cd /mnt/c/Users/SANGAMESHWAR/Downloads/Website-master1/Website-master/frontend
npm run dev
```

### Seed Database

```bash
# Run the direct seeding script (requires only pymongo)
cd /mnt/c/Users/SANGAMESHWAR/Downloads/Website-master1/Website-master/backend
python3 seed_direct.py
```

### Check Service Health

```bash
# Backend health check
curl http://localhost:8000/health

# Frontend check (open in browser)
curl http://localhost:3000

# MongoDB check
mongosh --eval "db.adminCommand('ping')"
```

---

## 🐳 Docker Commands

### Backend Container Management

```bash
# View logs
docker logs nss-backend-manual

# Follow logs in real-time
docker logs -f nss-backend-manual

# Restart container
docker restart nss-backend-manual

# Stop container
docker stop nss-backend-manual

# Remove container
docker rm nss-backend-manual

# Rebuild and restart
docker stop nss-backend-manual
docker rm nss-backend-manual
cd /mnt/c/Users/SANGAMESHWAR/Downloads/Website-master1/Website-master/backend
docker build -t nss-backend -f Dockerfile.dev .
docker run -d --name nss-backend-manual \
  --add-host=host.docker.internal:host-gateway \
  -e MONGODB_URL="mongodb://host.docker.internal:27017/nss_db" \
  -e MONGODB_DB_NAME="nss_db" \
  -e API_ENV="development" \
  -e API_PORT="8000" \
  -p 8000:8000 \
  nss-backend
```

---

## 🔌 API Endpoints

### Backend REST API

- **Root:** `GET /` - API information
- **Health:** `GET /health` - Basic health check
- **Detailed Health:** `GET /health/detailed` - System metrics
- **Metrics:** `GET /metrics` - Prometheus metrics
- **Login:** `GET /login` - CAS authentication

### GraphQL API

**Endpoint:** `http://localhost:8000/graphql`

**Example Query:**
```graphql
query {
  getAllMembers {
    id
    name
    email
    role
    team
    status
  }
}
```

---

## 📊 Database Schema

### Members Collection

```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "rollNumber": "string",
  "role": "string",
  "year": "string",
  "department": "string",
  "team": "ADMIN | TECH | DESIGN | CONTENT | LOGISTICS",
  "status": "ACTIVE | INACTIVE | ALUMNI",
  "start": "string",
  "end": "string | null",
  "photoUrl": "string",
  "phone": "string",
  "linkedin": "string",
  "github": "string",
  "bio": "string",
  "achievements": ["string"],
  "interests": ["string"]
}
```

**Sample Data:** 8 members included in `seed_direct.py`

---

## 🛠️ Troubleshooting

### Backend Issues

**Issue:** Container not starting
```bash
# Check logs
docker logs nss-backend-manual

# Check if port 8000 is in use
lsof -i :8000
# or
netstat -tulpn | grep 8000
```

**Issue:** Can't connect to MongoDB
```bash
# Check if MongoDB is running
ps aux | grep mongod

# Test MongoDB connection
mongosh --eval "db.adminCommand('ping')"

# Check MongoDB is listening on all interfaces
sudo netstat -tulpn | grep 27017
```

### Frontend Issues

**Issue:** Frontend not loading
```bash
# Check if npm dev server is running
ps aux | grep "next dev"

# Restart frontend
cd frontend
npm run dev
```

**Issue:** API calls failing
```bash
# Check NEXT_PUBLIC_API_URL in .env or next.config.ts
# Should be: http://localhost:8000
```

### Database Issues

**Issue:** Can't seed database
```bash
# Make sure pymongo is installed
pip3 install pymongo

# Run direct seeding script
python3 backend/seed_direct.py
```

---

## 🔐 Environment Variables

### Backend (Docker Container)

```bash
MONGODB_URL=mongodb://host.docker.internal:27017/nss_db
MONGODB_DB_NAME=nss_db
API_ENV=development
API_PORT=8000
SECURE_COOKIES=False
CAS_SERVER_URL=https://login.iiit.ac.in/cas/
SERVICE_URL=http://localhost:8000/login
REDIRECT_URL=/
JWT_SECRET=jwt-secret-very-very-secret
```

### Frontend

```bash
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 📝 Next Steps

### To Add More Data

1. **Add Members:**
   - Edit `backend/seed_direct.py`
   - Add new member objects to `MEMBERS_DATA` array
   - Run: `python3 backend/seed_direct.py`

2. **Add Events:**
   - Create similar seeding script for events
   - Use the same pattern as `seed_direct.py`

3. **Add Other Collections:**
   - Follow the same structure
   - Update GraphQL schema as needed

### Production Deployment

1. **Use docker-compose:**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

2. **Update environment variables** for production

3. **Set up SSL/TLS** with nginx

4. **Configure MongoDB authentication**

5. **Set up monitoring** with Prometheus/Grafana

---

## 🎉 Success Checklist

- [x] Backend API running and accessible
- [x] Frontend serving pages successfully
- [x] MongoDB connected and accessible
- [x] Docker container running smoothly
- [x] Health endpoints responding
- [x] GraphQL playground accessible
- [x] Database seeding script created
- [x] All services interconnected

---

## 📞 Support

**MongoDB Connection String:** `mongodb://localhost:27017/nss_db`  
**Backend Health Check:** `curl http://localhost:8000/health`  
**Frontend URL:** http://localhost:3000  
**GraphQL Playground:** http://localhost:8000/graphql

---

## 🔄 Daily Development Workflow

1. **Start MongoDB** (if not running)
   ```bash
   sudo systemctl start mongod
   ```

2. **Start Backend** (if container stopped)
   ```bash
   docker start nss-backend-manual
   ```

3. **Start Frontend**
   ```bash
   cd frontend && npm run dev
   ```

4. **Verify all services**
   ```bash
   curl http://localhost:8000/health
   curl http://localhost:3000
   ```

---

**✨ Everything is connected and working! Your full stack is ready for development! ✨**

Last Updated: October 17, 2025
