import { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const EventCalender = () => {
  const calendarRef = useRef(null);

  const [events, setEvents] = useState([
    { title: "Event 1", start: "2024-10-17", backgroundColor: "#ff0000" },
    {
      title: "Conference",
      start: "2024-10-09",
      end: "2024-09-11",
      backgroundColor: "#00bfff",
    },
    {
      title: "Conference",
      start: "2024-10-09",
      end: "2024-09-11",
      backgroundColor: "#00bfff",
    },
    {
      title: "Conference",
      start: "2024-10-09",
      end: "2024-09-11",
      backgroundColor: "#00bfff",
    },
  ]);

  return (
    <div style={{ padding: "20px" }}>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        editable={true}
        selectable={true}
        headerToolbar={{
          left: "",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
      />
    </div>
  );
};

export default EventCalender;
