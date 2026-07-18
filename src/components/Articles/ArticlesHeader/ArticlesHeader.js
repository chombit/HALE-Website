import { useEffect, useRef, useState } from "react";
import "./ArticlesHeader.css";

export default function ArticlesHeader() {
  const headerRef = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(function () {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setVisible(true);
      }
    });
    observer.observe(headerRef.current);
  }, []);

  return (
    <div className="articles-header">
      <h1 className={visible ? "visible" : ""} ref={headerRef}>
        Articles
      </h1>
      <p>Insights, updates, and stories from HALE-HRIN</p>
      <hr />
    </div>
  );
}
