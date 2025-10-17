#!/bin/bash
# Startup script for NSS-IIITH website (Backend + Frontend + MongoDB)

set -e

echo "================================================"
echo "NSS-IIITH Website - Startup Script"
echo "================================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if MongoDB is running
echo -e "${YELLOW}[1/5]${NC} Checking MongoDB..."
if pgrep -x "mongod" > /dev/null; then
    echo -e "${GREEN}✓${NC} MongoDB is already running"
else
    echo -e "${RED}✗${NC} MongoDB is not running. Please start MongoDB first."
    echo "  You can start it with: sudo systemctl start mongod"
    exit 1
fi

# Check MongoDB connection
echo -e "${YELLOW}[2/5]${NC} Testing MongoDB connection..."
if python3 -c "from pymongo import MongoClient; client = MongoClient('mongodb://localhost:27017/', serverSelectionTimeoutMS=2000); client.admin.command('ping')" 2>/dev/null; then
    echo -e "${GREEN}✓${NC} MongoDB connection successful"
else
    echo -e "${RED}✗${NC} Cannot connect to MongoDB"
    exit 1
fi

# Build backend Docker image if it doesn't exist
echo -e "${YELLOW}[3/5]${NC} Checking backend Docker image..."
if docker images | grep -q "nss-backend"; then
    echo -e "${GREEN}✓${NC} Backend image exists"
else
    echo -e "${YELLOW}→${NC} Building backend Docker image (this may take a few minutes)..."
    cd backend && docker build -t nss-backend -f Dockerfile.dev . && cd ..
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓${NC} Backend image built successfully"
    else
        echo -e "${RED}✗${NC} Failed to build backend image"
        exit 1
    fi
fi

# Start backend container
echo -e "${YELLOW}[4/5]${NC} Starting backend service..."
# Stop existing container if running
docker stop nss-backend-manual 2>/dev/null || true
docker rm nss-backend-manual 2>/dev/null || true

# Start new container
docker run -d \
    --name nss-backend-manual \
    --network="host" \
    -e MONGODB_URL="mongodb://localhost:27017/nss_db" \
    -e MONGODB_DB_NAME="nss_db" \
    -e API_ENV="development" \
    -e API_PORT="8000" \
    -v "$(pwd)/backend:/backend" \
    -p 8000:8000 \
    nss-backend

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓${NC} Backend service started (port 8000)"
    
    # Wait for backend to be ready
    echo "  Waiting for backend to initialize..."
    sleep 5
    
    # Test backend health
    if curl -s http://localhost:8000/health > /dev/null 2>&1; then
        echo -e "${GREEN}✓${NC} Backend is healthy"
    else
        echo -e "${YELLOW}⚠${NC} Backend may still be initializing..."
    fi
else
    echo -e "${RED}✗${NC} Failed to start backend"
    exit 1
fi

# Check if frontend dependencies are installed
echo -e "${YELLOW}[5/5]${NC} Checking frontend..."
cd frontend

if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}→${NC} Installing frontend dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}✗${NC} Failed to install frontend dependencies"
        exit 1
    fi
fi

echo -e "${GREEN}✓${NC} Frontend dependencies ready"
echo ""
echo "================================================"
echo -e "${GREEN}✓ All services started successfully!${NC}"
echo "================================================"
echo ""
echo "Services running:"
echo "  • MongoDB:  localhost:27017"
echo "  • Backend:  http://localhost:8000"
echo "  • API Docs: http://localhost:8000/docs"
echo "  • GraphQL:  http://localhost:8000/api/graphql"
echo ""
echo "To start the frontend:"
echo "  cd frontend && npm run dev"
echo ""
echo "To view backend logs:"
echo "  docker logs -f nss-backend-manual"
echo ""
echo "To stop the backend:"
echo "  docker stop nss-backend-manual"
echo ""
