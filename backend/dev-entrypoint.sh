#!/bin/bash
set -e

# Wait for MongoDB
# echo "Waiting for MongoDB to be ready..."
# while ! python -c "import pymongo; pymongo.MongoClient('${MONGODB_URL}').admin.command('ping')" 2>/dev/null; do
#   echo "MongoDB not ready yet, waiting..."
#   sleep 2
# done
# echo "MongoDB is ready!"

# Generate GraphQL schema
if ! venv/bin/strawberry export-schema main > schema.graphql; then
  echo "Failed to generate GraphQL schema"
  echo "---- Error log ----"
  cat schema.graphql
  echo "-------------------"
  exit 1
fi
echo "GraphQL schema generated successfully"

# Run with hot reload
if ! exec venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000 --root-path /api --reload; then
  echo "Failed to start Uvicorn server"
  exit 1
fi