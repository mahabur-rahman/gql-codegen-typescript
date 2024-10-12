import { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const EventCalender = () => {
  const calendarRef = useRef(null);

  const [events, setEvents] = useState([
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
    { title: "Click for Google", url: "http://google.com/", start: "2024-10-28" },
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
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        eventColor="#378006" 
      />
    </div>
  );
};

export default EventCalender;
