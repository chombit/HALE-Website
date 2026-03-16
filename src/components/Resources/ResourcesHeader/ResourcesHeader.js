import { useEffect, useRef, useState } from "react"
import "./ResourcesHeader.css"
export default function ResourcesHeader(){
    const resourcesH1 = useRef()
    const [visible, setVisible] = useState(false)
    useEffect(function(){
        const observer = new IntersectionObserver((entries)=>{
            const entry = entries[0]
            if(entry.isIntersecting){
                setVisible(true)
            }
        })
        observer.observe(resourcesH1.current)
    },[])
    return(
        <div className="resources-header">
            <h1 className={visible ? "visible" : ""} ref={resourcesH1}>Resources</h1>
            <hr/>
        </div>
    )
}