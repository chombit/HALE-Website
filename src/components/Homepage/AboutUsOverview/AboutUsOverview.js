import { useEffect, useRef, useState } from "react";
import "./AboutUsOverview.css";
import { useNavigate } from "react-router-dom";
export default function AboutUsOverview() {
  const navigate = useNavigate()
  const txtDiv = useRef()
  const imgRef = useRef()
  const [visible, setVisible] = useState(false)

  useEffect(function(){
    const aboutUsObserver = new IntersectionObserver((entries)=>{
      const entry = entries[0]
      if(entry.isIntersecting){
        setVisible(true)
      }
    })
    aboutUsObserver.observe(imgRef.current)
    aboutUsObserver.observe(txtDiv.current)
  },[])

  return (
    <div className="about-overview">
      <div className={visible ? "visible" : ""} ref={txtDiv}>
        <h1>HALE</h1>
        <p>
          HALE: Human Rights and Inclusion Network is a civil society
          organization based in Ethiopia, dedicated to advancing human rights,
          promoting gender equality, ensuring children's rights, fostering
          disability inclusion, and supporting environmental sustainability. Our
          aim is to create a just and equitable society where marginalized
          and vulnerable communities are empowered and their voices are heard.
          We are committed to addressing human rights violations, promoting good
          governance, and fostering a culture of inclusion through research,
          public interest litigation, civic engagement, and advocacy.
        </p>
        <p onClick={()=>(navigate("/aboutus"))} className="learn-more">Read More</p>
      </div>
      <img className={visible ? "visible" : ""} ref={imgRef} src="https://i.postimg.cc/G2sbY37n/about-overview-pic.jpg" alt="" />
    </div>
  );
}
