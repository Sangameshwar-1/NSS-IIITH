"use client";

import { useState, useEffect } from "react";
import {
  getAllMembers,
  addMember,
  updateMember,
  deleteMember,
  getAllEvents,
  addEvent,
  updateEvent,
  deleteEvent,
} from "@/graphql_Q&M/admin";
import Navbar from "@/utils/Navbar";

type Member = {
  id: string;
  name: string;
  email: string;
  rollNumber?: string;
  role?: string;
  year?: string;
  department?: string;
  team: string;
  status: string;
  start?: string;
  end?: string;
  photoUrl?: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  bio?: string;
  achievements?: string[];
  interests?: string[];
};

type Event = {
  name: string;
  startTime: string;
  endTime: string;
  location: string;
  description?: string;
  eventHead?: {
    id: string;
    name: string;
    email: string;
  };
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"members" | "events">("members");
  const [members, setMembers] = useState<Member[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // Check if user is admin
  const [isAdmin, setIsAdmin] = useState(false);
  const [uid, setUid] = useState<string | null>(null);

  // Member form state
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [showMemberForm, setShowMemberForm] = useState(false);

  // Event form state
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [showEventForm, setShowEventForm] = useState(false);

  useEffect(() => {
    // Check authentication and admin status
    const match = document.cookie.match(/(?:^|; )uid=([^;]*)/);
    const username = match ? decodeURIComponent(match[1]) : null;
    setUid(username);

    if (!username) {
      setError("Please login to access admin dashboard");
      setLoading(false);
      return;
    }

    // Check if user is admin by fetching their member data
    checkAdminStatus(username);
  }, []);

  const checkAdminStatus = async (username: string) => {
    try {
      const allMembers = await getAllMembers();
      const user = allMembers.find((m: Member) => m.id === username);
      
      if (user && user.team === "ADMIN") {
        setIsAdmin(true);
        loadData();
      } else {
        setError("Access Denied: You are not an administrator");
        setLoading(false);
      }
    } catch (err) {
      setError("Failed to verify admin status");
      setLoading(false);
    }
  };

  const loadData = async () => {
    try {
      setLoading(true);
      const [membersData, eventsData] = await Promise.all([
        getAllMembers(),
        getAllEvents(),
      ]);
      setMembers(membersData);
      setEvents(eventsData);
      setError("");
    } catch (err) {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = () => {
    setEditingMember({
      id: "",
      name: "",
      email: "",
      team: "VOLUNTEER",
      status: "ACTIVE",
    } as Member);
    setShowMemberForm(true);
  };

  const handleEditMember = (member: Member) => {
    setEditingMember({ ...member });
    setShowMemberForm(true);
  };

  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;

    try {
      setLoading(true);
      // Check if this is a new member or update
      const isNewMember = !members.find(m => m.id === editingMember.id);
      
      if (isNewMember) {
        await addMember(editingMember);
        setSuccess("Member added successfully!");
      } else {
        await updateMember(editingMember);
        setSuccess("Member updated successfully!");
      }
      
      setShowMemberForm(false);
      setEditingMember(null);
      await loadData();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to save member");
      setTimeout(() => setError(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMember = async (id: string) => {
    if (!confirm(`Are you sure you want to delete member ${id}?`)) return;

    try {
      setLoading(true);
      await deleteMember(id);
      setSuccess("Member deleted successfully!");
      await loadData();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to delete member");
      setTimeout(() => setError(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEvent = () => {
    setEditingEvent({
      name: "",
      startTime: "",
      endTime: "",
      location: "",
      description: "",
    });
    setShowEventForm(true);
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent({ ...event });
    setShowEventForm(true);
  };

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent) return;

    try {
      setLoading(true);
      const isNewEvent = !events.find(ev => ev.name === editingEvent.name);
      
      if (isNewEvent) {
        await addEvent(editingEvent);
        setSuccess("Event added successfully!");
      } else {
        await updateEvent(editingEvent);
        setSuccess("Event updated successfully!");
      }
      
      setShowEventForm(false);
      setEditingEvent(null);
      await loadData();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to save event");
      setTimeout(() => setError(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (name: string) => {
    if (!confirm(`Are you sure you want to delete event "${name}"?`)) return;

    try {
      setLoading(true);
      await deleteEvent(name);
      setSuccess("Event deleted successfully!");
      await loadData();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to delete event");
      setTimeout(() => setError(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  if (!uid) {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
        <Navbar />
        <div style={{ padding: "2rem", textAlign: "center", color: "#fff", paddingTop: "100px" }}>
          <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>⚠️ Please Login</h1>
          <p>You need to be logged in to access the admin dashboard.</p>
          <button
            onClick={() => window.location.href = "http://localhost:8000/login"}
            style={{
              marginTop: "1rem",
              padding: "0.75rem 1.5rem",
              background: "#fff",
              color: "#667eea",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  if (!isAdmin && !loading) {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
        <Navbar />
        <div style={{ padding: "2rem", textAlign: "center", color: "#fff", paddingTop: "100px" }}>
          <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>🚫 Access Denied</h1>
          <p>{error || "You do not have permission to access this page."}</p>
          <button
            onClick={() => window.location.href = "/"}
            style={{
              marginTop: "1rem",
              padding: "0.75rem 1.5rem",
              background: "#fff",
              color: "#667eea",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f5f7fa" }}>
      <Navbar />
      
      <div style={{ padding: "2rem", maxWidth: "1400px", margin: "0 auto", paddingTop: "100px" }}>
        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          padding: "2rem",
          borderRadius: "12px",
          color: "#fff",
          marginBottom: "2rem",
        }}>
          <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🛠️ Admin Dashboard</h1>
          <p style={{ opacity: 0.9 }}>Manage members and events</p>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div style={{
            padding: "1rem",
            background: "#10b981",
            color: "#fff",
            borderRadius: "8px",
            marginBottom: "1rem",
          }}>
            ✓ {success}
          </div>
        )}
        {error && (
          <div style={{
            padding: "1rem",
            background: "#ef4444",
            color: "#fff",
            borderRadius: "8px",
            marginBottom: "1rem",
          }}>
            ✗ {error}
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
          <button
            onClick={() => setActiveTab("members")}
            style={{
              padding: "0.75rem 1.5rem",
              background: activeTab === "members" ? "#667eea" : "#fff",
              color: activeTab === "members" ? "#fff" : "#667eea",
              border: `2px solid #667eea`,
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "1rem",
            }}
          >
            👥 Members ({members.length})
          </button>
          <button
            onClick={() => setActiveTab("events")}
            style={{
              padding: "0.75rem 1.5rem",
              background: activeTab === "events" ? "#667eea" : "#fff",
              color: activeTab === "events" ? "#fff" : "#667eea",
              border: `2px solid #667eea`,
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "1rem",
            }}
          >
            📅 Events ({events.length})
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "#667eea" }}>
            <div style={{ fontSize: "2rem" }}>⏳</div>
            <p>Loading...</p>
          </div>
        ) : activeTab === "members" ? (
          <MembersTab
            members={members}
            onAdd={handleAddMember}
            onEdit={handleEditMember}
            onDelete={handleDeleteMember}
          />
        ) : (
          <EventsTab
            events={events}
            onAdd={handleAddEvent}
            onEdit={handleEditEvent}
            onDelete={handleDeleteEvent}
          />
        )}

        {/* Member Form Modal */}
        {showMemberForm && editingMember && (
          <MemberForm
            member={editingMember}
            onChange={setEditingMember}
            onSave={handleSaveMember}
            onCancel={() => {
              setShowMemberForm(false);
              setEditingMember(null);
            }}
          />
        )}

        {/* Event Form Modal */}
        {showEventForm && editingEvent && (
          <EventForm
            event={editingEvent}
            onChange={setEditingEvent}
            onSave={handleSaveEvent}
            onCancel={() => {
              setShowEventForm(false);
              setEditingEvent(null);
            }}
          />
        )}
      </div>
    </div>
  );
}

// Members Tab Component
function MembersTab({ members, onAdd, onEdit, onDelete }: any) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTeam, setFilterTeam] = useState<string>("ALL");

  const filteredMembers = members.filter((member: Member) => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTeam = filterTeam === "ALL" || member.team === filterTeam;
    return matchesSearch && matchesTeam;
  });

  return (
    <div>
      {/* Controls */}
      <div style={{
        background: "#fff",
        padding: "1.5rem",
        borderRadius: "12px",
        marginBottom: "1rem",
        display: "flex",
        gap: "1rem",
        flexWrap: "wrap",
      }}>
        <input
          type="text"
          placeholder="🔍 Search members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            minWidth: "200px",
            padding: "0.75rem",
            border: "2px solid #e5e7eb",
            borderRadius: "8px",
            fontSize: "1rem",
          }}
        />
        <select
          value={filterTeam}
          onChange={(e) => setFilterTeam(e.target.value)}
          style={{
            padding: "0.75rem",
            border: "2px solid #e5e7eb",
            borderRadius: "8px",
            fontSize: "1rem",
          }}
        >
          <option value="ALL">All Teams</option>
          <option value="ADMIN">Admin</option>
          <option value="TECH">Tech</option>
          <option value="DESIGN">Design</option>
          <option value="CONTENT">Content</option>
          <option value="LOGISTICS">Logistics</option>
          <option value="VOLUNTEER">Volunteer</option>
        </select>
        <button
          onClick={onAdd}
          style={{
            padding: "0.75rem 1.5rem",
            background: "#10b981",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "1rem",
          }}
        >
          ➕ Add Member
        </button>
      </div>

      {/* Members Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "1rem",
      }}>
        {filteredMembers.map((member: Member) => (
          <div
            key={member.id}
            style={{
              background: "#fff",
              padding: "1.5rem",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "1rem" }}>
              <div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.25rem" }}>{member.name}</h3>
                <p style={{ fontSize: "0.9rem", color: "#6b7280", marginBottom: "0.5rem" }}>@{member.id}</p>
              </div>
              <span style={{
                padding: "0.25rem 0.75rem",
                background: member.team === "ADMIN" ? "#ef4444" : "#667eea",
                color: "#fff",
                borderRadius: "12px",
                fontSize: "0.75rem",
                fontWeight: 600,
              }}>
                {member.team}
              </span>
            </div>
            
            <div style={{ marginBottom: "1rem", fontSize: "0.9rem", color: "#374151" }}>
              <p>📧 {member.email}</p>
              {member.rollNumber && <p>🎓 {member.rollNumber}</p>}
              {member.role && <p>👔 {member.role}</p>}
              <p>📊 {member.status}</p>
            </div>

            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                onClick={() => onEdit(member)}
                style={{
                  flex: 1,
                  padding: "0.5rem",
                  background: "#3b82f6",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                }}
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => onDelete(member.id)}
                style={{
                  flex: 1,
                  padding: "0.5rem",
                  background: "#ef4444",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                }}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div style={{ textAlign: "center", padding: "3rem", color: "#6b7280" }}>
          No members found
        </div>
      )}
    </div>
  );
}

// Events Tab Component
function EventsTab({ events, onAdd, onEdit, onDelete }: any) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents = events.filter((event: Event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Controls */}
      <div style={{
        background: "#fff",
        padding: "1.5rem",
        borderRadius: "12px",
        marginBottom: "1rem",
        display: "flex",
        gap: "1rem",
      }}>
        <input
          type="text"
          placeholder="🔍 Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            padding: "0.75rem",
            border: "2px solid #e5e7eb",
            borderRadius: "8px",
            fontSize: "1rem",
          }}
        />
        <button
          onClick={onAdd}
          style={{
            padding: "0.75rem 1.5rem",
            background: "#10b981",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "1rem",
          }}
        >
          ➕ Add Event
        </button>
      </div>

      {/* Events List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {filteredEvents.map((event: Event) => (
          <div
            key={event.name}
            style={{
              background: "#fff",
              padding: "1.5rem",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 600, marginBottom: "0.5rem" }}>{event.name}</h3>
                <p style={{ color: "#6b7280", marginBottom: "1rem" }}>{event.description}</p>
                
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.5rem", fontSize: "0.9rem", color: "#374151" }}>
                  <p>📍 {event.location}</p>
                  <p>🕒 {new Date(event.startTime).toLocaleString()}</p>
                  <p>🕒 {new Date(event.endTime).toLocaleString()}</p>
                  {event.eventHead && <p>👤 Head: {event.eventHead.name}</p>}
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.5rem", marginLeft: "1rem" }}>
                <button
                  onClick={() => onEdit(event)}
                  style={{
                    padding: "0.5rem 1rem",
                    background: "#3b82f6",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                  }}
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => onDelete(event.name)}
                  style={{
                    padding: "0.5rem 1rem",
                    background: "#ef4444",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                  }}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div style={{ textAlign: "center", padding: "3rem", color: "#6b7280" }}>
          No events found
        </div>
      )}
    </div>
  );
}

// Member Form Component
function MemberForm({ member, onChange, onSave, onCancel }: any) {
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
      padding: "1rem",
    }}>
      <div style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "2rem",
        maxWidth: "600px",
        width: "100%",
        maxHeight: "90vh",
        overflow: "auto",
      }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>
          {member.id && member.id !== "" ? "Edit Member" : "Add New Member"}
        </h2>

        <form onSubmit={onSave}>
          <div style={{ display: "grid", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Username (ID) *</label>
              <input
                type="text"
                value={member.id}
                onChange={(e) => onChange({ ...member, id: e.target.value })}
                required
                placeholder="firstname.lastname"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "2px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "1rem",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Name *</label>
              <input
                type="text"
                value={member.name}
                onChange={(e) => onChange({ ...member, name: e.target.value })}
                required
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "2px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "1rem",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Email *</label>
              <input
                type="email"
                value={member.email}
                onChange={(e) => onChange({ ...member, email: e.target.value })}
                required
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "2px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "1rem",
                }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Team *</label>
                <select
                  value={member.team}
                  onChange={(e) => onChange({ ...member, team: e.target.value })}
                  required
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "2px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "1rem",
                  }}
                >
                  <option value="ADMIN">Admin</option>
                  <option value="TECH">Tech</option>
                  <option value="DESIGN">Design</option>
                  <option value="CONTENT">Content</option>
                  <option value="LOGISTICS">Logistics</option>
                  <option value="VOLUNTEER">Volunteer</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Status *</label>
                <select
                  value={member.status}
                  onChange={(e) => onChange({ ...member, status: e.target.value })}
                  required
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "2px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "1rem",
                  }}
                >
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Roll Number</label>
              <input
                type="text"
                value={member.rollNumber || ""}
                onChange={(e) => onChange({ ...member, rollNumber: e.target.value })}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "2px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "1rem",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Role</label>
              <input
                type="text"
                value={member.role || ""}
                onChange={(e) => onChange({ ...member, role: e.target.value })}
                placeholder="President, Vice President, etc."
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "2px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "1rem",
                }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Year</label>
                <input
                  type="text"
                  value={member.year || ""}
                  onChange={(e) => onChange({ ...member, year: e.target.value })}
                  placeholder="1st Year, 2nd Year, etc."
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "2px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "1rem",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Department</label>
                <input
                  type="text"
                  value={member.department || ""}
                  onChange={(e) => onChange({ ...member, department: e.target.value })}
                  placeholder="CSE, ECE, etc."
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "2px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "1rem",
                  }}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>
                  Start Date 📅
                </label>
                <input
                  type="text"
                  value={member.start || ""}
                  onChange={(e) => onChange({ ...member, start: e.target.value })}
                  placeholder="2024 (year they joined)"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "2px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "1rem",
                  }}
                />
                <small style={{ color: "#6b7280", fontSize: "0.85rem" }}>
                  Year they started working with NSS
                </small>
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>
                  End Date 📅
                </label>
                <input
                  type="text"
                  value={member.end || ""}
                  onChange={(e) => onChange({ ...member, end: e.target.value })}
                  placeholder="2025 or _ for current"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "2px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "1rem",
                  }}
                />
                <small style={{ color: "#6b7280", fontSize: "0.85rem" }}>
                  Use "_" or "present" for current members
                </small>
              </div>
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Phone</label>
              <input
                type="tel"
                value={member.phone || ""}
                onChange={(e) => onChange({ ...member, phone: e.target.value })}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "2px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "1rem",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>LinkedIn</label>
              <input
                type="url"
                value={member.linkedin || ""}
                onChange={(e) => onChange({ ...member, linkedin: e.target.value })}
                placeholder="https://linkedin.com/in/..."
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "2px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "1rem",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>GitHub</label>
              <input
                type="url"
                value={member.github || ""}
                onChange={(e) => onChange({ ...member, github: e.target.value })}
                placeholder="https://github.com/..."
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "2px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "1rem",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Photo URL</label>
              <input
                type="url"
                value={member.photoUrl || ""}
                onChange={(e) => onChange({ ...member, photoUrl: e.target.value })}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "2px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "1rem",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Bio</label>
              <textarea
                value={member.bio || ""}
                onChange={(e) => onChange({ ...member, bio: e.target.value })}
                rows={3}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "2px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  resize: "vertical",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>
                Achievements 🏆
              </label>
              <textarea
                value={member.achievements?.join('\n') || ""}
                onChange={(e) => onChange({ 
                  ...member, 
                  achievements: e.target.value.split('\n').filter(line => line.trim() !== '')
                })}
                rows={4}
                placeholder="Enter achievements, one per line&#10;Example:&#10;Won Hackathon 2024&#10;Published research paper&#10;Led 5+ successful events"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "2px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  resize: "vertical",
                }}
              />
              <small style={{ color: "#6b7280", fontSize: "0.85rem" }}>
                One achievement per line
              </small>
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>
                Interests 💡
              </label>
              <textarea
                value={member.interests?.join('\n') || ""}
                onChange={(e) => onChange({ 
                  ...member, 
                  interests: e.target.value.split('\n').filter(line => line.trim() !== '')
                })}
                rows={4}
                placeholder="Enter interests, one per line&#10;Example:&#10;Web Development&#10;AI/ML&#10;Community Service&#10;Photography"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "2px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  resize: "vertical",
                }}
              />
              <small style={{ color: "#6b7280", fontSize: "0.85rem" }}>
                One interest per line
              </small>
            </div>
          </div>

          <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: "0.75rem",
                background: "#10b981",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "1rem",
              }}
            >
              💾 Save
            </button>
            <button
              type="button"
              onClick={onCancel}
              style={{
                flex: 1,
                padding: "0.75rem",
                background: "#6b7280",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "1rem",
              }}
            >
              ❌ Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Event Form Component
function EventForm({ event, onChange, onSave, onCancel }: any) {
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
      padding: "1rem",
    }}>
      <div style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "2rem",
        maxWidth: "600px",
        width: "100%",
        maxHeight: "90vh",
        overflow: "auto",
      }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>
          {event.name && event.name !== "" ? "Edit Event" : "Add New Event"}
        </h2>

        <form onSubmit={onSave}>
          <div style={{ display: "grid", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Event Name *</label>
              <input
                type="text"
                value={event.name}
                onChange={(e) => onChange({ ...event, name: e.target.value })}
                required
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "2px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "1rem",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Location *</label>
              <input
                type="text"
                value={event.location}
                onChange={(e) => onChange({ ...event, location: e.target.value })}
                required
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "2px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "1rem",
                }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Start Time *</label>
                <input
                  type="datetime-local"
                  value={event.startTime}
                  onChange={(e) => onChange({ ...event, startTime: e.target.value })}
                  required
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "2px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "1rem",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>End Time *</label>
                <input
                  type="datetime-local"
                  value={event.endTime}
                  onChange={(e) => onChange({ ...event, endTime: e.target.value })}
                  required
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "2px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "1rem",
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Description</label>
              <textarea
                value={event.description || ""}
                onChange={(e) => onChange({ ...event, description: e.target.value })}
                rows={4}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "2px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  resize: "vertical",
                }}
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: "0.75rem",
                background: "#10b981",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "1rem",
              }}
            >
              💾 Save
            </button>
            <button
              type="button"
              onClick={onCancel}
              style={{
                flex: 1,
                padding: "0.75rem",
                background: "#6b7280",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "1rem",
              }}
            >
              ❌ Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
