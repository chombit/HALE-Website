import { useContext, useEffect, useRef, useState } from "react";
import { GeneralContext } from "../../../hooks/GeneralContext";
import "./EventsList.css";
import Event from "./Event";
export default function EventsList() {
  const eventList = useRef();
  const [visible, setVisible] = useState(false);
  const { events } = useContext(GeneralContext);

  useEffect(function () {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setVisible(true);
      }
    });
    observer.observe(eventList.current)
  }, []);

  return (
    <div ref={eventList}  className={`events-list ${visible ? "visible" : ""}`}>
      {events.map((event, i) => (
        <Event event = {event} name={event.name} i={i} />
      ))}
    </div>
  );
}
