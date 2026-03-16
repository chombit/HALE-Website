import { useNavigate } from "react-router-dom"
import "./Events.css"
import { useContext } from "react"
import {GeneralContext} from "./../../../hooks/GeneralContext"
export default function Events({title,imgName}){
    const navigate = useNavigate()
    const {events} = useContext(GeneralContext)
    let name =""
    if(events[0].name.length > 50){
        name = events[0].name.slice(0, 50) + "..."
    }
    else{
        name = events[0].name
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
                    <button onClick={()=>(navigate(`/events/0`))}>Read more</button>
                </div>
            </div>
        
    )
}