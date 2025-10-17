"""
Seed script to populate the database with member data
Run this script to initialize the members collection with sample data
"""
from database import db
from model_members import MemberTypeEnum, MemberStatusEnum

# Sample members data matching frontend structure
MEMBERS_DATA = [
    {
        "id": "akshay.chanda",
        "name": "Akshay Chanda",
        "email": "akshay.chanda@students.iiit.ac.in",
        "rollNumber": "2024102014",
        "role": "President",
        "year": "4th Year",
        "department": "CSE",
        "team": MemberTypeEnum.ADMIN.value,
        "status": MemberStatusEnum.ACTIVE.value,
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
        "team": MemberTypeEnum.ADMIN.value,
        "status": MemberStatusEnum.ACTIVE.value,
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
        "team": MemberTypeEnum.ADMIN.value,
        "status": MemberStatusEnum.ACTIVE.value,
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
        "team": MemberTypeEnum.ADMIN.value,
        "status": MemberStatusEnum.ACTIVE.value,
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
        "team": MemberTypeEnum.TECH.value,
        "status": MemberStatusEnum.ACTIVE.value,
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
        "team": MemberTypeEnum.DESIGN.value,
        "status": MemberStatusEnum.ACTIVE.value,
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
        "team": MemberTypeEnum.CONTENT.value,
        "status": MemberStatusEnum.ACTIVE.value,
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
        "team": MemberTypeEnum.LOGISTICS.value,
        "status": MemberStatusEnum.ACTIVE.value,
        "start": "2024",
        "end": None,
        "photoUrl": "/favicon.ico",
        "phone": "+91 98765 43217",
        "linkedin": "https://linkedin.com/in/rithikpalla",
        "github": "https://github.com/rithikpalla",
        "bio": "Making events memorable and impactful.",
        "achievements": ["Coordinated 8+ successful events"],
        "interests": ["Event Planning", "Team Coordination"]
    }
]

def seed_members():
    """Seed the members collection with sample data"""
    try:
        # Clear existing members (optional - comment out if you want to keep existing data)
        # db["members"].delete_many({})
        # print("Cleared existing members")
        
        # Insert or update members
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
        
    except Exception as e:
        print(f"❌ Error seeding members: {str(e)}")
        raise

if __name__ == "__main__":
    print("🌱 Seeding members database...\n")
    seed_members()
