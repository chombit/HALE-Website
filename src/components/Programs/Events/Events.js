import { useNavigate } from "react-router-dom"
import "./Events.css"
import { useEffect, useState } from "react"
import { API_BASE_URL } from "./../../../hooks/GeneralContext"
export default function Events({title,imgName}){
    const navigate = useNavigate()
    const [events, setEvents] = useState([])

    useEffect(function(){
        fetch(`${API_BASE_URL}/events.php?limit=1`)
            .then(res => res.json())
            .then(data => setEvents(data.events || []))
            .catch(err => console.error("Failed to fetch events:", err))
    }, [])

    if(events.length === 0) return null

    let name =""
    if(events[0].title.length > 50){
        name = events[0].title.slice(0, 50) + "..."
    }
    else{
        name = events[0].title
    }
    return(  
            <div className="program-event">
                <div className="eventImg">
                    <img src={events[0].images[0]} alt="event" />
                </div>
                <div className="eventTitle">
                    <h3>{name}</h3>
                </div>
                <div className="eventButton">
                    <button onClick={()=>(navigate(`/events/${events[0].id}`))}>Read more</button>
                </div>
            </div>
        
    )
}