import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../../hooks/GeneralContext";
import "./OpenTeamContent.css";

export default function OpenTeamContent() {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const navigate = useNavigate();

  useEffect(function () {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  useEffect(function () {
    fetch(`${API_BASE_URL}/team.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => setMember(data))
      .catch((err) => console.error("Failed to fetch team member:", err));
  }, [id]);

  if (!member) return null;

  return (
    <div className="open-team-content">
      <button onClick={() => navigate("/team")}>Back to Teams</button>
      <div className="profile-pic">
        <img src={member.image} alt="" />
      </div>
      <div className="txt-container">
        <h1>{member.name}</h1>
        <h3>{member.position}</h3>
        {member.description &&
          member.description.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
      </div>
    </div>
  );
}
