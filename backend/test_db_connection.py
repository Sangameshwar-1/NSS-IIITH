#!/usr/bin/env python3
"""
Test script to verify database connection and seed data
"""
import sys
import os

# Test database connection
print("=" * 60)
print("Testing Database Connection")
print("=" * 60)

try:
    from database import get_database
    db = get_database()
    print(f"✓ Database connection successful!")
    print(f"  Database name: {db.name}")
    print(f"  MongoDB URL: {os.getenv('MONGODB_URL', 'mongodb://localhost:27017/')}")
    
    # List collections
    collections = db.list_collection_names()
    print(f"  Existing collections: {collections if collections else '(none)'}")
    print()
    
except Exception as e:
    print(f"✗ Database connection failed: {str(e)}")
    sys.exit(1)

# Test database operations
print("=" * 60)
print("Testing Database Operations")
print("=" * 60)

try:
    # Try a simple ping
    result = db.command("ping")
    print(f"✓ Database ping successful: {result}")
    
    # Check if members collection exists and count
    members_count = db["members"].count_documents({})
    print(f"✓ Members collection count: {members_count}")
    print()
    
except Exception as e:
    print(f"✗ Database operations failed: {str(e)}")
    sys.exit(1)

# Seed database
print("=" * 60)
print("Seeding Database")
print("=" * 60)

try:
    import seed_members
    seed_members.seed_members()
    
    # Verify seeding
    final_count = db["members"].count_documents({})
    print(f"\n✓ Final member count: {final_count}")
    
    # Show sample member
    sample = db["members"].find_one()
    if sample:
        print(f"✓ Sample member: {sample.get('name')} ({sample.get('email')})")
    
    print("\n" + "=" * 60)
    print("All tests passed! ✓")
    print("=" * 60)
    
except Exception as e:
    print(f"✗ Seeding failed: {str(e)}")
    import traceback
    traceback.print_exc()
    sys.exit(1)
