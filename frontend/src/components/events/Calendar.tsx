"use client";
import React, { useState, useEffect } from "react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

interface CalendarProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, setSelectedDate }) => {
  const [today, setToday] = useState<{ year: number; month: number; date: number } | null>(null);
  const [currentMonth, setCurrentMonth] = useState<number>(0);
  const [currentYear, setCurrentYear] = useState<number>(0);

  useEffect(() => {
    const now = new Date();
    setToday({ year: now.getFullYear(), month: now.getMonth(), date: now.getDate() });
    setCurrentMonth(selectedDate.getMonth());
    setCurrentYear(selectedDate.getFullYear());
  }, []);

  useEffect(() => {
    setCurrentMonth(selectedDate.getMonth());
    setCurrentYear(selectedDate.getFullYear());
  }, [selectedDate]);

  if (!today) return null;

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  const prevMonth = () => {
    let newMonth = currentMonth - 1;
    let newYear = currentYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear = currentYear - 1;
    }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
    setSelectedDate(new Date(newYear, newMonth, 1));
  };

  const nextMonth = () => {
    let newMonth = currentMonth + 1;
    let newYear = currentYear;
    if (newMonth > 11) {
      newMonth = 0;
      newYear = currentYear + 1;
    }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
    setSelectedDate(new Date(newYear, newMonth, 1));
  };

  const handleDateClick = (day: number) => {
    setSelectedDate(new Date(currentYear, currentMonth, day));
  };

  return (
    <div style={{ background: "#222", color: "#fff", padding: "2rem", borderRadius: "12px", maxWidth: 400, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <button onClick={prevMonth} style={{ background: "#ff2d2d", color: "#fff", border: "none", borderRadius: 4, padding: "0.3rem 1rem", cursor: "pointer" }}>&lt;</button>
        <span style={{ fontSize: "1.2rem", fontWeight: 500 }}>
          {months[currentMonth]} {currentYear}
        </span>
        <button onClick={nextMonth} style={{ background: "#ff2d2d", color: "#fff", border: "none", borderRadius: 4, padding: "0.3rem 1rem", cursor: "pointer" }}>&gt;</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "0.5rem" }}>
        {daysOfWeek.map(day => (
          <div key={day} style={{ fontWeight: 600, textAlign: "center" }}>{day}</div>
        ))}
        {Array(firstDay).fill(null).map((_, idx) => (
          <div key={"empty-" + idx}></div>
        ))}
        {Array(daysInMonth).fill(null).map((_, idx) => {
          const day = idx + 1;
          const isToday = day === today.date && currentMonth === today.month && currentYear === today.year;
          const isSelected = day === selectedDate.getDate() && currentMonth === selectedDate.getMonth() && currentYear === selectedDate.getFullYear();
          let bg = "#333";
          if (isSelected) bg = "#ff2d2d";
          else if (isToday) bg = "#0074D9";
          return (
            <div
              key={idx}
              onClick={() => handleDateClick(day)}
              style={{
                textAlign: "center",
                padding: "0.5rem 0",
                borderRadius: 4,
                background: bg,
                cursor: "pointer",
                color: isSelected ? "#fff" : isToday ? "#fff" : "#fff",
                border: isSelected ? "2px solid #ff2d2d" : isToday ? "2px solid #0074D9" : "none"
              }}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
