import { useEffect, useRef, useState } from "react";
import { API_BASE_URL } from "../../../hooks/GeneralContext";
import "./EventsList.css";
import Event from "./Event";

export default function EventsList() {
  const eventList = useRef();
  const [visible, setVisible] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(function () {
    fetch(`${API_BASE_URL}/events.php`)
      .then((res) => res.json())
      .then((data) => setEvents(data.events || []))
      .catch((err) => console.error("Failed to fetch events:", err));
  }, []);

  useEffect(function () {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setVisible(true);
      }
    });
    observer.observe(eventList.current);
  }, []);

  return (
    <div ref={eventList} className={`events-list ${visible ? "visible" : ""}`}>
      {events.map((event) => (
        <Event event={event} key={event.id} />
      ))}
    </div>
  );
}
