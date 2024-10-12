import { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const EventCalender = () => {
  const calendarRef = useRef(null);

  // List of timezones
  const timezones = [
    "local", 
    "UTC", 
    "America/New_York", 
    "Europe/London", 
    "Asia/Tokyo", 
    "Australia/Sydney"
  ];

  // Default timezone state
  const [timezone, setTimezone] = useState("local");

  const [events, setEvents] = useState([
    { title: "All Day Event", start: "2024-10-01", allDay: true },
    { title: "Long Event", start: "2024-10-06", end: "2024-10-08" },
    { title: "Repeating Event", start: "2024-10-09T16:00:00" },
    { title: "Repeating Event", start: "2024-10-16T16:00:00" },
    { title: "Conference", start: "2024-10-11", allDay: true },
    { title: "Meeting", start: "2024-10-11T10:30:00" },
    { title: "Lunch", start: "2024-10-11T12:00:00" },
    { title: "Meeting", start: "2024-10-11T14:30:00" },
    { title: "Birthday Party", start: "2024-10-07T07:00:00" },
    { title: "Click for Google", url: "http://google.com/", start: "2024-10-28" }
  ]);

  // Handle timezone change
  const handleTimezoneChange = (e) => {
    setTimezone(e.target.value);
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Timezone selection */}
      <label>Select Timezone: </label>
      <select value={timezone} onChange={handleTimezoneChange} className="p-3 mb-5 bg-slate-200">
        {timezones.map((zone, index) => (
          <option key={index} value={zone}>
            {zone}
          </option>
        ))}
      </select>

      {/* FullCalendar with dynamic timezone */}
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        timeZone={timezone}  // Dynamic timezone based on user selection
        editable={true}
        selectable={true}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
      />
    </div>
  );
};

export default EventCalender;
