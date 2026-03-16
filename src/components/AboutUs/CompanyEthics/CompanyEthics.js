import { useEffect, useRef, useState } from "react";
import "./CompanyEthics.css";
export default function CompanyEthics() {
  const vision = useRef();
  const mission = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(function () {
    const ethicsObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      {
        threshold: [0.6, 1],
      }
    );
    ethicsObserver.observe(vision.current);
    ethicsObserver.observe(mission.current);
  }, []);

  return (
    <div className="company-values">
      <div ref={vision} className={`${visible ? "visible" : ""} value`}>
        <div>
          <h2>Vision</h2>
          <hr />
          <p>
            To build a just and inclusive society where every individual enjoys
            equal rights, opportunities, and the power to contribute to
            sustainable development, democratic governance, and a diverse
            future.
          </p>
        </div>
      </div>
      <div ref={mission} className={`${visible ? "visible" : ""} value`}>
        <div>
          <h2>Mission</h2>
          <hr />
          <p>
            To advance human rights and foster inclusion by advocating for
            policy reforms, equality, and the protection of rights while
            empowering marginalized communities. We promote access to justice,
            democracy, and good governance through free legal aid, research,
            advocacy, education, and civic engagement, working toward a just and
            equitable society.
          </p>
        </div>
      </div>
    </div>
  );
}
