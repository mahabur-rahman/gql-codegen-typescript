import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventInput } from "@fullcalendar/core";
import { useQuery } from "@apollo/client";
import { GET_ALL_CALENDER } from "../graphql/queries/queries";
import { CalendarType } from "../graphql/__generated__/graphql";
import { Modal, Form, Input, DatePicker, Switch } from "antd"; // Import Ant Design components

const EventCalendar: React.FC = () => {
  const calendarRef = useRef<FullCalendar | null>(null);
  const { data, loading, error } = useQuery(GET_ALL_CALENDER);

  const [events, setEvents] = useState<EventInput[]>([]);
  const [timezone, setTimezone] = useState<string>("local");
  const [theme, setTheme] = useState<string>("light");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [eventDetails, setEventDetails] = useState<{
    title: string;
    description: string;
    allDay: boolean;
    start: string;
    end?: string;
    backgroundColor: string;
    textColor: string;
  }>({
    title: "",
    description: "",
    allDay: false,
    start: "",
    end: "",
    backgroundColor: "#ffffff", // Default background color
    textColor: "#000000", // Default text color
  });

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
          backgroundColor: event.backgroundColor || undefined,
          borderColor: event.borderColor || undefined,
          // Use `extendedProps` to add custom fields like description
          extendedProps: {
            description: event.desc || "",
          },
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

  const handleEventAdd = () => {
    setIsModalVisible(true);
  };

  const onFinish = (values: any) => {
    const newEvent: EventInput = {
      id: String(new Date().getTime()),
      title: values.title,
      start: values.start.format(),
      end: values.end ? values.end.format() : undefined,
      allDay: values.allDay,
      backgroundColor: values.backgroundColor,
      borderColor: values.textColor,
      // Store description inside `extendedProps`
      extendedProps: {
        description: values.description || "",
      },
    };

    setEvents((prevEvents) => [...prevEvents, newEvent]);
    setIsModalVisible(false);
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
        <button
          onClick={handleEventAdd}
          className="px-4 py-2 mb-5 text-white bg-green-600 rounded-full"
        >
          Add Event
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
        eventContent={(eventInfo) => (
          <div>
            <b>{eventInfo.event.title}</b>
            <p>{eventInfo.event.extendedProps.description}</p> {/* Display description */}
          </div>
        )}
      />

      {/* Modal for adding new events */}
      <Modal
        title="Add New Event"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Event Title"
            name="title"
            rules={[{ required: true, message: "Please input the event title!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please input the event description!" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="All Day"
            name="allDay"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            label="Start Date"
            name="start"
            rules={[{ required: true, message: "Please select the start date!" }]}
          >
            <DatePicker showTime />
          </Form.Item>
          <Form.Item
            label="End Date"
            name="end"
          >
            <DatePicker showTime />
          </Form.Item>
          <Form.Item
            label="Background Color"
            name="backgroundColor"
            rules={[{ required: true, message: "Please select a background color!" }]}
          >
            <Input type="color" />
          </Form.Item>
          <Form.Item
            label="Text Color"
            name="textColor"
            rules={[{ required: true, message: "Please select a text color!" }]}
          >
            <Input type="color" />
          </Form.Item>
          <Form.Item>
            <button type="submit" className="ant-btn ant-btn-primary">Add Event</button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EventCalendar;
