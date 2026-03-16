import { useEffect } from "react";
import ResourcesHeader from "../components/Resources/ResourcesHeader/ResourcesHeader";
import ResourcesList from "../components/Resources/ResourcesList/ResourcesList";

export default function Resources(){
    useEffect(function(){
        window.scrollTo({
          top:0,
          behavior:"instant"    
        })
      },[])
    return(
        <>
            <ResourcesHeader/>
            <ResourcesList />
        </>
    )
}