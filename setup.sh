#!/bin/bash

# NSS-IIITH Setup Script
# This script sets up MongoDB and creates test database with sample data

set -e  # Exit on error

echo "=========================================="
echo "   NSS-IIITH Database Setup Script"
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
DB_NAME="nss_db"
MONGO_URL="mongodb://localhost:${MONGO_PORT}"

# Function to check if MongoDB is installed
check_mongodb_installed() {
    if command -v mongod &> /dev/null; then
        echo -e "${GREEN}✓${NC} MongoDB is already installed"
        MONGO_VERSION=$(mongod --version | head -n 1)
        echo "  Version: $MONGO_VERSION"
        return 0
    else
        echo -e "${YELLOW}!${NC} MongoDB is not installed"
        return 1
    fi
}

# Function to check if MongoDB is running
check_mongodb_running() {
    if pgrep -x "mongod" > /dev/null; then
        echo -e "${GREEN}✓${NC} MongoDB is already running"
        return 0
    else
        echo -e "${YELLOW}!${NC} MongoDB is not running"
        return 1
    fi
}

# Function to install MongoDB on Ubuntu/Debian
install_mongodb_ubuntu() {
    echo -e "${BLUE}→${NC} Installing MongoDB on Ubuntu/Debian..."
    
    # Import MongoDB public GPG key
    curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
        sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
    
    # Add MongoDB repository
    echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/7.0 multiverse" | \
        sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
    
    # Update and install
    sudo apt-get update
    sudo apt-get install -y mongodb-org
    
    echo -e "${GREEN}✓${NC} MongoDB installed successfully"
}

# Function to start MongoDB
start_mongodb() {
    echo -e "${BLUE}→${NC} Starting MongoDB..."
    
    if command -v systemctl &> /dev/null; then
        # Using systemd
        sudo systemctl start mongod
        sudo systemctl enable mongod
    else
        # Start manually
        sudo mongod --dbpath /var/lib/mongodb --logpath /var/log/mongodb/mongod.log --fork
    fi
    
    # Wait for MongoDB to start
    echo "  Waiting for MongoDB to start..."
    sleep 3
    
    if check_mongodb_running; then
        echo -e "${GREEN}✓${NC} MongoDB started successfully"
    else
        echo -e "${RED}✗${NC} Failed to start MongoDB"
        exit 1
    fi
}

# Function to check if port is available
check_port_available() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1 ; then
        echo -e "${YELLOW}!${NC} Port $port is already in use"
        return 1
    else
        echo -e "${GREEN}✓${NC} Port $port is available"
        return 0
    fi
}

# Function to create database and seed data
setup_database() {
    echo ""
    echo -e "${BLUE}→${NC} Setting up database: ${DB_NAME}"
    
    # Check if database already exists
    DB_EXISTS=$(mongosh --quiet --eval "db.getMongo().getDBNames().indexOf('${DB_NAME}') >= 0" 2>/dev/null || echo "false")
    
    if [ "$DB_EXISTS" == "true" ]; then
        echo -e "${YELLOW}!${NC} Database '${DB_NAME}' already exists"
        read -p "  Do you want to recreate it? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            echo "  Dropping existing database..."
            mongosh --quiet ${DB_NAME} --eval "db.dropDatabase()"
            echo -e "${GREEN}✓${NC} Database dropped"
        else
            echo "  Keeping existing database"
            return 0
        fi
    fi
    
    # Create database by inserting sample data
    echo "  Creating collections and inserting sample data..."
    
    # Use the seed_members.py script if it exists
    if [ -f "backend/seed_members.py" ]; then
        echo "  Using seed_members.py to populate database..."
        cd backend
        python3 seed_members.py
        cd ..
        echo -e "${GREEN}✓${NC} Database seeded with sample data"
    else
        # Create minimal data using mongosh
        mongosh --quiet ${DB_NAME} --eval "
        // Create admin user
        db.members.insertOne({
            id: 'admin',
            name: 'Admin User',
            email: 'admin@iiit.ac.in',
            team: 'ADMIN',
            status: 'ACTIVE',
            role: 'Administrator',
            start: '2024',
            end: null
        });
        
        print('✓ Sample admin user created');
        print('  Username: admin');
        print('  You can add more members using the admin dashboard');
        "
        echo -e "${GREEN}✓${NC} Basic database structure created"
    fi
}

# Function to verify setup
verify_setup() {
    echo ""
    echo -e "${BLUE}→${NC} Verifying setup..."
    
    # Check MongoDB connection
    if mongosh --quiet --eval "db.version()" > /dev/null 2>&1; then
        echo -e "${GREEN}✓${NC} MongoDB connection successful"
    else
        echo -e "${RED}✗${NC} MongoDB connection failed"
        return 1
    fi
    
    # Count documents
    MEMBER_COUNT=$(mongosh --quiet ${DB_NAME} --eval "db.members.countDocuments()" 2>/dev/null || echo "0")
    EVENT_COUNT=$(mongosh --quiet ${DB_NAME} --eval "db.events.countDocuments()" 2>/dev/null || echo "0")
    
    echo "  Database: ${DB_NAME}"
    echo "  Members: ${MEMBER_COUNT}"
    echo "  Events: ${EVENT_COUNT}"
    
    return 0
}

# Main execution
main() {
    echo "Step 1: Checking MongoDB installation..."
    if ! check_mongodb_installed; then
        echo ""
        read -p "Do you want to install MongoDB? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            # Detect OS
            if [ -f /etc/os-release ]; then
                . /etc/os-release
                if [[ "$ID" == "ubuntu" ]] || [[ "$ID" == "debian" ]]; then
                    install_mongodb_ubuntu
                else
                    echo -e "${RED}✗${NC} Unsupported OS. Please install MongoDB manually."
                    echo "  Visit: https://www.mongodb.com/docs/manual/installation/"
                    exit 1
                fi
            fi
        else
            echo -e "${YELLOW}!${NC} Skipping MongoDB installation"
            echo "  Please install MongoDB manually and run this script again"
            exit 0
        fi
    fi
    
    echo ""
    echo "Step 2: Checking MongoDB service..."
    if ! check_mongodb_running; then
        start_mongodb
    fi
    
    echo ""
    echo "Step 3: Checking port availability..."
    check_port_available ${MONGO_PORT} || true
    
    echo ""
    echo "Step 4: Setting up database..."
    setup_database
    
    echo ""
    echo "Step 5: Verifying setup..."
    if verify_setup; then
        echo ""
        echo -e "${GREEN}=========================================="
        echo "   Setup completed successfully! ✓"
        echo "==========================================${NC}"
        echo ""
        echo "Database Details:"
        echo "  URL: ${MONGO_URL}"
        echo "  Database: ${DB_NAME}"
        echo "  Port: ${MONGO_PORT}"
        echo ""
        echo "Next steps:"
        echo "  1. Run './start.sh' to start the application"
        echo "  2. Access frontend at http://localhost:3000"
        echo "  3. Access admin panel at http://localhost:3000/admin"
        echo ""
    else
        echo -e "${RED}✗${NC} Setup verification failed"
        exit 1
    fi
}

# Run main function
main
