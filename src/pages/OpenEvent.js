import { useEffect } from "react";
import OpenEventContent from "../components/OpenEvent/OpenEventContent/OpenEventContent";
import OpenEventImages from "../components/OpenEvent/OpenEventImages/OpenEventImages";

export default function OpenEvent() {
  useEffect(function(){
    window.scrollTo({
      top:0,
      behavior:"instant"    
    })
  },[])
  return (
    <>
      <OpenEventImages/>
      <OpenEventContent />
    </>
  );
}
