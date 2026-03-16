import { useEffect, useRef, useState } from "react"
import "./EventsHeader.css"
export default function EventsHeader(){
    const eventsh1 = useRef()
    const [visible, setVisible] = useState(false)

    useEffect(function(){
        const observer = new IntersectionObserver((entries)=>{
            const entry = entries[0]
            if(entry.isIntersecting){
                setVisible(true)
            }
        })
        observer.observe(eventsh1.current)
    },[])

    return(
        <div className={`events-header`}>
            <h1 className={visible ? "visible" : ""} ref={eventsh1}>Events</h1>
            <hr></hr>
        </div>
    )
}