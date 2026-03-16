import { useEffect } from "react";
import ContactHeader from "../components/ContactUs/ContactHeader/ContactHeader";
import ContactOptions from "../components/ContactUs/ContactOptions/ContactOptions.js";
import ContactSocialLinks from "../components/ContactUs/ContactSocialLinks/ContactSocialLinks.js";

export default function ContactUs() {
  useEffect(function(){
    window.scrollTo({
      top:0,
      behavior:"instant"    
    })
  },[])
  return (
    <>
      <ContactHeader />
      <ContactOptions/>
      <ContactSocialLinks/>
    </>
  );
}
