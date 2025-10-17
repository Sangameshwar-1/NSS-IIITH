"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProfileCard from "./ProfileCard";
import { getMemberByUsername } from "@/graphql_Q&M/getMemberByUsername";

interface MyProfileProps {
  username: string;
  loggedInUsername: string | null;
}

interface Member {
  id: string;
  name: string;
  role: string | null;
  year: string | null;
  department: string | null;
  email: string;
  phone: string | null;
  linkedin?: string | null;
  github?: string | null;
  bio: string | null;
  achievements?: string[] | null;
  interests?: string[] | null;
  team: string;
  status: string;
  rollNumber: string | null;
  photoUrl: string | null;
  start: string | null;
  end: string | null;
}

export default function MyProfileComponent({ username, loggedInUsername }: MyProfileProps) {
  const router = useRouter();
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if the logged-in user is trying to access their own profile
  useEffect(() => {
    if (loggedInUsername && username !== loggedInUsername) {
      // Redirect to the public member profile if trying to access someone else's profile via /me
      router.push(`/member/profile/${username}`);
    }
  }, [username, loggedInUsername, router]);

  // Fetch member data from backend
  useEffect(() => {
    async function fetchMember() {
      try {
        setLoading(true);
        const data = await getMemberByUsername(username);
        if (data) {
          setMember(data);
        } else {
          setError("Member not found");
        }
      } catch (err) {
        console.error("Error fetching member:", err);
        setError("Failed to load member data");
      } finally {
        setLoading(false);
      }
    }

    fetchMember();
  }, [username]);

  if (loading) {
    return (
      <div style={{ 
        minHeight: "70vh", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        flexDirection: "column",
        gap: "1rem"
      }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (error || !member) {
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

  // If viewing someone else's profile, show redirect message
  if (loggedInUsername && username !== loggedInUsername) {
    return (
      <div style={{ 
        minHeight: "70vh", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        flexDirection: "column",
        gap: "1rem"
      }}>
        <h2>Redirecting...</h2>
        <p>You are being redirected to the member profile page.</p>
      </div>
    );
  }

  return <ProfileCard member={member} isOwnProfile={true} />;
}
