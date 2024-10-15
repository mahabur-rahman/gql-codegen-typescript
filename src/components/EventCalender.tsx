import React, { useState, useRef, ChangeEvent } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventInput } from "@fullcalendar/core";

const EventCalendar: React.FC = () => {
  const calendarRef = useRef<FullCalendar | null>(null);

  const timezones: string[] = [
    "local",
    "UTC",
    "America/New_York",
    "Europe/London",
    "Asia/Tokyo",
    "Australia/Sydney",
    "Africa/Cairo",
    "Asia/Dubai",
  ];

  const [timezone, setTimezone] = useState<string>("local");
  const [theme, setTheme] = useState<string>("light");

  const [events, setEvents] = useState<EventInput[]>([
    { title: "All Day Event", start: "2024-10-01", allDay: true },
    {
      title: "Long Event",
      start: "2024-10-06",
      end: "2024-10-08",
    },
    { title: "Repeating Event", start: "2024-10-09T16:00:00" },
    { title: "Repeating Event", start: "2024-10-16T16:00:00" },
    { title: "Conference", start: "2024-10-11", allDay: true },
    { title: "Meeting", start: "2024-10-11T10:30:00" },
    { title: "Lunch", start: "2024-10-11T12:00:00" },
    { title: "Meeting", start: "2024-10-11T14:30:00" },
    { title: "Birthday Party", start: "2024-10-07T07:00:00" },
    {
      title: "Click for Google",
      url: "http://google.com/",
      start: "2024-10-28",
      backgroundColor: "#ff0000",
      borderColor: "#ffcc00",
    },
  ]);

  // Handle timezone change
  const handleTimezoneChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTimezone(e.target.value);
  };

  // Toggle between light and dark theme
  const handleThemeToggle = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className={`p-5 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
      {/* Theme Toggle Button */}
     <div className="text-end"> <button
        onClick={handleThemeToggle}
        className="px-4 py-2 mb-5 text-white bg-indigo-600 rounded-full"
      >
        Toggle {theme === "light" ? "Dark" : "Light"} Theme
      </button></div>
<br />
      {/* Dropdown to select timezone */}
      <label className="mr-2">Select Timezone: </label>
      <select
        value={timezone}
        onChange={handleTimezoneChange}
        className={`p-2 mb-5 ${theme === "dark" ? "bg-gray-700 text-white" : "bg-slate-200 text-black"}`}
      >
        {timezones.map((zone, index) => (
          <option key={index} value={zone}>
            {zone}
          </option>
        ))}
      </select>

      {/* FullCalendar Component */}
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        timeZone={timezone}
        editable={true}
        selectable={true}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        themeSystem={theme === "dark" ? "bootstrap" : "standard"}
      />
    </div>
  );
};

export default EventCalendar;
