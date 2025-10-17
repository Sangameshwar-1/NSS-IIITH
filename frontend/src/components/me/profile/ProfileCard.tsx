"use client";

import { useState } from "react";
import styles from "./ProfileCard.module.css";

interface Member {
  id: string;
  name: string;
  role: string;
  year: string;
  department: string;
  email: string;
  phone: string;
  linkedin?: string;
  github?: string;
  bio: string;
  achievements?: string[];
  interests?: string[];
}

interface ProfileCardProps {
  member: Member;
  isOwnProfile: boolean;
}

export default function ProfileCard({ member, isOwnProfile }: ProfileCardProps) {
  const [activeTab, setActiveTab] = useState<"about" | "activity" | "settings">("about");

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <div className={styles.profileImage}>
          <img src="/favicon.ico" alt={member.name} />
        </div>
        <div className={styles.profileInfo}>
          <h1>{member.name}</h1>
          <p className={styles.role}>{member.role}</p>
          <div className={styles.details}>
            <span>{member.year}</span>
            <span>•</span>
            <span>{member.department}</span>
          </div>
        </div>
        {isOwnProfile && (
          <button className={styles.editButton}>Edit Profile</button>
        )}
      </div>

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
              <p>{member.bio}</p>
            </div>

            <div className={styles.contactSection}>
              <h3>Contact Information</h3>
              <div className={styles.contactGrid}>
                <div className={styles.contactItem}>
                  <strong>Email:</strong>
                  <a href={`mailto:${member.email}`}>{member.email}</a>
                </div>
                <div className={styles.contactItem}>
                  <strong>Phone:</strong>
                  <span>{member.phone}</span>
                </div>
                {member.linkedin && (
                  <div className={styles.contactItem}>
                    <strong>LinkedIn:</strong>
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                      View Profile
                    </a>
                  </div>
                )}
                {member.github && (
                  <div className={styles.contactItem}>
                    <strong>GitHub:</strong>
                    <a href={member.github} target="_blank" rel="noopener noreferrer">
                      View Profile
                    </a>
                  </div>
                )}
              </div>
            </div>

            {member.achievements && member.achievements.length > 0 && (
              <div className={styles.achievementsSection}>
                <h3>Achievements</h3>
                <ul>
                  {member.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>
            )}

            {member.interests && member.interests.length > 0 && (
              <div className={styles.interestsSection}>
                <h3>Interests</h3>
                <div className={styles.interestTags}>
                  {member.interests.map((interest, index) => (
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
            <p>Settings panel coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
}
