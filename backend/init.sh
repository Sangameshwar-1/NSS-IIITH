#!/bin/bash

# Set error handling
set -e

# Wait for MongoDB to be ready
echo "Waiting for MongoDB to be ready..."
while ! python -c "import pymongo; pymongo.MongoClient('${MONGODB_URL}').admin.command('ping')" 2>/dev/null; do
  echo "MongoDB not ready yet, waiting..."
  sleep 2
done
echo "MongoDB is ready!"

# Run database migrations/setup if needed
echo "Setting up database..."
# Add your database initialization code here

# Start the application
echo "Starting FastAPI application..."
echo "GraphQL API available at http://localhost:8000/graphql"
if [ "$API_ENV" = "production" ]; then
    # Production mode with multiple workers
    exec venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4 --worker-class uvicorn.workers.UvicornWorker
else
    # Development mode with reload
    exec venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000 --reload
fi
