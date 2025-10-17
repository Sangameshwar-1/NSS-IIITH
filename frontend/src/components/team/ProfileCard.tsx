"use client";
import React, { useState } from "react";

type Member = {
  name?: string;
  email?: string;
  photoUrl?: string;
  team?: string;
  rollNumber?: string;
  status?: string;
  start?: string;
  end?: string;
  from?: string;
  to?: string;
};

type ProfileCardProps = {
  member: Member;
  isOwnProfile?: boolean;
};

export default function ProfileCard({ member, isOwnProfile = false }: ProfileCardProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "activity" | "settings">("overview");
  const [isEditing, setIsEditing] = useState(false);
  
  const name = member.name ?? "Unknown";
  const email = member.email ?? "Not provided";
  const photo = member.photoUrl && member.photoUrl !== "hi" ? member.photoUrl : "/favicon.ico";
  const team = member.team ?? "-";
  const roll = member.rollNumber ?? "-";
  const status = member.status ?? (member.end || member.to ? "inactive" : "active");
  const from = member.start ?? member.from ?? "-";
  const to = member.end ?? member.to ?? "-";

  const isActive = status === "active";

  return (
    <div style={{ 
      width: "100%", 
      animation: "fadeIn 0.5s ease-in"
    }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .profile-tab {
          transition: all 0.3s ease;
        }
        .profile-tab:hover {
          transform: translateY(-2px);
        }
        .info-card {
          transition: all 0.3s ease;
        }
        .info-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
        }
        .edit-btn {
          transition: all 0.2s ease;
        }
        .edit-btn:hover {
          transform: scale(1.05);
        }
      `}</style>

      {/* Hero Section with Cover Photo */}
      <div style={{
        background: "linear-gradient(135deg, #1e3a8a 0%, #E90000 100%)",
        height: 180,
        borderRadius: "12px 12px 0 0",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"/%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"/%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.05\"/%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
          opacity: 0.3
        }}/>
      </div>

      {/* Profile Photo */}
      <div style={{ 
        position: "relative", 
        marginTop: -80, 
        paddingLeft: "clamp(1rem, 4vw, 2rem)",
        marginBottom: 24
      }}>
        <div style={{
          width: 160,
          height: 160,
          borderRadius: "50%",
          border: "6px solid #fff",
          overflow: "hidden",
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          background: "#fff",
          position: "relative"
        }}>
          <img 
            src={photo} 
            alt={name} 
            style={{ 
              width: "100%", 
              height: "100%", 
              objectFit: "cover" 
            }} 
          />
          {isActive && (
            <div style={{
              position: "absolute",
              bottom: 8,
              right: 8,
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: "#22c55e",
              border: "3px solid #fff",
              animation: "pulse 2s infinite"
            }} title="Active Member"/>
          )}
        </div>
      </div>

      {/* Header with Name and Actions */}
      <div style={{
        padding: "0 clamp(1rem, 4vw, 2rem)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexWrap: "wrap",
        gap: 16,
        marginBottom: 24
      }}>
        <div>
          <h1 style={{ 
            margin: 0, 
            fontSize: "clamp(24px, 4vw, 36px)", 
            fontWeight: 700,
            color: "#1a1a1a"
          }}>
            {name}
          </h1>
          <div style={{ 
            marginTop: 8, 
            fontSize: "clamp(14px, 2.5vw, 18px)",
            color: "#666",
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexWrap: "wrap"
          }}>
            <span style={{ 
              background: isActive ? "#dcfce7" : "#f3f4f6",
              color: isActive ? "#15803d" : "#6b7280",
              padding: "4px 12px",
              borderRadius: 20,
              fontSize: 14,
              fontWeight: 600
            }}>
              {status.toUpperCase()}
            </span>
            <span>•</span>
            <span style={{ fontWeight: 600 }}>{team} Team</span>
            <span>•</span>
            <span>{from} - {to}</span>
          </div>
        </div>

        {isOwnProfile && (
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="edit-btn"
            style={{
              padding: "12px 24px",
              borderRadius: 8,
              background: isEditing ? "#E90000" : "#1e3a8a",
              color: "#fff",
              border: "none",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: 14,
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        )}
      </div>

      {/* Tabs */}
      <div style={{
        borderBottom: "2px solid #e5e7eb",
        padding: "0 clamp(1rem, 4vw, 2rem)",
        display: "flex",
        gap: 32,
        marginBottom: 32
      }}>
        {(["overview", "activity", "settings"] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="profile-tab"
            style={{
              padding: "12px 0",
              background: "none",
              border: "none",
              borderBottom: activeTab === tab ? "3px solid #E90000" : "3px solid transparent",
              color: activeTab === tab ? "#E90000" : "#6b7280",
              fontWeight: 600,
              fontSize: 16,
              cursor: "pointer",
              textTransform: "capitalize",
              marginBottom: -2
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ padding: "0 clamp(1rem, 4vw, 2rem) 2rem" }}>
        {activeTab === "overview" && (
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", 
            gap: 20 
          }}>
            <div className="info-card" style={{ 
              background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)", 
              padding: 24, 
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
            }}>
              <div style={{ fontSize: 13, color: "#0369a1", fontWeight: 600, marginBottom: 8 }}>📧 EMAIL</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: "#0c4a6e", wordBreak: "break-word" }}>{email}</div>
            </div>

            <div className="info-card" style={{ 
              background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)", 
              padding: 24, 
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
            }}>
              <div style={{ fontSize: 13, color: "#92400e", fontWeight: 600, marginBottom: 8 }}>🎓 ROLL NUMBER</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: "#78350f" }}>{roll}</div>
            </div>

            <div className="info-card" style={{ 
              background: "linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)", 
              padding: 24, 
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
            }}>
              <div style={{ fontSize: 13, color: "#9f1239", fontWeight: 600, marginBottom: 8 }}>👥 TEAM</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: "#881337" }}>{team}</div>
            </div>

            <div className="info-card" style={{ 
              background: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)", 
              padding: 24, 
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
            }}>
              <div style={{ fontSize: 13, color: "#15803d", fontWeight: 600, marginBottom: 8 }}>📅 TENURE</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: "#166534" }}>{from} — {to}</div>
            </div>
          </div>
        )}

        {activeTab === "activity" && (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#9ca3af" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📊</div>
            <h3 style={{ margin: "0 0 8px 0", color: "#6b7280" }}>Activity Coming Soon</h3>
            <p style={{ margin: 0 }}>View events participated, volunteer hours, and achievements</p>
          </div>
        )}

        {activeTab === "settings" && (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#9ca3af" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>⚙️</div>
            <h3 style={{ margin: "0 0 8px 0", color: "#6b7280" }}>Settings Coming Soon</h3>
            <p style={{ margin: 0 }}>Manage your profile preferences and notifications</p>
          </div>
        )}
      </div>
    </div>
  );
}
