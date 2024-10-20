import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventInput } from "@fullcalendar/core"; // Correct import for EventInput
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_CALENDER } from "../graphql/queries/queries";
import {
  CREATE_CALENDER,
  UPDATE_CALENDER,
} from "../graphql/mutations/mutations";
import { CalendarType } from "../graphql/__generated__/graphql";
import { Modal, Form, Input, DatePicker, Switch } from "antd";
import { Moment } from "moment"; // Import Moment type for DatePicker
import { ApolloError } from "@apollo/client/errors";
import { EventDragStopArg } from "@fullcalendar/interaction"; // Import the correct type

interface FormValues {
  title: string;
  description: string;
  start: Moment;
  endDate?: Moment;
  allDay: boolean;
  url?: string;
  backgroundColor: string;
  textColor: string;
}

const EventCalendar: React.FC = () => {
  const calendarRef = useRef<FullCalendar | null>(null);
  const { data, loading, error } = useQuery(GET_ALL_CALENDER);
  const [createCalendar] = useMutation(CREATE_CALENDER, {
    refetchQueries: [{ query: GET_ALL_CALENDER }],
  });
  const [updateCalendar] = useMutation(UPDATE_CALENDER);

  const [events, setEvents] = useState<EventInput[]>([]);
  const [timezone, setTimezone] = useState<string>("local");
  const [theme, setTheme] = useState<string>("light");
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (loading || error) return;

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
            description: event.description || "",
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

  const handleEventDrop = async (
    eventInfo: EventDragStopArg
  ): Promise<void> => {
    const { event } = eventInfo;

    try {
      const startDate =
        event.start instanceof Date ? event.start.toISOString() : null;
      const endDate =
        event.end instanceof Date ? event.end.toISOString() : startDate;

      if (startDate && endDate) {
        await updateCalendar({
          variables: {
            id: event.id,
            startDate,
            endDate,
          },
        });
      } else {
        console.error("startDate or endDate is null");
      }
    } catch (error) {
      console.error("Error updating calendar event:", error);
    }
  };

  const onFinish = async (values: FormValues) => {
    try {
      const { data: newEventData } = await createCalendar({
        variables: {
          title: values.title,
          description: values.description,
          startDate: values.start.format(),
          endDate: values.endDate
            ? values.endDate.format()
            : values.start.format(),
          allDay: values.allDay,
          url: values.url || "",
          backgroundColor: values.backgroundColor,
          borderColor: values.textColor,
        },
      });

      const newEvent: EventInput = {
        id: newEventData?.createCalendar._id,
        title: newEventData?.createCalendar.title,
        start: newEventData?.createCalendar.startDate,
        endDate: newEventData?.createCalendar.endDate,
        allDay: newEventData?.createCalendar.allDay,
        backgroundColor: newEventData?.createCalendar?.backgroundColor || "",
        borderColor: newEventData?.createCalendar?.borderColor || "",
        extendedProps: {
          description: newEventData?.createCalendar.description || "", // Make sure 'description' exists in CalendarType
        },
      };

      setEvents((prevEvents) => [...prevEvents, newEvent]);
      setIsModalVisible(false);
    } catch (error: unknown) {
      const apolloError = error as ApolloError;
      console.error("Error creating calendar event:", apolloError.message);
    }
  };

  return (
    <div
      className={`p-5 ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
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
        className={`p-2 mb-5 ${
          theme === "dark"
            ? "bg-gray-700 text-white"
            : "bg-slate-200 text-black"
        }`}
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
        eventDrop={handleEventDrop} // <-- Add the eventDrop handler here
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
            rules={[
              { required: true, message: "Please input the event title!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input the event description!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="All Day" name="allDay" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item
            label="Start Date"
            name="start"
            rules={[
              { required: true, message: "Please select the start date!" },
            ]}
          >
            <DatePicker showTime />
          </Form.Item>
          <Form.Item label="End Date" name="end">
            <DatePicker showTime />
          </Form.Item>
          <Form.Item
            label="Background Color"
            name="backgroundColor"
            rules={[
              { required: true, message: "Please select a background color!" },
            ]}
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
            <button type="submit" className="ant-btn ant-btn-primary">
              Add Event
            </button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EventCalendar;
