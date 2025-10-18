"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

type Member = {
  id?: string;
  email: string;
  name: string;
  photoUrl: string;
  team: string;
  rollNumber: string;
  status: "active" | "inactive";
  from: string;
  to: string;
};

export default function MemberCard({ member }: { member: Member }) {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);
  const [hover, setHover] = useState(false);
  const getFallbackImage = () => "/favicon.ico";
  const getImageSrc = (): string => {
    if (imageError) return getFallbackImage();
    if (!member.photoUrl || member.photoUrl.trim() === "" || member.photoUrl === "hi") {
      return getFallbackImage();
    }
    return member.photoUrl;
  };
  const handleImageError = () => setImageError(true);
  const username = member.id || member.email.split('@')[0];
  const profileUrl = `/member/profile/${username}`;
  const linkedInUrl = `https://www.linkedin.com/in/${member.rollNumber}`;
  const emailUrl = `mailto:${member.email}`;
  
  const handleFrontClick = () => {
    router.push(profileUrl);
  };

  return (
    <div
      style={{ perspective: 1200, width: "100%", maxWidth: 220, minWidth: 180, height: "auto", aspectRatio: "220/260", margin: "10px auto 32px auto", display: "block", position: "relative" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleFrontClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleFrontClick();
        }
      }}
    >
      <div style={{ position: "relative", width: "100%", height: "100%", transition: "transform 1.2s cubic-bezier(.4,2,.3,1)", transformStyle: "preserve-3d", borderRadius: 24, boxShadow: hover ? "0 8px 24px rgba(0,0,0,0.18)" : "0 2px 12px rgba(0,0,0,0.07)", transform: hover ? "rotateY(180deg) translateX(0)" : "none", cursor: "pointer", transformOrigin: "center center", left: 0 }}>
  {/* Front Side - Clickable to profile */}
  <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backfaceVisibility: "hidden", background: "#fff", borderRadius: 24, display: "flex", flexDirection: "column", alignItems: "center", padding: 20, textAlign: "center", justifyContent: "center" }}>
          <div style={{ width: "clamp(120px, 70%, 160px)", height: "clamp(120px, 70%, 160px)", borderRadius: "50%", overflow: "hidden", marginBottom: 12, border: "3px solid #f3f3f3", background: "#eee", alignSelf: "center" }}>
            <img src={getImageSrc()} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={handleImageError} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <h3 style={{ fontWeight: 700, fontSize: "clamp(14px, 4vw, 18px)", color: "#222", margin: 0 }}>{member.name}</h3>
            {member.status === "inactive" && <div style={{ color: "#555", fontSize: "clamp(12px, 3vw, 14px)" }}>{member.team}</div>}
            <div style={{ color: "#666", fontSize: "clamp(10px, 2.5vw, 12px)" }}>
              {member.status === "active" ? <span>{member.from} - present</span> : <span>{member.from} - {member.to}</span>}
            </div>
          </div>
        </div>
        {/* Back Side - Social links */}
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backfaceVisibility: "hidden", background: "#fff", borderRadius: 24, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20, textAlign: "center", transform: "rotateY(180deg)" }}>
          <div style={{ width: "clamp(120px, 70%, 160px)", height: "clamp(120px, 70%, 160px)", borderRadius: "50%", overflow: "hidden", marginBottom: 12, border: "3px solid #f3f3f3", background: "#eee", filter: "blur(6px)", position: "relative", alignSelf: "center" }}>
            <img src={getImageSrc()} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={handleImageError} />
          </div>
          <div style={{ display: "flex", flexDirection: "row", gap: 18, justifyContent: "center" }}>
            <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#0077b5" }} onClick={(e) => e.stopPropagation()}>
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="8" fill="#0077b5" />
                <path d="M10.667 13.333h2.666v8h-2.666v-8zm1.333-4a1.333 1.333 0 110 2.667 1.333 1.333 0 010-2.667zm3.333 4h2.56v1.093h.037c.357-.677 1.23-1.393 2.533-1.393 2.707 0 3.2 1.787 3.2 4.107v4.193h-2.667v-3.733c0-.893-.017-2.04-1.24-2.04-1.24 0-1.427.967-1.427 1.967v3.806h-2.667v-8z" fill="#fff" />
              </svg>
            </a>
            <a href={emailUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#E90000" }} onClick={(e) => e.stopPropagation()}>
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="8" fill="#E90000" />
                <path d="M8 12.667V20c0 .733.6 1.333 1.333 1.333h13.334A1.333 1.333 0 0024 20v-7.333a1.333 1.333 0 00-1.333-1.334H9.333A1.333 1.333 0 008 12.667zm2.133-.667l5.2 4.133a1.333 1.333 0 001.6 0l5.2-4.133" fill="#fff" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
