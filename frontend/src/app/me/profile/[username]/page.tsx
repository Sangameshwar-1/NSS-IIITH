import React from "react";
import Navbar from "@/utils/Navbar";
import Footer from "@/utils/Footer";
import MyProfileComponent from "@/components/me/profile/MyProfileComponent";
import { cookies } from "next/headers";

// User's own profile route: /me/profile/[username]
export default async function MyProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  
  // Get the logged-in user's username from cookies
  const cookieStore = await cookies();
  const loggedInUsername = cookieStore.get("uid")?.value; // Using 'uid' to match Navbar

  return (
    <>
      <div style={{ 
        paddingTop: "calc(64px + 2vw)", 
        minHeight: "80vh", 
        background: "#FAEBE8" 
      }}>
        <Navbar />
        <MyProfileComponent username={username} loggedInUsername={loggedInUsername} />
      </div>
      <Footer />
    </>
  );
}
