#!/usr/bin/env python3
"""
Direct MongoDB seeding script - doesn't require backend dependencies
"""
from pymongo import MongoClient
import os

# MongoDB connection
MONGO_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017/")
MONGO_DB = os.getenv("MONGODB_DB_NAME", "nss_db")

# Sample members data
MEMBERS_DATA = [
    {
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
        "photoUrl": "/favicon.ico",
        "phone": "+91 98765 43210",
        "linkedin": "https://linkedin.com/in/akshaychanda",
        "github": "https://github.com/akshaychanda",
        "bio": "Passionate about building communities and fostering innovation.",
        "achievements": [
            "Led team to win National Hackathon 2024",
            "Published research paper on AI/ML",
            "Organized 10+ technical workshops"
        ],
        "interests": ["Machine Learning", "Web Development", "Community Building"]
    },
    {
        "id": "sangameshwar.sale",
        "name": "Sangameshwar Sale",
        "email": "sangameshwar.sale@students.iiit.ac.in",
        "rollNumber": "2024102015",
        "role": "Vice President",
        "year": "3rd Year",
        "department": "ECE",
        "team": "ADMIN",
        "status": "ACTIVE",
        "start": "2023",
        "end": None,
        "photoUrl": "/favicon.ico",
        "phone": "+91 98765 43211",
        "linkedin": "https://linkedin.com/in/sangameshwarsale",
        "github": "https://github.com/sangameshwarsale",
        "bio": "Tech enthusiast and problem solver.",
        "achievements": [
            "Winner of State-level Coding Competition",
            "Intern at leading tech company"
        ],
        "interests": ["Competitive Programming", "IoT", "Robotics"]
    },
    {
        "id": "aditi.sharma",
        "name": "Aditi Sharma",
        "email": "aditi.sharma@students.iiit.ac.in",
        "rollNumber": "2024102016",
        "role": "Secretary",
        "year": "3rd Year",
        "department": "CSE",
        "team": "ADMIN",
        "status": "ACTIVE",
        "start": "2023",
        "end": None,
        "photoUrl": "/favicon.ico",
        "phone": "+91 98765 43212",
        "linkedin": "https://linkedin.com/in/aditisharma",
        "github": "https://github.com/aditisharma",
        "bio": "Organizing events and managing teams is my forte.",
        "achievements": ["Coordinated 5+ major college events"],
        "interests": ["Event Management", "Public Speaking"]
    },
    {
        "id": "rahul.verma",
        "name": "Rahul Verma",
        "email": "rahul.verma@students.iiit.ac.in",
        "rollNumber": "2024102017",
        "role": "Treasurer",
        "year": "2nd Year",
        "department": "CSE",
        "team": "ADMIN",
        "status": "ACTIVE",
        "start": "2024",
        "end": None,
        "photoUrl": "/favicon.ico",
        "phone": "+91 98765 43213",
        "linkedin": "https://linkedin.com/in/rahulverma",
        "github": "https://github.com/rahulverma",
        "bio": "Numbers and finance enthusiast.",
        "achievements": ["Managed club budget efficiently"],
        "interests": ["Finance", "Data Analysis"]
    },
    {
        "id": "priya.singh",
        "name": "Priya Singh",
        "email": "priya.singh@students.iiit.ac.in",
        "rollNumber": "2024102018",
        "role": "Technical Lead",
        "year": "4th Year",
        "department": "CSE",
        "team": "TECH",
        "status": "ACTIVE",
        "start": "2022",
        "end": None,
        "photoUrl": "/favicon.ico",
        "phone": "+91 98765 43214",
        "linkedin": "https://linkedin.com/in/priyasingh",
        "github": "https://github.com/priyasingh",
        "bio": "Full-stack developer with a passion for open source.",
        "achievements": [
            "Contributed to 10+ open source projects",
            "Mentored 20+ students"
        ],
        "interests": ["Web Development", "Open Source", "Mentoring"]
    },
    {
        "id": "neha.patel",
        "name": "Neha Patel",
        "email": "neha.patel@students.iiit.ac.in",
        "rollNumber": "2024102019",
        "role": "Design Head",
        "year": "3rd Year",
        "department": "CSE",
        "team": "DESIGN",
        "status": "ACTIVE",
        "start": "2023",
        "end": None,
        "photoUrl": "/favicon.ico",
        "phone": "+91 98765 43215",
        "linkedin": "https://linkedin.com/in/nehapatel",
        "github": "https://github.com/nehapatel",
        "bio": "Creating beautiful and functional designs.",
        "achievements": ["Designed UI for 5+ club projects"],
        "interests": ["UI/UX Design", "Graphic Design"]
    },
    {
        "id": "vikram.reddy",
        "name": "Vikram Reddy",
        "email": "vikram.reddy@students.iiit.ac.in",
        "rollNumber": "2024102020",
        "role": "Marketing Head",
        "year": "2nd Year",
        "department": "ECE",
        "team": "CONTENT",
        "status": "ACTIVE",
        "start": "2024",
        "end": None,
        "photoUrl": "/favicon.ico",
        "phone": "+91 98765 43216",
        "linkedin": "https://linkedin.com/in/vikramreddy",
        "github": "https://github.com/vikramreddy",
        "bio": "Spreading the word about tech and innovation.",
        "achievements": ["Increased club social media engagement by 200%"],
        "interests": ["Marketing", "Social Media", "Content Creation"]
    },
    {
        "id": "rithik.palla",
        "name": "Rithik Palla",
        "email": "rithik.palla@students.iiit.ac.in",
        "rollNumber": "2024102021",
        "role": "Event Coordinator",
        "year": "2nd Year",
        "department": "CSE",
        "team": "LOGISTICS",
        "status": "ACTIVE",
        "start": "2024",
        "end": None,
        "photoUrl": "/favicon.ico",
        "phone": "+91 98765 43217",
        "linkedin": "https://linkedin.com/in/rithikpalla",
        "github": "https://github.com/rithikpalla",
        "bio": "Making events memorable and impactful.",
        "achievements": ["Coordinated 8+ successful events"],
        "interests": ["Event Planning", "Team Coordination"]
    },
    {
        "id": "test.user",
        "name": "Test User",
        "email": "test.user@students.iiit.ac.in",
        "rollNumber": "2024102099",
        "role": "Test Member",
        "year": "1st Year",
        "department": "CSE",
        "team": "TECH",
        "status": "ACTIVE",
        "start": "2024",
        "end": None,
        "photoUrl": "/favicon.ico",
        "phone": "+91 98765 43299",
        "linkedin": "https://linkedin.com/in/testuser",
        "github": "https://github.com/testuser",
        "bio": "Test user for development and testing purposes.",
        "achievements": ["Testing database functionality", "Helping with development"],
        "interests": ["Testing", "Development", "Quality Assurance"]
    }
]

def seed_members():
    """Seed the members collection with sample data"""
    try:
        print("=" * 60)
        print("Connecting to MongoDB...")
        print(f"MongoDB URL: {MONGO_URL}")
        print(f"Database: {MONGO_DB}")
        print("=" * 60)
        
        client = MongoClient(MONGO_URL)
        db = client[MONGO_DB]
        
        # Test connection
        db.command("ping")
        print("✓ MongoDB connection successful!\n")
        
        # Insert or update members
        print("Seeding members...")
        for member_data in MEMBERS_DATA:
            db["members"].update_one(
                {"id": member_data["id"]},
                {"$set": member_data},
                upsert=True
            )
            print(f"✓ Added/Updated member: {member_data['name']} ({member_data['id']})")
        
        print(f"\n✅ Successfully seeded {len(MEMBERS_DATA)} members!")
        
        # Print summary
        total_members = db["members"].count_documents({})
        print(f"📊 Total members in database: {total_members}")
        
        # Show a sample member
        sample = db["members"].find_one()
        if sample:
            print(f"\n✓ Sample member: {sample.get('name')} ({sample.get('email')})")
        
        print("\n" + "=" * 60)
        print("Database seeding completed successfully! ✓")
        print("=" * 60)
        
        client.close()
        
    except Exception as e:
        print(f"❌ Error seeding members: {str(e)}")
        import traceback
        traceback.print_exc()
        raise

if __name__ == "__main__":
    print("🌱 Starting MongoDB seeding...\n")
    seed_members()
