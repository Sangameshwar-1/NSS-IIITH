import React from "react";
import Navbar from "@/utils/Navbar";
import Footer from "@/utils/Footer";
import MemberProfileComponent from "@/components/member/profile/MemberProfileComponent";

// Public member profile route: /member/profile/[username]
export default async function MemberProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;

  return (
    <>
      <div style={{ 
        paddingTop: "calc(64px + 2vw)", 
        minHeight: "80vh", 
        background: "#FAEBE8" 
      }}>
        <Navbar />
        <MemberProfileComponent username={username} isOwnProfile={false} />
      </div>
      <Footer />
    </>
  );
}
