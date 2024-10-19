import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventInput } from "@fullcalendar/core";
import { useQuery } from "@apollo/client";
import { GET_ALL_CALENDER } from "../graphql/queries/queries";
import { CalendarType } from "../graphql/__generated__/graphql";

const EventCalendar: React.FC = () => {
  const calendarRef = useRef<FullCalendar | null>(null);
  const { data, loading, error } = useQuery(GET_ALL_CALENDER);

  const [events, setEvents] = useState<EventInput[]>([]);
  const [timezone, setTimezone] = useState<string>("local");
  const [theme, setTheme] = useState<string>("light");

  useEffect(() => {
    if (loading) return;

    if (error) {
      console.error("Error fetching calendars:", error.message);
      return;
    }

    if (data && data.getAllCalendars) {
      const fetchedEvents: EventInput[] = data.getAllCalendars.map(
        (event: CalendarType) => ({
          id: event._id,
          title: event.title,
          start: new Date(parseInt(event.startDate)).toISOString(),
          end: event.endDate
            ? new Date(parseInt(event.endDate)).toISOString()
            : undefined,
          allDay: event.allDay,
          url: event.url || undefined, // Ensure it resolves to undefined instead of null
          backgroundColor: event.backgroundColor || undefined,
          borderColor: event.borderColor || undefined,
        })
      );

      setEvents(fetchedEvents);
    }
  }, [data, loading, error]);

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

  const handleTimezoneChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTimezone(e.target.value);
  };

  const handleThemeToggle = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div
      className={`p-5 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}
    >
      <div className="text-end">
        <button
          onClick={handleThemeToggle}
          className="px-4 py-2 mb-5 text-white bg-indigo-600 rounded-full"
        >
          Toggle {theme === "light" ? "Dark" : "Light"} Theme
        </button>
      </div>
      <br />
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
