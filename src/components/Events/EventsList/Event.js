import { Link } from "react-router-dom";

export default function Event({ event }) {
  let shortName =
    event.title.length > 40
      ? event.title.slice(0, 40) + "..."
      : event.title;
  return (
    <div className="event">
      <img src={event.images && event.images[0] ? event.images[0] : ""} alt="" />
      <h1>{shortName}</h1>
      <Link to={`/events/${event.id}`}>Read More</Link>
    </div>
  );
}
