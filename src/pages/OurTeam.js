import { useEffect } from "react";
import TeamHeader from "../components/OurTeam/TeamHeader/TeamHeader";
import TeamList from "../components/OurTeam/TeamList/TeamList";

export default function OurTeam(){
    useEffect(function(){
        window.scrollTo({
          top:0,
          behavior:"instant"    
        })
      },[])
    return(
        <>
            <TeamHeader/>
            <TeamList />
        </>
    )
}