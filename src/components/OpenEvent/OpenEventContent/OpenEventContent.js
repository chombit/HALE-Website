import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../../../hooks/GeneralContext";
import "./OpenEventContent.css";

export default function OpenEventContent() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(function () {
    fetch(`${API_BASE_URL}/events.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => setEvent(data))
      .catch((err) => console.error("Failed to fetch event:", err));
  }, [id]);

  if (!event) return null;

  const description = event.description || "";
  const paragraphs = description
    .split("\n\n")
    .filter((p) => p.trim() !== "");

  return (
    <div className="open-event">
      {paragraphs.length > 0 ? (
        paragraphs.map((para, i) => <p key={i}>{para}</p>)
      ) : (
        <p>{description}</p>
      )}
    </div>
  );
}
