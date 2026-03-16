import { useEffect } from "react";
import EventsHeader from "../components/Events/EventsHeader/EventsHeader";
import EventsList from "../components/Events/EventsList/EventsList";

export default function Events(){
    useEffect(function(){
        window.scrollTo({
          top:0,
          behavior:"instant"    
        })
      },[])
    return(
        <>
        <EventsHeader/>
        <EventsList/>
        </>
    )
}