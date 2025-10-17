import React, { useState } from "react";

const carouselImages = [
  "/carosel-imgs/1.jpeg",
  "/carosel-imgs/2.jpg",
  "/carosel-imgs/3.jpg"
];

const sampleEvents = [
  {
    name: "Orientation Program",
    startTime: "2025-08-27T10:00:00Z",
    endTime: "2025-08-27T12:00:00Z",
    location: "Main Auditorium",
    description: "Welcome event for new members",
    image: carouselImages[0],
  },
  {
    name: "Workshop on AI",
    startTime: "2025-09-05T14:00:00Z",
    endTime: "2025-09-05T17:00:00Z",
    location: "Lab 3",
    description: "Hands-on session on AI tools",
    image: carouselImages[1],
  },
  {
    name: "Annual Meetup",
    startTime: "2025-10-10T09:00:00Z",
    endTime: "2025-10-10T18:00:00Z",
    location: "Conference Hall",
    description: "Yearly gathering of all NSS members",
    image: carouselImages[2],
  },
  {
    name: "Blood Donation Camp",
    startTime: "2025-10-10T09:00:00Z",
    endTime: "2025-09-10T13:00:00Z",
    location: "Medical Center",
    description: "Donate blood and save lives.",
    image: carouselImages[0],
  },
  {
    name: "Clean Campus Drive",
    startTime: "2025-08-30T08:00:00Z",
    endTime: "2025-08-30T11:00:00Z",
    location: "Campus Grounds",
    description: "Join us to keep our campus clean.",
    image: carouselImages[1],
  },
  {
    name: "Coding Marathon",
    startTime: "2025-09-01T18:00:00Z",
    endTime: "2025-09-01T23:00:00Z",
    location: "Lab 1",
    description: "Test your coding skills in a 5-hour marathon.",
    image: carouselImages[2],
  },
  {
    name: "Yoga Session",
    startTime: "2025-08-25T07:00:00Z",
    endTime: "2025-08-25T08:30:00Z",
    location: "Sports Complex",
    description: "Relax and rejuvenate with yoga.",
    image: carouselImages[0],
  },
  {
    name: "Guest Lecture: Dr. Rao",
    startTime: "2025-09-10T16:00:00Z",
    endTime: "2025-09-10T18:00:00Z",
    location: "Seminar Hall",
    description: "Lecture on sustainable development.",
    image: carouselImages[1],
  },
  {
    name: "Photography Contest",
    startTime: "2025-08-28T10:00:00Z",
    endTime: "2025-08-28T17:00:00Z",
    location: "Auditorium",
    description: "Showcase your photography skills.",
    image: carouselImages[2],
  },
];

function formatDateIndian(dateStr: string) {
  const d = new Date(dateStr);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

interface EventGridProps {
  selectedDate: Date;
}

const EventGrid: React.FC<EventGridProps> = ({ selectedDate }) => {
  const [search, setSearch] = useState("");


  function getEventStatus(event: any) {
    const today = new Date();
    const start = new Date(event.startTime);
    const end = new Date(event.endTime);
    if (today >= start && today <= end) return "ongoing";
    if (start > today) return "upcoming";
    if (end < today) return "past";
    return "unknown";
  }


  // Use sample data
  const events = sampleEvents;
  // Filter by search
  const filteredEvents = events.filter((event: any) =>
    event.name.toLowerCase().includes(search.toLowerCase())
  );
  // Filter by selected date (show events that start or end on selected date)
  const selectedDateStr = selectedDate.toISOString().slice(0, 10);
  const eventsOnSelectedDate = filteredEvents.filter((event: any) => {
    const start = event.startTime.slice(0, 10);
    const end = event.endTime.slice(0, 10);
    return selectedDateStr >= start && selectedDateStr <= end;
  });

  const ongoingEvents = filteredEvents.filter((e: any) => getEventStatus(e) === "ongoing");
  const upcomingEvents = filteredEvents.filter((e: any) => getEventStatus(e) === "upcoming");
  const pastEvents = filteredEvents.filter((e: any) => getEventStatus(e) === "past");

  const renderSection = (title: string, events: any[], columns: number = 3) => (
    <div style={{ width: "100%", marginBottom: "2rem" }}>
      <h2 style={{ fontWeight: 600, fontSize: "1.3rem", margin: "2rem 0 1rem 0", color: "#222" }}>{title}</h2>
      <div style={{
        borderBottom: "1px solid #eee",
        marginBottom: "1.5rem"
      }}></div>
      <div style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: "2rem",
        justifyContent: "center",
        alignItems: "stretch",
        width: "100%",
        boxSizing: "border-box",
        overflowX: "hidden"
      }}>
        {events.length === 0 ? (
          <div style={{ gridColumn: "1/-1", textAlign: "center", color: "#888", fontSize: "1.2rem" }}>No events found.</div>
        ) : (
          events.map((event: any, idx: number) => (
            <div
              key={idx}
              style={{
                background: "#fff", //#e0b4a877
                borderRadius: "16px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "1.5rem 1rem",
                transition: "transform 0.3s, box-shadow 0.3s",
                cursor: "pointer"
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "scale(1.04)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 24px rgba(124,58,237,0.18)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.08)";
              }}
            >
              {event.image && (
                <img src={event.image} alt={event.name} style={{ width: "100%", maxWidth: 420, height: "220px", objectFit: "cover", borderRadius: "12px", marginBottom: "1rem", transition: "transform 0.3s" }} />
              )}
              <h3 style={{ margin: "1rem 0 0.5rem 0", fontSize: "1.2rem", color: "#222", textAlign: "center" }}>{event.name}</h3>
              <div style={{ color: "#7c3aed", fontWeight: 500, marginBottom: "0.5rem" }}>{formatDateIndian(event.startTime)} - {formatDateIndian(event.endTime)}</div>
              <p style={{ color: "#444", fontSize: "1rem", textAlign: "center" }}>{event.description}</p>
              <div style={{ color: "#888", fontSize: "0.9rem", marginTop: "0.5rem" }}>{event.location}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );



  return (
    <div style={{
      width: "100%",
      marginTop: "2rem",
      paddingLeft: "5vw",
      paddingRight: "5vw",
      boxSizing: "border-box",
      overflowX: "hidden"
    }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            padding: "0.75rem 1rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "1rem",
            width: "320px",
            marginRight: "1rem"
          }}
        />
        <button style={{
          padding: "0.75rem 1.5rem",
          borderRadius: "8px",
          background: "#7c3aed",
          color: "#fff",
          border: "none",
          fontWeight: 600,
          fontSize: "1rem",
          cursor: "pointer"
        }}>Search</button>
      </div>
      {/* Only render the sections, not the selected date box here */}
      {renderSection("Ongoing Events", ongoingEvents)}
      {renderSection("Upcoming Events", upcomingEvents)}
      {renderSection("Past Events", pastEvents)}
    </div>
  );
};
export default EventGrid;
