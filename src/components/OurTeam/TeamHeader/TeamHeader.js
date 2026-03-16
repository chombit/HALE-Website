import { useEffect, useRef, useState } from "react";
import "./TeamHeader.css";
export default function TeamHeader() {
  const teamH1 = useRef();
  const [visible, setVisible] = useState(false);
  useEffect(function () {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setVisible(true);
      }
    });
    observer.observe(teamH1.current);
  }, []);
  return (
    <div className="team-header">
      <h1 className={visible ? "visible" : ""} ref={teamH1}>
        Our Team Members
      </h1>
      <hr></hr>
    </div>
  );
}
