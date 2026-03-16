import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Team({team, index}){
    const teamRef = useRef()
    const navigate = useNavigate()
    const [visible, setVisible] = useState(false)
    useEffect(function(){
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0]
            if(entry.isIntersecting){
                setVisible(true)
            }
        },{threshold:[0.3, 1]})
        observer.observe(teamRef.current)
    },[])
    return(
        <div ref={teamRef} className={`team ${visible ? "visible" : ""} ${team.name === "Dansita Asefa Adela" ? "dansita" : ""}`}>
            <img src={team.image} alt=""/>
            <h2>{team.name}</h2>
            <h4>{team.position}</h4>
            <button onClick={()=>(navigate(`/team/${index}`))}>Read More</button>
        </div>
    )
}