import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../../hooks/GeneralContext";
import Team from "./Team";
import "./TeamList.css";

export default function TeamList() {
  const [teams, setTeams] = useState([]);

  useEffect(function () {
    fetch(`${API_BASE_URL}/team.php`)
      .then((res) => res.json())
      .then((data) => setTeams(data.members || []))
      .catch((err) => console.error("Failed to fetch team:", err));
  }, []);

  return (
    <div className="team-list">
      {teams.map((team, index) => (
        <Team team={team} key={team.id} />
      ))}
    </div>
  );
}
