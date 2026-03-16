import { useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { GeneralContext } from "../../hooks/GeneralContext"
import "./OpenTeamContent.css"

export default function OpenTeamContent(){
    const {index} = useParams()
    const {teams} = useContext(GeneralContext)
    const navigate = useNavigate()
    useEffect(function(){
        window.scrollTo({
            top:0,
            behavior:"instant"
        })
    },[])
    return(
        <div className="open-team-content">
            <button onClick={()=>(navigate("/team"))}>Back to Teams</button>
            <div className="profile-pic">
                <img src={teams[index].image} alt=""/>
            </div>
            <div className="txt-container">
                <h1>{teams[index].name}</h1>
                <h3>{teams[index].position}</h3>
                {
                    teams[index].description.map((paragraph)=>(
                        <p>{paragraph}</p>
                    ))
                }
            </div>
        </div>
    )
}