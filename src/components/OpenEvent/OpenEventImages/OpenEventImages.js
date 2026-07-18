import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../../../hooks/GeneralContext";
import "./OpenEventImages.css";

export default function OpenEventImages() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();

  useEffect(function () {
    fetch(`${API_BASE_URL}/events.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => setEvent(data))
      .catch((err) => console.error("Failed to fetch event:", err));
  }, [id]);

  if (!event || !event.images) return null;

  return (
    <div className="events-images">
      <button onClick={() => navigate(-1)}>Back to Events</button>
      <h1>{event.title ? event.title : ""}</h1>
      <div className="selected-image">
        <img src={event.images[currentImage]} alt="" key={currentImage} />
      </div>
      <div className="all-images">
        {event.images.map((img, i) => (
          <img
            className={`${currentImage === i ? "current" : ""}`}
            onClick={() => setCurrentImage(i)}
            src={img}
            alt="images"
            key={i}
          />
        ))}
      </div>
    </div>
  );
}
