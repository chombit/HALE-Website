import { useContext } from "react"
import Team from "./Team"
import "./TeamList.css"
import { GeneralContext } from "../../../hooks/GeneralContext"
export default function TeamList(){
    const {teams} = useContext(GeneralContext)
    return(
        <div className="team-list">
           {
            teams.map((team,index)=>(
                <Team team={team} index={index}/>
            ))
           }
        </div>
    )
}