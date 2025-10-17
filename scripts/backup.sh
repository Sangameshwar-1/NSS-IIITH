#!/usr/bin/env bash

set -e

# Configuration
BACKUP_DIR="./backups"
CONTAINER_NAME="nss-mongodb"
DATABASE_NAME="nss_db"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="nss_backup_${TIMESTAMP}.tar.gz"

# Create backup directory
mkdir -p "$BACKUP_DIR"

function backup_database() {
  echo "Starting database backup..."
  
  # Create a temporary directory for the backup
  TEMP_DIR=$(mktemp -d)
  
  # Dump the database
  docker exec "$CONTAINER_NAME" mongodump --db "$DATABASE_NAME" --out /tmp/backup
  
  # Copy the backup from the container
  docker cp "$CONTAINER_NAME":/tmp/backup "$TEMP_DIR/"
  
  # Create a compressed archive
  tar -czf "$BACKUP_DIR/$BACKUP_FILE" -C "$TEMP_DIR" backup
  
  # Clean up
  rm -rf "$TEMP_DIR"
  docker exec "$CONTAINER_NAME" rm -rf /tmp/backup
  
  echo "Backup completed: $BACKUP_DIR/$BACKUP_FILE"
}

function restore_database() {
  RESTORE_FILE="$1"
  
  if [ -z "$RESTORE_FILE" ] || [ ! -f "$RESTORE_FILE" ]; then
    echo "Error: Please provide a valid backup file"
    exit 1
  fi
  
  echo "Restoring database from: $RESTORE_FILE"
  
  # Create a temporary directory for restoration
  TEMP_DIR=$(mktemp -d)
  
  # Extract the backup
  tar -xzf "$RESTORE_FILE" -C "$TEMP_DIR"
  
  # Copy the backup to the container
  docker cp "$TEMP_DIR/backup" "$CONTAINER_NAME":/tmp/
  
  # Restore the database
  docker exec "$CONTAINER_NAME" mongorestore --db "$DATABASE_NAME" --drop /tmp/backup/"$DATABASE_NAME"
  
  # Clean up
  rm -rf "$TEMP_DIR"
  docker exec "$CONTAINER_NAME" rm -rf /tmp/backup
  
  echo "Database restored successfully"
}

function list_backups() {
  echo "Available backups:"
  ls -la "$BACKUP_DIR"/*.tar.gz 2>/dev/null || echo "No backups found"
}

function cleanup_old_backups() {
  DAYS="${1:-7}"
  echo "Cleaning up backups older than $DAYS days..."
  find "$BACKUP_DIR" -name "nss_backup_*.tar.gz" -mtime +$DAYS -delete
  echo "Cleanup completed"
}

case "$1" in
  "backup")
    backup_database
    ;;
  "restore")
    restore_database "$2"
    ;;
  "list")
    list_backups
    ;;
  "cleanup")
    cleanup_old_backups "$2"
    ;;
  *)
    echo "Usage: $0 {backup|restore <file>|list|cleanup [days]}"
    echo "  backup         - Create a new backup"
    echo "  restore <file> - Restore from backup file"
    echo "  list           - List available backups"
    echo "  cleanup [days] - Remove backups older than N days (default: 7)"
    ;;
esac
