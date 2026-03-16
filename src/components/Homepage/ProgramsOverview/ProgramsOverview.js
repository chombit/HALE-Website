import { useEffect, useRef, useState } from "react";
import "./ProgramsOverview.css";
import { useNavigate } from "react-router-dom";
export default function ProgramsOverview() {
  const [visible, setVisible] = useState(false);
  const programsParagraph = useRef();
  const programsButton = useRef()
  const navigate = useNavigate()
  useEffect(function () {
    const programsObserver = new IntersectionObserver((entries) => {
      const entry = entries[0];
      console.log(entry);
      if (entry.isIntersecting) {
          setVisible(true);
      }
    });
    programsObserver.observe(programsButton.current)
    programsObserver.observe(programsParagraph.current);
  }, []);
  return (
    <div className="programs-overview">
      <p className={`${visible ? "visible" : ""}`} ref={programsParagraph}>
        Our organization provides different services for different communities
        with various needs.
      </p>
      <button onClick={()=>(navigate("/programs"))} className={`${visible ? "visible" : ""}`} ref={programsButton}>Find out more about our services</button>
      <img
        src="https://i.postimg.cc/Fsvhd40w/programs-overview-pic.jpg"
        alt=""
      />
    </div>
  );
}
