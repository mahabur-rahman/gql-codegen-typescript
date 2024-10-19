import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventInput } from "@fullcalendar/core";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_CALENDER } from "../graphql/queries/queries";
import { CREATE_CALENDER } from "../graphql/mutations/mutations"; // Import the mutation
import { CalendarType } from "../graphql/__generated__/graphql";
import { Modal, Form, Input, DatePicker, Switch } from "antd"; // Import Ant Design components

const EventCalendar: React.FC = () => {
  const calendarRef = useRef<FullCalendar | null>(null);
  const { data, loading, error } = useQuery(GET_ALL_CALENDER);
  
  const [createCalendar] = useMutation(CREATE_CALENDER); // Use mutation hook
  const [events, setEvents] = useState<EventInput[]>([]);
  const [timezone, setTimezone] = useState<string>("local");
  const [theme, setTheme] = useState<string>("light");
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const onFinish = async (values: any) => {
    try {
      const { data: newEventData } = await createCalendar({
        variables: {
          title: values.title,
          desc: values.description,
          startDate: values.start.format(),
          endDate: values.end ? values.end.format() : values.start.format(),
          allDay: values.allDay,
          url: values.url || "", // Optional URL field
          backgroundColor: values.backgroundColor,
          borderColor: values.textColor,
        },
      });

      const newEvent = {
        id: newEventData.createCalendar._id,
        title: newEventData.createCalendar.title,
        start: newEventData.createCalendar.startDate,
        end: newEventData.createCalendar.endDate,
        allDay: newEventData.createCalendar.allDay,
        backgroundColor: newEventData.createCalendar.backgroundColor,
        borderColor: newEventData.createCalendar.borderColor,
        extendedProps: {
          description: newEventData.createCalendar.desc || "",
        },
      };

      setEvents((prevEvents) => [...prevEvents, newEvent]);
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error creating calendar event:", error);
    }
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
            <p>{eventInfo.event.extendedProps.description}</p>
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
