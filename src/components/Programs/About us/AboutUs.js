import { useNavigate } from "react-router-dom";
import "./AboutUs.css";
export default function AboutUs() {
  const navigate = useNavigate()
  return (
    <div className="about-us">
      <div className="about-us-img">
        <img src="./assets/AboutUs/learnmore-img.jpg" alt="learn more" />
      </div>

      <div className="about-us-detail">
        <h1>Find out more</h1>
        <div className="link">
          <p onClick={()=>(navigate("/aboutus"))}>Learn More About Our Mission and What We Do</p>
          <p onClick={()=>(navigate("/team"))} >To Learn More About Our Team</p>
          <p onClick={()=>(navigate("/contact"))}>Contact Us</p>
        </div>
      </div>
    </div>
  );
}
