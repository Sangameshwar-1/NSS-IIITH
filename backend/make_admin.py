#!/usr/bin/env python3
"""
Script to set a user as admin in the NSS database.
Usage: python make_admin.py <username>
Example: python make_admin.py john.doe
"""

import sys
import os
from pymongo import MongoClient

# MongoDB connection - try multiple connection strings
CONNECTION_STRINGS = [
    "mongodb://admin:password123@localhost:27017/nss_db?authSource=admin",
    "mongodb://localhost:27017/nss_db",
    "mongodb://localhost:27017/",
]

def get_db():
    """Get database connection - tries multiple connection methods"""
    for i, url in enumerate(CONNECTION_STRINGS):
        try:
            print(f"🔄 Attempting connection {i+1}/{len(CONNECTION_STRINGS)}...")
            client = MongoClient(url, serverSelectionTimeoutMS=5000)
            # Test connection
            client.admin.command('ping')
            
            # Try to get the database
            db = client["nss_db"]
            
            # Try to list collections to verify access
            collections = db.list_collection_names()
            print(f"✅ Connected successfully!")
            print(f"   Database: nss_db")
            print(f"   Collections: {', '.join(collections) if collections else '(empty)'}")
            return db
        except Exception as e:
            print(f"   ❌ Failed: {str(e)[:100]}")
            continue
    
    print(f"\n❌ Could not connect to MongoDB with any method")
    print(f"\n💡 Troubleshooting:")
    print(f"   1. Check if MongoDB is running: docker ps | grep mongo")
    print(f"   2. Start MongoDB: docker start nss-mongodb-dev")
    print(f"   3. Or start full stack: cd /mnt/c/Users/SANGAMESHWAR/Downloads/Website-master1/Website-master && docker compose up -d")
    sys.exit(1)

def make_admin(username: str):
    """Set a user's team to ADMIN"""
    db = get_db()
    
    # Check if user exists
    user = db["members"].find_one({"id": username})
    if not user:
        print(f"❌ Error: User '{username}' not found in database")
        print(f"\n📋 Available users:")
        members = list(db["members"].find({}, {"id": 1, "name": 1, "team": 1}).sort("id", 1))
        if not members:
            print(f"   (No members in database)")
        else:
            for member in members:
                team = member.get('team', 'N/A')
                print(f"   - {member['id']:<20} {member.get('name', 'N/A'):<30} [{team}]")
        return False
    
    # Update user to admin
    result = db["members"].update_one(
        {"id": username},
        {"$set": {"team": "ADMIN"}}
    )
    
    if result.modified_count > 0:
        print(f"✅ Success: User '{username}' is now an ADMIN")
        print(f"   Name: {user.get('name', 'N/A')}")
        print(f"   Email: {user.get('email', 'N/A')}")
        return True
    else:
        print(f"ℹ️  User '{username}' is already an ADMIN")
        print(f"   Name: {user.get('name', 'N/A')}")
        print(f"   Email: {user.get('email', 'N/A')}")
        return True

def list_admins():
    """List all current admins"""
    db = get_db()
    admins = list(db["members"].find({"team": "ADMIN"}).sort("id", 1))
    
    print("\n👥 Current Admins:")
    if not admins:
        print("   (No admins found)")
    else:
        for admin in admins:
            print(f"   - {admin['id']:<20} {admin.get('name', 'N/A')}")
    print()

def list_all_members():
    """List all members with their teams"""
    db = get_db()
    members = list(db["members"].find({}, {"id": 1, "name": 1, "team": 1, "status": 1}).sort("id", 1))
    
    print("\n📋 All Members:")
    if not members:
        print("   (No members in database)")
    else:
        print(f"   {'Username':<20} {'Name':<30} {'Team':<12} {'Status'}")
        print(f"   {'-'*20} {'-'*30} {'-'*12} {'-'*8}")
        for member in members:
            username = member.get('id', 'N/A')
            name = member.get('name', 'N/A')
            team = member.get('team', 'N/A')
            status = member.get('status', 'N/A')
            print(f"   {username:<20} {name:<30} {team:<12} {status}")
    print()

if __name__ == "__main__":
    print("=" * 70)
    print("🛠️  NSS IIITH Admin Management Tool")
    print("=" * 70)
    
    if len(sys.argv) < 2:
        print("\n📖 Usage: python make_admin.py <username>")
        print("   Example: python make_admin.py john.doe")
        print("\n   Or: python make_admin.py --list  (to see all members)")
        list_admins()
        sys.exit(1)
    
    if sys.argv[1] == "--list":
        list_all_members()
        list_admins()
        sys.exit(0)
    
    username = sys.argv[1]
    print()
    make_admin(username)
    list_admins()
