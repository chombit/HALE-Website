import { useRef } from "react";
import "./ContactHeader.css";
import { useState } from "react";
import { useEffect } from "react";
export default function ContactHeader() {
  const contactH1 = useRef()
  const [visible, setVisible] = useState(false)

  useEffect(function(){
    const observer = new IntersectionObserver((entries)=>{
      const entry = entries[0]
      if(entry.isIntersecting){
        setVisible(true)
      }
    })
    observer.observe(contactH1.current)
  },[])

  return (
    <div className="contact-header">
      <h1 className={visible ? "visible" : ""} ref={contactH1}>Contact Us</h1>
    </div>
  );
}
