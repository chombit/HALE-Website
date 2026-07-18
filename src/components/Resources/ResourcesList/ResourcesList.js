import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../../hooks/GeneralContext";
import Resource from "./Resource";
import "./ResourcesList.css";

export default function ResourcesList() {
  const [resources, setResources] = useState([]);

  useEffect(function () {
    fetch(`${API_BASE_URL}/resources.php`)
      .then((res) => res.json())
      .then((data) => setResources(data.resources || []))
      .catch((err) => console.error("Failed to fetch resources:", err));
  }, []);

  return (
    <div className="resources-list">
      {resources.map((resource) => (
        <Resource resource={resource} key={resource.id} />
      ))}
    </div>
  );
}
