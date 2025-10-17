"use client";
import React, { useState } from "react";
import Carousel from "@/utils/Carousel";
import Footer from "@/utils/Footer";
import Navbar from "@/utils/Navbar";
import Calendar from "@/components/events/Calendar";
import EventGrid from "@/components/events/EventGrid";

// Sample events (same as EventGrid)
const sampleEvents = [
  {
    name: "Orientation Program",
    startTime: "2025-08-27T10:00:00Z",
    endTime: "2025-08-27T12:00:00Z",
    location: "Main Auditorium",
    description: "Welcome event for new members",
  },
  {
    name: "Workshop on AI",
    startTime: "2025-09-05T14:00:00Z",
    endTime: "2025-09-05T17:00:00Z",
    location: "Lab 3",
    description: "Hands-on session on AI tools",
  },
  {
    name: "Annual Meetup",
    startTime: "2025-10-10T09:00:00Z",
    endTime: "2025-10-10T18:00:00Z",
    location: "Conference Hall",
    description: "Yearly gathering of all NSS members",
  },
  {
    name: "Blood Donation Camp",
    startTime: "2025-10-10T09:00:00Z",
    endTime: "2025-09-10T13:00:00Z",
    location: "Medical Center",
    description: "Donate blood and save lives.",
  },
  {
    name: "Clean Campus Drive",
    startTime: "2025-08-30T08:00:00Z",
    endTime: "2025-08-30T11:00:00Z",
    location: "Campus Grounds",
    description: "Join us to keep our campus clean.",
  },
  {
    name: "Coding Marathon",
    startTime: "2025-09-01T18:00:00Z",
    endTime: "2025-09-01T23:00:00Z",
    location: "Lab 1",
    description: "Test your coding skills in a 5-hour marathon.",
  },
  {
    name: "Yoga Session",
    startTime: "2025-08-25T07:00:00Z",
    endTime: "2025-08-25T08:30:00Z",
    location: "Sports Complex",
    description: "Relax and rejuvenate with yoga.",
  },
  {
    name: "Guest Lecture: Dr. Rao",
    startTime: "2025-09-10T16:00:00Z",
    endTime: "2025-09-10T18:00:00Z",
    location: "Seminar Hall",
    description: "Lecture on sustainable development.",
  },
  {
    name: "Photography Contest",
    startTime: "2025-08-28T10:00:00Z",
    endTime: "2025-08-28T17:00:00Z",
    location: "Auditorium",
    description: "Showcase your photography skills.",
  },
];


const images = [
  "/carosel-imgs/1.jpeg",
  "/carosel-imgs/2.jpg",
  "/carosel-imgs/3.jpg"
];
const heading = "NSS EVENTS";

function formatDateIndian(dateStr: string) {
  const d = new Date(dateStr);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

export default function EventsPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  React.useEffect(() => {
    setSelectedDate(new Date());
  }, []);

  // Helper to get events for a given date
  function getEventsForDate(date: Date) {
    const dateStr = date.toISOString().slice(0, 10);
    return sampleEvents.filter(event => {
      const start = event.startTime.slice(0, 10);
      return dateStr === start;
    });
  }

  // Show today's events initially, or selected date's events
  const eventsToShow = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <div style={{
      margin: 0,
      padding: 0,
      boxSizing: "border-box",
      width: "100vw",
      minHeight: "100vh",
      overflowX: "hidden",
      top: 0,
      left: 0,
      background: "#FAEBE8"
    }}>
      <div style={{ position: "relative", zIndex: 2 }}>
        <Carousel images={images} interval={3000} heading={heading}>
        </Carousel>
          <Navbar />
      </div>
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "flex-start", gap: "2rem", padding: "2rem" }}>
        <div style={{ flex: "0 0 400px" }}>
          {selectedDate && <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />}
        </div>
        <div style={{ flex: "0 0 350px", background: "#222", color: "#fff", borderRadius: "18px", minHeight: "320px", padding: "2rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start" }}>
          <h2 style={{ marginBottom: "1rem" }}>{selectedDate ? formatDateIndian(selectedDate.toISOString()) : ""}</h2>
          {!selectedDate ? (
            <div style={{ color: "#bbb", fontSize: "1.1rem", textAlign: "center" }}>Loading...</div>
          ) : eventsToShow.length === 0 ? (
            <div style={{ color: "#bbb", fontSize: "1.1rem", textAlign: "center" }}>No events on this date.</div>
          ) : (
            eventsToShow.map((event, idx) => (
              <div key={idx} style={{ marginBottom: "1.5rem", width: "100%", textAlign: "center" }}>
                <div style={{ fontWeight: 700, fontSize: "1.2rem", marginBottom: "0.5rem" }}>{event.name}</div>
                <div style={{ color: "#7c3aed", fontWeight: 500, marginBottom: "0.5rem" }}>
                  {formatDateIndian(event.startTime)} - {formatDateIndian(event.endTime)}
                </div>
                <div style={{ color: "#fff", fontSize: "1rem" }}>{event.location}</div>
              </div>
            ))
          )}
        </div>
      </div>
      <div style={{ width: "100%", marginTop: "2rem" }}>
        {selectedDate && <EventGrid selectedDate={selectedDate} />}
      </div>
      <Footer />
    </div>
  );
}
