import { useContext } from "react";
import { useParams } from "react-router-dom";
import { GeneralContext } from "../../../hooks/GeneralContext";
import "./OpenEventContent.css"
export default function OpenEventContent() {
  const { events } = useContext(GeneralContext);
  const { index } = useParams();
  
  return (
    <div className="open-event">     
      <h2>{events[index].description.p1.heading  ? events[index].description.p1.heading : ""}</h2>
      <p>{events[index].description.p1.content  ? events[index].description.p1.content : ""}</p>
      <h2>{events[index].description.p2.heading  ? events[index].description.p2.heading : ""}</h2>
      <p>{events[index].description.p2.content ? events[index].description.p2.content : ""}</p>
      <h2>{events[index].description.p3.heading ? events[index].description.p3.heading : ""}</h2>
      <p>{events[index].description.p3.content ? events[index].description.p3.content : ""}</p>
      <h2>{events[index].description.p4.heading ? events[index].description.p4.heading : ""}</h2>
      <p>{events[index].description.p4.content ? events[index].description.p4.content : ""}</p>
      <h2>{events[index].description.p5.heading ? events[index].description.p5.heading : ""}</h2>
      <p>{events[index].description.p5.content ? events[index].description.p5.content : ""}</p>
      <h2>{events[index].description.p6.heading ? events[index].description.p6.heading : ""}</h2>
      <p>{events[index].description.p6.content ? events[index].description.p6.content : ""}</p>
      <h2>{events[index].description.p7.heading ? events[index].description.p7.heading : ""}</h2>
      <p>{events[index].description.p7.content ? events[index].description.p7.content : ""}</p>
      {/* <h2>{events[index].description.p8.heading ? events[index].description.p8.heading : ""}</h2>
      <p>{events[index].description.p8.content ? events[index].description.p8.content : ""}</p>
      <h2>{events[index].description.p9.heading ? events[index].description.p9.heading : ""}</h2>
      <p>{events[index].description.p9.content ? events[index].description.p9.content : ""}</p>
      <h2>{events[index].description.p10.heading ? events[index].description.p10.heading : ""}</h2>
      <p>{events[index].description.p10.content ? events[index].description.p10.content : ""}</p> */}
    </div>
  );
}
