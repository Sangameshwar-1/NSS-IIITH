"use client";

import ProfileCard from "../../me/profile/ProfileCard";

interface MemberProfileProps {
  username: string;
  isOwnProfile?: boolean;
}

// Mock data - replace with real data from backend
const MOCK_MEMBERS = [
  {
    id: "akshay.chanda",
    name: "Akshay Chanda",
    role: "President",
    year: "4th Year",
    department: "CSE",
    email: "akshay.chanda@students.iiit.ac.in",
    phone: "+91 98765 43210",
    linkedin: "https://linkedin.com/in/akshaychanda",
    github: "https://github.com/akshaychanda",
    bio: "Passionate about building communities and fostering innovation.",
    achievements: [
      "Led team to win National Hackathon 2024",
      "Published research paper on AI/ML",
      "Organized 10+ technical workshops"
    ],
    interests: ["Machine Learning", "Web Development", "Community Building"]
  },
  {
    id: "sangameshwar.sale",
    name: "Sangameshwar Sale",
    role: "Vice President",
    year: "3rd Year",
    department: "ECE",
    email: "sangameshwar.sale@students.iiit.ac.in",
    phone: "+91 98765 43211",
    linkedin: "https://linkedin.com/in/sangameshwarsale",
    github: "https://github.com/sangameshwarsale",
    bio: "Tech enthusiast and problem solver.",
    achievements: [
      "Winner of State-level Coding Competition",
      "Intern at leading tech company"
    ],
    interests: ["Competitive Programming", "IoT", "Robotics"]
  },
  {
    id: "aditi.sharma",
    name: "Aditi Sharma",
    role: "Secretary",
    year: "3rd Year",
    department: "CSE",
    email: "aditi.sharma@students.iiit.ac.in",
    phone: "+91 98765 43212",
    linkedin: "https://linkedin.com/in/aditisharma",
    github: "https://github.com/aditisharma",
    bio: "Organizing events and managing teams is my forte.",
    achievements: ["Coordinated 5+ major college events"],
    interests: ["Event Management", "Public Speaking"]
  },
  {
    id: "rahul.verma",
    name: "Rahul Verma",
    role: "Treasurer",
    year: "2nd Year",
    department: "CSE",
    email: "rahul.verma@students.iiit.ac.in",
    phone: "+91 98765 43213",
    linkedin: "https://linkedin.com/in/rahulverma",
    github: "https://github.com/rahulverma",
    bio: "Numbers and finance enthusiast.",
    achievements: ["Managed club budget efficiently"],
    interests: ["Finance", "Data Analysis"]
  },
  {
    id: "priya.singh",
    name: "Priya Singh",
    role: "Technical Lead",
    year: "4th Year",
    department: "CSE",
    email: "priya.singh@students.iiit.ac.in",
    phone: "+91 98765 43214",
    linkedin: "https://linkedin.com/in/priyasingh",
    github: "https://github.com/priyasingh",
    bio: "Full-stack developer with a passion for open source.",
    achievements: [
      "Contributed to 10+ open source projects",
      "Mentored 20+ students"
    ],
    interests: ["Web Development", "Open Source", "Mentoring"]
  },
  {
    id: "neha.patel",
    name: "Neha Patel",
    role: "Design Head",
    year: "3rd Year",
    department: "CSE",
    email: "neha.patel@students.iiit.ac.in",
    phone: "+91 98765 43215",
    linkedin: "https://linkedin.com/in/nehapatel",
    github: "https://github.com/nehapatel",
    bio: "Creating beautiful and functional designs.",
    achievements: ["Designed UI for 5+ club projects"],
    interests: ["UI/UX Design", "Graphic Design"]
  },
  {
    id: "vikram.reddy",
    name: "Vikram Reddy",
    role: "Marketing Head",
    year: "2nd Year",
    department: "ECE",
    email: "vikram.reddy@students.iiit.ac.in",
    phone: "+91 98765 43216",
    linkedin: "https://linkedin.com/in/vikramreddy",
    github: "https://github.com/vikramreddy",
    bio: "Spreading the word about tech and innovation.",
    achievements: ["Increased club social media engagement by 200%"],
    interests: ["Marketing", "Social Media", "Content Creation"]
  },
  {
    id: "rithik.palla",
    name: "Rithik Palla",
    role: "Event Coordinator",
    year: "2nd Year",
    department: "CSE",
    email: "rithik.palla@students.iiit.ac.in",
    phone: "+91 98765 43217",
    linkedin: "https://linkedin.com/in/rithikpalla",
    github: "https://github.com/rithikpalla",
    bio: "Making events memorable and impactful.",
    achievements: ["Coordinated 8+ successful events"],
    interests: ["Event Planning", "Team Coordination"]
  }
];

export default function MemberProfileComponent({ username, isOwnProfile = false }: MemberProfileProps) {
  // Find the member data
  const member = MOCK_MEMBERS.find(m => m.id === username);

  if (!member) {
    return (
      <div style={{ 
        minHeight: "70vh", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        flexDirection: "column",
        gap: "1rem"
      }}>
        <h2>Member not found</h2>
        <p>The profile for {username} could not be found.</p>
      </div>
    );
  }
  return <ProfileCard member={member} isOwnProfile={isOwnProfile} />;

}
