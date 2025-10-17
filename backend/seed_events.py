#!/usr/bin/env python3
"""
Seed Events Data
Seeds the MongoDB database with sample events data
"""

from pymongo import MongoClient
import os
from datetime import datetime, timedelta

# MongoDB configuration
MONGO_URL = os.getenv("MONGODB_URL", "mongodb://host.docker.internal:27017/nss_db")
MONGO_DB = os.getenv("MONGODB_DB_NAME", "nss_db")

# Sample events data
events_data = [
    {
        "name": "Blood Donation Camp 2024",
        "startTime": "2024-09-15T09:00:00",
        "endTime": "2024-09-15T17:00:00",
        "location": "IIIT Hyderabad Campus, Main Auditorium",
        "description": "Annual blood donation camp organized in collaboration with local hospitals. Join us to save lives!",
        "eventHead": {
            "id": "akshay.chanda",
            "name": "Akshay Chanda",
            "email": "akshay.chanda@students.iiit.ac.in",
            "rollNumber": "2024102014",
            "role": "President",
            "year": "4th Year",
            "department": "CSE",
            "team": "ADMIN",
            "status": "ACTIVE",
            "start": "2022",
            "end": None,
            "photoUrl": None,
            "phone": "+91-9876543210",
            "linkedin": "https://linkedin.com/in/akshaychanda",
            "github": "https://github.com/akshaychanda",
            "bio": "Passionate about building communities and fostering innovation.",
            "achievements": ["Led team to win National Hackathon 2024"],
            "interests": ["Community Service", "Healthcare"]
        }
    },
    {
        "name": "Tree Plantation Drive",
        "startTime": "2024-10-05T07:00:00",
        "endTime": "2024-10-05T12:00:00",
        "location": "Gachibowli Area, Hyderabad",
        "description": "Join us for a green initiative! Plant trees and contribute to a sustainable future.",
        "eventHead": {
            "id": "priya.singh",
            "name": "Priya Singh",
            "email": "priya.singh@students.iiit.ac.in",
            "rollNumber": "2024102018",
            "role": "Tech Lead",
            "year": "3rd Year",
            "department": "ECE",
            "team": "TECH",
            "status": "ACTIVE",
            "start": "2023",
            "end": None,
            "photoUrl": None,
            "phone": "+91-9876543214",
            "linkedin": "https://linkedin.com/in/priyasingh",
            "github": "https://github.com/priyasingh",
            "bio": "Tech enthusiast and environmental advocate.",
            "achievements": ["Developed eco-tracking app"],
            "interests": ["Environment", "Technology"]
        }
    },
    {
        "name": "Digital Literacy Workshop",
        "startTime": "2024-11-10T14:00:00",
        "endTime": "2024-11-10T18:00:00",
        "location": "Government School, Miyapur",
        "description": "Teaching basic computer skills to underprivileged students. Volunteers needed!",
        "eventHead": {
            "id": "rahul.verma",
            "name": "Rahul Verma",
            "email": "rahul.verma@students.iiit.ac.in",
            "rollNumber": "2024102017",
            "role": "Vice President",
            "year": "4th Year",
            "department": "CSE",
            "team": "ADMIN",
            "status": "ACTIVE",
            "start": "2022",
            "end": None,
            "photoUrl": None,
            "phone": "+91-9876543212",
            "linkedin": "https://linkedin.com/in/rahulverma",
            "github": "https://github.com/rahulverma",
            "bio": "Education advocate and tech mentor.",
            "achievements": ["Trained 500+ students in coding"],
            "interests": ["Education", "Technology"]
        }
    },
    {
        "name": "NSS Annual Fest 2024",
        "startTime": "2024-12-20T10:00:00",
        "endTime": "2024-12-21T22:00:00",
        "location": "IIIT Hyderabad Campus, Open Air Theatre",
        "description": "Two-day celebration of NSS activities with cultural performances, exhibitions, and awards ceremony.",
        "eventHead": {
            "id": "sangameshwar.sale",
            "name": "Sangameshwar Sale",
            "email": "sangameshwar.sale@students.iiit.ac.in",
            "rollNumber": "2024102015",
            "role": "Secretary",
            "year": "4th Year",
            "department": "CSE",
            "team": "ADMIN",
            "status": "ACTIVE",
            "start": "2022",
            "end": None,
            "photoUrl": None,
            "phone": "+91-9876543211",
            "linkedin": "https://linkedin.com/in/sangameshwarsale",
            "github": "https://github.com/sangameshwarsale",
            "bio": "Organizing events that bring communities together.",
            "achievements": ["Successfully organized 15+ major events"],
            "interests": ["Event Management", "Community Building"]
        }
    },
    {
        "name": "Clean India Campaign",
        "startTime": "2025-01-26T08:00:00",
        "endTime": "2025-01-26T13:00:00",
        "location": "Hussain Sagar Lake Area",
        "description": "Republic Day special - Join us in cleaning public spaces and spreading awareness about cleanliness.",
        "eventHead": {
            "id": "vikram.reddy",
            "name": "Vikram Reddy",
            "email": "vikram.reddy@students.iiit.ac.in",
            "rollNumber": "2024102020",
            "role": "Content Lead",
            "year": "2nd Year",
            "department": "CSE",
            "team": "CONTENT",
            "status": "ACTIVE",
            "start": "2024",
            "end": None,
            "photoUrl": None,
            "phone": "+91-9876543216",
            "linkedin": "https://linkedin.com/in/vikramreddy",
            "github": "https://github.com/vikramreddy",
            "bio": "Writer and social activist.",
            "achievements": ["Published articles in national newspapers"],
            "interests": ["Social Awareness", "Writing"]
        }
    },
    {
        "name": "Test Event",
        "startTime": "2025-02-14T15:00:00",
        "endTime": "2025-02-14T18:00:00",
        "location": "Test Location, IIIT Campus",
        "description": "This is a test event for demonstration purposes.",
        "eventHead": {
            "id": "test.user",
            "name": "Test User",
            "email": "test.user@students.iiit.ac.in",
            "rollNumber": "2024102099",
            "role": "Test Role",
            "year": "1st Year",
            "department": "CSE",
            "team": "TECH",
            "status": "ACTIVE",
            "start": "2024",
            "end": None,
            "photoUrl": None,
            "phone": "+91-9999999999",
            "linkedin": "https://linkedin.com/in/testuser",
            "github": "https://github.com/testuser",
            "bio": "This is a test user for demonstration.",
            "achievements": ["Test Achievement"],
            "interests": ["Testing", "Development"]
        }
    }
]

def seed_events():
    """Seed events collection with sample data"""
    print("🌱 Starting Events seeding...\n")
    
    # Connect to MongoDB
    print("=" * 60)
    print("Connecting to MongoDB...")
    print(f"MongoDB URL: {MONGO_URL}")
    print(f"Database: {MONGO_DB}")
    print("=" * 60)
    
    try:
        client = MongoClient(MONGO_URL, serverSelectionTimeoutMS=5000)
        # Test the connection
        client.admin.command('ping')
        print("✓ MongoDB connection successful!\n")
    except Exception as e:
        print(f"✗ MongoDB connection failed: {e}")
        return False
    
    db = client[MONGO_DB]
    events_collection = db["events"]
    
    # Seed events
    print("Seeding events...")
    for event in events_data:
        # Use upsert to avoid duplicates
        events_collection.update_one(
            {"name": event["name"]},
            {"$set": event},
            upsert=True
        )
        print(f"✓ Added/Updated event: {event['name']}")
    
    print(f"\n✅ Successfully seeded {len(events_data)} events!")
    
    # Verify the data
    total_events = events_collection.count_documents({})
    print(f"📊 Total events in database: {total_events}")
    
    # Show a sample event
    sample_event = events_collection.find_one({})
    if sample_event:
        print(f"\n✓ Sample event: {sample_event['name']} at {sample_event['location']}")
    
    print("\n" + "=" * 60)
    print("Events seeding completed successfully! ✓")
    print("=" * 60)
    
    client.close()
    return True

if __name__ == "__main__":
    seed_events()
