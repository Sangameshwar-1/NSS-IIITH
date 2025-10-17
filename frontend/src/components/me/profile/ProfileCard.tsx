"use client";

import { useState } from "react";
import styles from "./ProfileCard.module.css";
import { updateMember, type MemberUpdateInput } from "@/graphql_Q&M/updateMember";

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

interface ProfileCardProps {
  member: Member;
  isOwnProfile: boolean;
}

export default function ProfileCard({ member, isOwnProfile }: ProfileCardProps) {
  const [activeTab, setActiveTab] = useState<"about" | "activity" | "settings">("about");
  const [isEditing, setIsEditing] = useState(false);
  const [editedMember, setEditedMember] = useState<Member>(member);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: "success" | "error", text: string } | null>(null);

  const handleEdit = () => {
    setIsEditing(true);
    setActiveTab("settings");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedMember(member);
    setSaveMessage(null);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setSaveMessage(null);

      // Prepare the data for the mutation
      const updateData: MemberUpdateInput = {
        id: editedMember.id,
        name: editedMember.name,
        email: editedMember.email,
        rollNumber: editedMember.rollNumber,
        role: editedMember.role,
        year: editedMember.year,
        department: editedMember.department,
        team: editedMember.team,
        status: editedMember.status,
        start: editedMember.start,
        end: editedMember.end,
        photoUrl: editedMember.photoUrl,
        phone: editedMember.phone,
        linkedin: editedMember.linkedin,
        github: editedMember.github,
        bio: editedMember.bio,
        achievements: editedMember.achievements,
        interests: editedMember.interests,
      };

      await updateMember(updateData);
      
      setSaveMessage({ type: "success", text: "Profile updated successfully!" });
      setIsEditing(false);
      
      // Reload the page after a short delay to show the updated data
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Error saving profile:", error);
      setSaveMessage({ type: "error", text: "Failed to update profile. Please try again." });
    } finally {
      setSaving(false);
    }
  };

  const handleFieldChange = (field: keyof Member, value: any) => {
    setEditedMember(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayFieldChange = (field: "achievements" | "interests", value: string) => {
    // Split by newlines or commas
    const array = value.split(/[\n,]+/).map(item => item.trim()).filter(item => item.length > 0);
    setEditedMember(prev => ({ ...prev, [field]: array }));
  };

  const displayMember = isEditing ? editedMember : member;

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <div className={styles.profileImage}>
          <img src={displayMember.photoUrl || "/favicon.ico"} alt={displayMember.name} />
        </div>
        <div className={styles.profileInfo}>
          <h1>{displayMember.name}</h1>
          <p className={styles.role}>{displayMember.role || "Member"}</p>
          <div className={styles.details}>
            <span>{displayMember.year || "N/A"}</span>
            <span>•</span>
            <span>{displayMember.department || "N/A"}</span>
          </div>
        </div>
        {isOwnProfile && !isEditing && (
          <button className={styles.editButton} onClick={handleEdit}>Edit Profile</button>
        )}
        {isOwnProfile && isEditing && (
          <div style={{ display: "flex", gap: "10px" }}>
            <button className={styles.saveButton} onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </button>
            <button className={styles.cancelButton} onClick={handleCancel} disabled={saving}>
              Cancel
            </button>
          </div>
        )}
      </div>

      {saveMessage && (
        <div className={saveMessage.type === "success" ? styles.successMessage : styles.errorMessage}>
          {saveMessage.text}
        </div>
      )}

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "about" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("about")}
        >
          About
        </button>
        <button
          className={`${styles.tab} ${activeTab === "activity" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("activity")}
        >
          Activity
        </button>
        {isOwnProfile && (
          <button
            className={`${styles.tab} ${activeTab === "settings" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            Settings
          </button>
        )}
      </div>

      <div className={styles.tabContent}>
        {activeTab === "about" && (
          <div className={styles.aboutSection}>
            <div className={styles.bioSection}>
              <h3>Bio</h3>
              <p>{displayMember.bio || "No bio available"}</p>
            </div>

            <div className={styles.contactSection}>
              <h3>Contact Information</h3>
              <div className={styles.contactGrid}>
                <div className={styles.contactItem}>
                  <strong>Email:</strong>
                  <a href={`mailto:${displayMember.email}`}>{displayMember.email}</a>
                </div>
                {displayMember.phone && (
                  <div className={styles.contactItem}>
                    <strong>Phone:</strong>
                    <span>{displayMember.phone}</span>
                  </div>
                )}
                {displayMember.linkedin && (
                  <div className={styles.contactItem}>
                    <strong>LinkedIn:</strong>
                    <a href={displayMember.linkedin} target="_blank" rel="noopener noreferrer">
                      View Profile
                    </a>
                  </div>
                )}
                {displayMember.github && (
                  <div className={styles.contactItem}>
                    <strong>GitHub:</strong>
                    <a href={displayMember.github} target="_blank" rel="noopener noreferrer">
                      View Profile
                    </a>
                  </div>
                )}
              </div>
            </div>

            {displayMember.achievements && displayMember.achievements.length > 0 && (
              <div className={styles.achievementsSection}>
                <h3>Achievements</h3>
                <ul>
                  {displayMember.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>
            )}

            {displayMember.interests && displayMember.interests.length > 0 && (
              <div className={styles.interestsSection}>
                <h3>Interests</h3>
                <div className={styles.interestTags}>
                  {displayMember.interests.map((interest, index) => (
                    <span key={index} className={styles.interestTag}>
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "activity" && (
          <div className={styles.activitySection}>
            <h3>Recent Activity</h3>
            <p>Activity feed coming soon...</p>
          </div>
        )}

        {activeTab === "settings" && isOwnProfile && (
          <div className={styles.settingsSection}>
            <h3>Profile Settings</h3>
            {isEditing ? (
              <div className={styles.editForm}>
                <div className={styles.formGroup}>
                  <label>Name</label>
                  <input
                    type="text"
                    value={editedMember.name}
                    onChange={(e) => handleFieldChange("name", e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Role</label>
                  <input
                    type="text"
                    value={editedMember.role || ""}
                    onChange={(e) => handleFieldChange("role", e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Bio</label>
                  <textarea
                    rows={4}
                    value={editedMember.bio || ""}
                    onChange={(e) => handleFieldChange("bio", e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Phone</label>
                  <input
                    type="text"
                    value={editedMember.phone || ""}
                    onChange={(e) => handleFieldChange("phone", e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>LinkedIn URL</label>
                  <input
                    type="url"
                    value={editedMember.linkedin || ""}
                    onChange={(e) => handleFieldChange("linkedin", e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>GitHub URL</label>
                  <input
                    type="url"
                    value={editedMember.github || ""}
                    onChange={(e) => handleFieldChange("github", e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Achievements (one per line)</label>
                  <textarea
                    rows={4}
                    value={editedMember.achievements?.join("\n") || ""}
                    onChange={(e) => handleArrayFieldChange("achievements", e.target.value)}
                    placeholder="Enter achievements, one per line"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Interests (one per line)</label>
                  <textarea
                    rows={4}
                    value={editedMember.interests?.join("\n") || ""}
                    onChange={(e) => handleArrayFieldChange("interests", e.target.value)}
                    placeholder="Enter interests, one per line"
                  />
                </div>
              </div>
            ) : (
              <p>Click "Edit Profile" to update your information.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
