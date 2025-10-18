# Quick Start - NSS-IIITH

## Two Simple Steps

### 1️⃣ Setup (First Time Only)
```bash
./setup.sh
```
Installs MongoDB (if needed) and creates test database with sample data.

### 2️⃣ Start Application
```bash
./start.sh
```
Starts MongoDB, Backend, and Frontend.

## Access URLs

- 🌐 **Website**: http://localhost:3000
- 🔧 **Admin Panel**: http://localhost:3000/admin  
- 📊 **GraphQL API**: http://localhost:8000/graphql

## Ports Used

| Service  | Port  |
|----------|-------|
| Frontend | 3000  |
| Backend  | 8000  |
| MongoDB  | 27017 |

## Stop Services

```bash
# Stop backend
docker stop nss-backend-manual

# Stop frontend
kill $(cat .frontend.pid)
```

## Features

✅ **Automatic MongoDB Setup** - Installs and configures if not present  
✅ **Docker Backend** - Containerized Python FastAPI + GraphQL  
✅ **Next.js Frontend** - React with automatic reload  
✅ **Test Database** - 10 sample members, 6 sample events  
✅ **Admin Dashboard** - Full CRUD operations  
✅ **No Config Changes** - Scripts don't modify existing files  

## Default Admin User

After running `setup.sh`, promote yourself to admin:

```bash
cd backend
python3 make_admin.py your.username
cd ..
```

## Troubleshooting

**Port in use?**
```bash
# Find what's using port 3000/8000
lsof -i :3000
lsof -i :8000

# Kill if needed
kill -9 <PID>
```

**MongoDB issues?**
```bash
sudo systemctl restart mongod
sudo systemctl status mongod
```

**Backend not working?**
```bash
# View logs
docker logs nss-backend-manual

# Restart
docker restart nss-backend-manual
```

**Frontend not loading?**
```bash
# View logs
tail -f frontend-dev.log

# Clear cache and restart
cd frontend
rm -rf .next
npm run dev
```

## Full Documentation

See [SETUP_AND_START_GUIDE.md](./SETUP_AND_START_GUIDE.md) for detailed instructions.

---

**Quick Test:**
```bash
# After running start.sh, test backend
curl http://localhost:8000/graphql -H "Content-Type: application/json" \
  -d '{"query":"{ viewMembers { id name } }"}'

# Should return list of members
```
