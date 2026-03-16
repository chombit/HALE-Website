import { useEffect } from "react";
import AboutUsOverview from "../components/Homepage/AboutUsOverview/AboutUsOverview";
import Activities from "../components/Homepage/Activities/KeyAreas";
import Hero from "../components/Homepage/Hero/Hero";
import ProgramsOverview from "../components/Homepage/ProgramsOverview/ProgramsOverview";
import OurPartners from "../components/Homepage/OurPartners/OurPartners";

export default function Homepage(){
    useEffect(function(){
        window.scrollTo({
          // top:0,
          behavior:"instant"    
        })
      },[])
    return(
        <div className="homepage">
            <Hero/>
            <Activities/>
            <AboutUsOverview/>
            <OurPartners />
            <ProgramsOverview/>
        </div>
    )
}