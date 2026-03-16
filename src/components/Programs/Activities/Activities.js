import { useEffect, useRef, useState } from "react";
import "./activities.css";

function Activities({
  title,
  img,
  details,
  selectedProgram,
  setSelectedProgram,
  index,
}) {
  const activityRef = useRef()
  const [visible, setVisible] = useState(false)
  useEffect(function(){
    const observer = new IntersectionObserver((entries)=>{
      const entry = entries[0]
      if(entry.isIntersecting){
        setVisible(true)
      }
    }, {
      threshold: [0.1, 1]
    })
    observer.observe(activityRef.current)
  },[])
  return (
    <div ref={activityRef} className={`activity ${visible ? "visible" : ""}`}>
      {selectedProgram !== index ? (
        <div className="see-less">
          <div className="img">
            <img src={img} alt="human rights-img" />
          </div>
          <div className="title">
            <h2>{title}</h2>
          </div>
          <div className="button">
            <button onClick={() => setSelectedProgram(index)}>See More</button>
          </div>
        </div>
      ) : (
        <div className="see-more">
          <div className="detail">
            <ul>
              <li>
                <p>{details.d1}</p>
              </li>
              {details.d2 === "" ? (
                ""
              ) : (
                <li>
                  <p>{details.d2}</p>
                </li>
              )}
            </ul>
          </div>
          <div className="button">
            <button onClick={() => setSelectedProgram(null)}>See Less</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Activities;
