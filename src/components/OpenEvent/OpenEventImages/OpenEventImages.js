import { useContext, useState } from "react";
import "./OpenEventImages.css";
import { GeneralContext } from "../../../hooks/GeneralContext";
import { useNavigate, useParams } from "react-router-dom";
export default function OpenEventImages() {
  const { events } = useContext(GeneralContext);
  const { index } = useParams();
  const [currentImage, setCurrentImage] = useState(0)
  const navigate = useNavigate()

  return (
    <div className="events-images">
      <button onClick={()=>(navigate(-1))}>Back to Events</button>
      <h1>{events[index].name ? events[index].name : ""}</h1>
      <div className="selected-image">
        <img src={events[index].images[currentImage]} alt="" key={currentImage} />
      </div>
      <div className="all-images">
        {events[index].images.map((img, i) => (
          <>
            <img className={`${currentImage === i ? "current" : ""}`} onClick={()=>(setCurrentImage(i))} src={img} alt="images" key={i} />
          </>
        ))}
      </div>
    </div>
  );
}
