import { useEffect, useRef, useState } from "react";
import "./CompanyDesctiption.css";
export default function CompanyDescription() {
  const divRef = useRef();
  const [visible, setVisible] = useState(false);
  useEffect(function () {
    const descriptionObserver = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setVisible(true);
      }
    });
    descriptionObserver.observe(divRef.current);
  }, []);
  return (
    <div
      ref={divRef}
      className={`company-description ${visible ? "visible" : ""}`}>
      <h3>Who We Are</h3>
      <hr />
      <p>
        HALE-Human Rights and Inclusion Network (H-HRIN) is a youth-led civil
        society organization in Ethiopia dedicated to advancing human rights,
        fostering inclusion, and contributing to the achievement of the
        Sustainable Development Goals (SDGs). Guided by principles of justice,
        empowerment, and equality, we work to ensure marginalized and vulnerable
        communities have access to justice, equal rights, and opportunities.
      </p>
      <p>
        We advocate for policy reforms and inclusive policies that promote
        gender equality, climate justice, child rights, disability inclusion,
        and sexual and reproductive health rights (SRHR). Our work also
        addresses labor rights, cultural rights, environmental sustainability,
        democracy, good governance, and peacebuilding through civic engagement.
      </p>
      <p>
        With a dedicated team of professionals, activists, and advocates, we
        provide free legal aid, conduct research, and lead awareness and
        advocacy efforts to drive systemic change. By collaborating with local
        and global partners, we aim to build a just, inclusive society where
        human rights are upheld, and the SDGs are realized.
      </p>
    </div>
  );
}
