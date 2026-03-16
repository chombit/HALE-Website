import { useEffect, useRef, useState } from "react";
import ContactsList from "../ContactsList/ContactsList";
import MapContainer from "../MapContainer/MapContainer";
import "./ContactOptions.css";
export default function ContactOptions() {
  const contactH1 = useRef()
  const [contH1Visible, setcontH1Visible] = useState(false)
  useEffect(function(){
    const observer = new IntersectionObserver((entries)=>{
      const entry = entries[0]
      if(entry.isIntersecting){
        setcontH1Visible(true)
      }
    })
    observer.observe(contactH1.current)
  },[])
  return (
    <div className="contact-options">
      <h1 className={contH1Visible ? "visible" : ""} ref={contactH1}>Contact Us</h1>
      <hr />
      <div className="contact-container">
        <ContactsList />
        <MapContainer />
      </div>
    </div>
  );
}
