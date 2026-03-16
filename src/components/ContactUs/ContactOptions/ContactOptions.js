import { useEffect, useRef, useState } from "react";
import "./ContactOptions.css";
export default function ContactOptions() {
  const option1 = useRef()
  const option2 = useRef()
  const option3 = useRef()
  const [visible, setVisible] = useState(false)
  useEffect(function(){
      const observer = new IntersectionObserver((entries)=>{
        const entry = entries[0]
        if(entry.isIntersecting){
          setVisible(true)
        }
      })
      observer.observe(option1.current)
      observer.observe(option2.current)
      observer.observe(option3.current)
  },[])
  return (
    <div className="contact-options">
      <div ref={option1} className={`${visible ?"visible" : ""} option location`}>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
          </svg>
          <h3>Location</h3>
        </div>
        <h2>Hawassa, Ethiopia</h2>
      </div>
      <div ref={option2} className={`${visible ? "visible" : ""}  option phone`}>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
          </svg>

          <h3>Phone Number</h3>
        </div>
        <h2>+251924651105</h2>
      </div>
      <div ref={option3} className={`${visible ? "visible" : ""} option work-hours`}>
        <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg>
        <h3>Work Hours</h3>
        </div>
        <h2>Monday-Friday 8:00am to 5:00pm</h2>
      </div>
    </div>
  );
}
