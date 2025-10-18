#!/bin/bash

# NSS-IIITH Start Script
# This script starts the complete application stack: MongoDB, Backend, and Frontend

set -e  # Exit on error

echo "=========================================="
echo "    NSS-IIITH Application Starter"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
MONGO_PORT=27017
BACKEND_PORT=8000
FRONTEND_PORT=3000
DB_NAME="nss_db"
MONGO_URL="mongodb://localhost:${MONGO_PORT}"

# Docker settings
BACKEND_CONTAINER="nss-backend-manual"
BACKEND_IMAGE="nss-backend"

# PID files for process management
FRONTEND_PID_FILE=".frontend.pid"
BACKEND_PID_FILE=".backend.pid"

# Function to check if a port is in use
check_port_in_use() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1 ; then
        return 0  # Port is in use
    else
        return 1  # Port is free
    fi
}

# Function to check MongoDB
check_mongodb() {
    echo -e "${BLUE}→${NC} Checking MongoDB..."
    
    if ! command -v mongod &> /dev/null; then
        echo -e "${RED}✗${NC} MongoDB is not installed"
        echo "  Run './setup.sh' to install and configure MongoDB"
        return 1
    fi
    
    if ! pgrep -x "mongod" > /dev/null; then
        echo -e "${YELLOW}!${NC} MongoDB is not running. Starting..."
        if command -v systemctl &> /dev/null; then
            sudo systemctl start mongod
        else
            sudo mongod --dbpath /var/lib/mongodb --logpath /var/log/mongodb/mongod.log --fork
        fi
        sleep 2
    fi
    
    # Verify MongoDB is accessible
    if mongosh --quiet --eval "db.version()" > /dev/null 2>&1; then
        echo -e "${GREEN}✓${NC} MongoDB is running on port ${MONGO_PORT}"
        
        # Check if database exists
        DB_EXISTS=$(mongosh --quiet --eval "db.getMongo().getDBNames().indexOf('${DB_NAME}') >= 0" 2>/dev/null || echo "false")
        if [ "$DB_EXISTS" == "true" ]; then
            MEMBER_COUNT=$(mongosh --quiet ${DB_NAME} --eval "db.members.countDocuments()" 2>/dev/null || echo "0")
            echo "  Database: ${DB_NAME} (${MEMBER_COUNT} members)"
        else
            echo -e "${YELLOW}!${NC} Database '${DB_NAME}' does not exist"
            echo "  Run './setup.sh' to create the database"
            return 1
        fi
    else
        echo -e "${RED}✗${NC} Cannot connect to MongoDB"
        return 1
    fi
    
    return 0
}

# Function to build and start backend
start_backend() {
    echo ""
    echo -e "${BLUE}→${NC} Starting Backend (Port ${BACKEND_PORT})..."
    
    # Check if port is already in use
    if check_port_in_use ${BACKEND_PORT}; then
        echo -e "${YELLOW}!${NC} Port ${BACKEND_PORT} is already in use"
        
        # Check if it's our container
        if docker ps --format '{{.Names}}' | grep -q "^${BACKEND_CONTAINER}$"; then
            echo "  Backend container is already running"
            return 0
        else
            echo -e "${RED}✗${NC} Another process is using port ${BACKEND_PORT}"
            echo "  Please stop it and try again"
            return 1
        fi
    fi
    
    # Check if Docker is available
    if ! command -v docker &> /dev/null; then
        echo -e "${RED}✗${NC} Docker is not installed"
        echo "  Please install Docker to run the backend"
        return 1
    fi
    
    # Remove old container if exists
    if docker ps -a --format '{{.Names}}' | grep -q "^${BACKEND_CONTAINER}$"; then
        echo "  Removing old backend container..."
        docker rm -f ${BACKEND_CONTAINER} > /dev/null 2>&1
    fi
    
    # Check if image exists, build if not
    if ! docker images --format '{{.Repository}}' | grep -q "^${BACKEND_IMAGE}$"; then
        echo "  Building backend Docker image..."
        docker build -t ${BACKEND_IMAGE} -f backend/Dockerfile.dev backend/
    fi
    
    # Start backend container
    echo "  Starting backend container..."
    docker run -d \
        --name ${BACKEND_CONTAINER} \
        --network host \
        -e MONGODB_URL="${MONGO_URL}/" \
        -e MONGODB_DB_NAME="${DB_NAME}" \
        ${BACKEND_IMAGE} > /dev/null
    
    # Wait for backend to start
    echo "  Waiting for backend to be ready..."
    sleep 5
    
    # Verify backend is running - try multiple times
    MAX_ATTEMPTS=5
    ATTEMPT=1
    while [ $ATTEMPT -le $MAX_ATTEMPTS ]; do
        if curl -s http://localhost:${BACKEND_PORT}/graphql \
            -H "Content-Type: application/json" \
            -d '{"query":"{ __typename }"}' 2>/dev/null | grep -q "Query"; then
            echo -e "${GREEN}✓${NC} Backend is running at http://localhost:${BACKEND_PORT}"
            echo "  GraphQL endpoint: http://localhost:${BACKEND_PORT}/graphql"
            return 0
        fi
        
        if [ $ATTEMPT -lt $MAX_ATTEMPTS ]; then
            echo "  Attempt $ATTEMPT/$MAX_ATTEMPTS failed, retrying..."
            sleep 2
        fi
        ATTEMPT=$((ATTEMPT + 1))
    done
    
    # Check if container is running even if verification failed
    if docker ps --format '{{.Names}}' | grep -q "^${BACKEND_CONTAINER}$"; then
        echo -e "${YELLOW}!${NC} Backend container is running but verification timed out"
        echo "  Check logs: docker logs ${BACKEND_CONTAINER}"
        echo "  Try: curl http://localhost:${BACKEND_PORT}/graphql"
        return 0  # Return success anyway since container is running
    else
        echo -e "${RED}✗${NC} Backend failed to start"
        echo "  Check logs: docker logs ${BACKEND_CONTAINER}"
        return 1
    fi
}

# Function to start frontend
start_frontend() {
    echo ""
    echo -e "${BLUE}→${NC} Starting Frontend (Port ${FRONTEND_PORT})..."
    
    # Check if port is already in use
    if check_port_in_use ${FRONTEND_PORT}; then
        echo -e "${YELLOW}!${NC} Frontend is already running on port ${FRONTEND_PORT}"
        return 0
    fi
    
    # Check if node_modules exists
    if [ ! -d "frontend/node_modules" ]; then
        echo "  Installing frontend dependencies..."
        cd frontend
        npm install
        cd ..
    fi
    
    # Start frontend in background
    echo "  Starting Next.js development server..."
    cd frontend
    
    # Set environment variables
    export NEXT_PUBLIC_API_URL="http://localhost:${BACKEND_PORT}"
    
    # Start in background and save PID
    npm run dev > ../frontend-dev.log 2>&1 &
    FRONTEND_PID=$!
    echo $FRONTEND_PID > ../${FRONTEND_PID_FILE}
    
    cd ..
    
    # Wait for frontend to start
    echo "  Waiting for frontend to be ready..."
    sleep 8
    
    # Verify frontend is running
    if curl -s http://localhost:${FRONTEND_PORT} | grep -q "html"; then
        echo -e "${GREEN}✓${NC} Frontend is running at http://localhost:${FRONTEND_PORT}"
        echo "  PID: ${FRONTEND_PID}"
        return 0
    else
        echo -e "${YELLOW}!${NC} Frontend may still be starting..."
        echo "  Check logs: tail -f frontend-dev.log"
        return 0
    fi
}

# Function to display status
show_status() {
    echo ""
    echo "=========================================="
    echo "          Service Status"
    echo "=========================================="
    
    # MongoDB
    if pgrep -x "mongod" > /dev/null; then
        echo -e "${GREEN}✓${NC} MongoDB      : Running (Port ${MONGO_PORT})"
    else
        echo -e "${RED}✗${NC} MongoDB      : Not running"
    fi
    
    # Backend
    if docker ps --format '{{.Names}}' | grep -q "^${BACKEND_CONTAINER}$"; then
        echo -e "${GREEN}✓${NC} Backend      : Running (Port ${BACKEND_PORT})"
    else
        echo -e "${RED}✗${NC} Backend      : Not running"
    fi
    
    # Frontend
    if check_port_in_use ${FRONTEND_PORT}; then
        echo -e "${GREEN}✓${NC} Frontend     : Running (Port ${FRONTEND_PORT})"
    else
        echo -e "${RED}✗${NC} Frontend     : Not running"
    fi
    
    echo "=========================================="
}

# Function to display access URLs
show_urls() {
    echo ""
    echo "Access URLs:"
    echo "  🌐 Frontend      : http://localhost:${FRONTEND_PORT}"
    echo "  🔧 Admin Panel   : http://localhost:${FRONTEND_PORT}/admin"
    echo "  📊 Backend API   : http://localhost:${BACKEND_PORT}/graphql"
    echo "  🗄️  MongoDB      : mongodb://localhost:${MONGO_PORT}/${DB_NAME}"
    echo ""
    echo "Useful Commands:"
    echo "  Stop backend   : docker stop ${BACKEND_CONTAINER}"
    echo "  Stop frontend  : kill \$(cat ${FRONTEND_PID_FILE}) 2>/dev/null"
    echo "  View backend logs : docker logs -f ${BACKEND_CONTAINER}"
    echo "  View frontend logs: tail -f frontend-dev.log"
    echo ""
}

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "Cleaning up..."
}

trap cleanup EXIT

# Main execution
main() {
    # Check MongoDB
    if ! check_mongodb; then
        echo ""
        echo -e "${RED}MongoDB is not ready. Please run './setup.sh' first.${NC}"
        exit 1
    fi
    
    # Start Backend
    if ! start_backend; then
        echo ""
        echo -e "${RED}Failed to start backend${NC}"
        exit 1
    fi
    
    # Start Frontend
    if ! start_frontend; then
        echo ""
        echo -e "${YELLOW}Frontend may still be starting...${NC}"
    fi
    
    # Show status and URLs
    show_status
    show_urls
    
    echo -e "${GREEN}=========================================="
    echo "   All services started successfully! ✓"
    echo "==========================================${NC}"
    echo ""
    echo "Press Ctrl+C to view stop instructions"
    echo ""
    
    # Keep script running and show logs
    echo "Frontend logs (Ctrl+C to stop):"
    echo "----------------------------------------"
    tail -f frontend-dev.log 2>/dev/null || echo "Waiting for logs..."
}

# Run main function
main
