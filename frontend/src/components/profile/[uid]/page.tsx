import React from "react";
import Navbar from "@/utils/Navbar";
import Footer from "@/utils/Footer";
import ProfileCard from "@/components/team/ProfileCard";
import { cookies } from "next/headers";

// Mock data - hardcoded for testing
const MOCK_MEMBERS = [
  {
    id: "akshay.chanda",
    email: "chanda.kumar@students.iiit.ac.in",
    name: "Akshay Chanda",
    photoUrl: "hi",
    team: "Tech",
    rollNumber: "2024102014",
    status: "active",
    from: "2021",
    to: "2025",
  },
  {
    id: "jane.smith",
    email: "jane@example.com",
    name: "Jane Smith",
    photoUrl: "hi",
    team: "Design",
    rollNumber: "2020002",
    status: "inactive",
    from: "2020",
    to: "2024",
  },
  {
    id: "john.doe",
    email: "john@example.com",
    name: "John Doe",
    photoUrl: "",
    team: "Design",
    rollNumber: "2020003",
    status: "active",
    from: "2020",
    to: "2024",
  },
  {
    id: "emma.watson",
    email: "emma@example.com",
    name: "Emma Watson",
    photoUrl: "",
    team: "Tech",
    rollNumber: "2021002",
    status: "active",
    from: "2021",
    to: "2025",
  },
  {
    id: "li.wei",
    email: "li@example.com",
    name: "Li Wei",
    photoUrl: "hi",
    team: "Design",
    rollNumber: "2020004",
    status: "inactive",
    from: "2020",
    to: "2024",
  },
  {
    id: "maria.garcia",
    email: "maria@example.com",
    name: "Maria Garcia",
    photoUrl: "",
    team: "Tech",
    rollNumber: "2021003",
    status: "active",
    from: "2021",
    to: "2025",
  },
  {
    id: "rithik.palla",
    email: "rithik.palla@students.iiit.ac.in",
    name: "Rithik Reddy Palla",
    photoUrl: "",
    team: "Tech",
    rollNumber: "2024102005",
    status: "active",
    from: "2022",
    to: "2026",
  },
  {
    id: "sangameshwar.sale",
    email: "sangameshwar.sale@students.iiit.ac.in",
    name: "Sangameshwar Sale",
    photoUrl: "",
    team: "Tech",
    rollNumber: "2024102017",
    status: "active",
    from: "2025",
    to: "_",
  }
];

// Dynamic route: /me/profile/[uid] - For logged-in user's own profile
export default async function ProfilePage({ params }: { params: Promise<{ uid: string }> }) {
  const { uid } = await params;
  
  // Get the logged-in user's uid from cookies
  const cookieStore = await cookies();
  const loggedInUid = cookieStore.get("uid")?.value;

  // Find member by id, email, or rollNumber
  const member = MOCK_MEMBERS.find(m => 
    m.id === uid || 
    m.email === uid || 
    m.rollNumber === uid
  );

  // Check if this is the user's own profile
  const isOwnProfile = !!(member && loggedInUid && (
    member.id === loggedInUid ||
    member.email === loggedInUid ||
    member.rollNumber === loggedInUid
  ));

  // If trying to view someone else's profile under /me/profile, redirect to /member
  if (member && !isOwnProfile) {
    return (
      <>
        <div style={{ 
          paddingTop: "calc(64px + 2vw)", 
          minHeight: "80vh", 
          background: "#FAEBE8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <Navbar />
          <div style={{ 
            maxWidth: 600, 
            margin: "2rem auto", 
            background: "#fff", 
            borderRadius: 12, 
            boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
            padding: 60,
            textAlign: "center"
          }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🔀</div>
            <h2 style={{ margin: "0 0 12px 0", fontSize: 24, color: "#1a1a1a" }}>Redirecting...</h2>
            <p style={{ margin: "0 0 24px 0", color: "#666", fontSize: 16 }}>
              This is not your profile. Redirecting to public profile page.
            </p>
            <a 
              href={`/member/${member.id}`}
              style={{ 
                display: "inline-block",
                padding: "12px 24px",
                background: "#E90000",
                color: "#fff",
                borderRadius: 8,
                textDecoration: "none",
                fontWeight: 600
              }}
            >
              View {member.name}'s Profile
            </a>
          </div>
        </div>
        <Footer />
        <script dangerouslySetInnerHTML={{
          __html: `setTimeout(() => window.location.href = '/member/${member.id}', 2000);`
        }} />
      </>
    );
  }

  return (
    <>
      <div style={{ 
        paddingTop: "calc(64px + 2vw)", 
        minHeight: "80vh", 
        background: "#FAEBE8" 
      }}>
        <Navbar />
        <div style={{ 
          maxWidth: 1200, 
          margin: "2rem auto", 
          background: "#fff", 
          borderRadius: 12, 
          boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
          overflow: "hidden"
        }}>
          {member ? (
            <ProfileCard member={member} isOwnProfile={isOwnProfile} />
          ) : (
            <div style={{ padding: 60, textAlign: "center" }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>🔍</div>
              <h2 style={{ margin: "0 0 12px 0", fontSize: 28, color: "#1a1a1a" }}>Profile Not Found</h2>
              <p style={{ margin: "0 0 24px 0", color: "#666", fontSize: 16 }}>
                We couldn't find a member matching "{uid}". 
              </p>
              <div style={{ background: "#f9fafb", padding: 20, borderRadius: 8, marginBottom: 20 }}>
                <p style={{ margin: "0 0 12px 0", fontWeight: 600 }}>Available test UIDs:</p>
                <ul style={{ textAlign: "left", display: "inline-block", margin: 0 }}>
                  {MOCK_MEMBERS.slice(0, 3).map(m => (
                    <li key={m.id}>
                      <a href={`/me/profile/${m.id}`} style={{ color: "#E90000" }}>
                        {m.id} - {m.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <a href="/members" style={{ color: "#E90000", textDecoration: "none", fontWeight: 600, fontSize: 16 }}>
                Browse all members →
              </a>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
