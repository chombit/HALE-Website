import { useEffect, useRef, useState } from "react";
export default function Resource({ resource }) {
  const resourceRef = useRef();
  const [visible, setVisible] = useState(false);
  useEffect(function () {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      {
        threshold: [0.2, 1],
      }
    );
    observer.observe(resourceRef.current);
  }, []);
  return (
    <div ref={resourceRef} className={`resource ${visible ? "visible" : ""}`}>
      <div>
        <h2>{resource.name}</h2>
        <a href={resource.path} download={true}>
          Download
        </a>
      </div>
      <div>
        <img src={resource.imgPath} alt="" />
      </div>
    </div>
  );
}
