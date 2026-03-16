import { useEffect } from "react";
import OpenTeamContent from "../components/OpenTeam/OpenTeamContent";

export default function OpenTeam(){
    useEffect(function(){
        window.scrollTo({
          top:0,
          behavior:"instant"    
        })
      },[])
    return(
        <>
            <OpenTeamContent/>
        </>
    )
}