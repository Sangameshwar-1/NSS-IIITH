#!/usr/bin/env bash

set -e

# Load environment variables
if [ "$1" == "development" ]; then
  ENV_FILE=".env.development"
else
  ENV_FILE=".env.production"
fi

if [ -f "$ENV_FILE" ]; then
  export $(grep -v '^#' "$ENV_FILE" | xargs)
fi

# Build services
function build() {
  echo "Building backend..."
  docker-compose build backend-1 backend-2

  echo "Building frontend..."
  docker-compose build frontend-1 frontend-2
}

# Start services
function start() {
  echo "Starting services..."
  docker-compose up -d
}

# Stop services
function stop() {
  echo "Stopping services..."
  docker-compose down
}

# Show status
function status() {
  docker-compose ps
}

# Restart services
function restart() {
  stop
  start
}

# Show logs
function logs() {
  SERVICE="$1"
  docker-compose logs -f "$SERVICE"
}

case "$2" in
  "build")
    build
    ;;
  "start")
    start
    ;;
  "stop")
    stop
    ;;
  "status")
    status
    ;;
  "restart")
    restart
    ;;
  "logs")
    logs "$3"
    ;;
  *)
    echo "Usage: $0 {development|production} {build|start|stop|status|restart|logs [service]}"
    ;;
esac
