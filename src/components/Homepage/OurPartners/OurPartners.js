import { useEffect, useRef, useState } from "react"
import "./OurPartners.css"
export default function OurPartners(){
    const [isVisible, setIsVisible] = useState(false)
    const listRef = useRef()
    useEffect(function(){
        const observer = new IntersectionObserver((entries)=>{
            const entry = entries[0]
            if(entry.isIntersecting){
                setIsVisible(true)
            }
        },{
            threshold:[0.5,1]
        })
        observer.observe(listRef.current)
    },[])    
    return(
        <>
        <h1 className="partners-heading">Our Partners</h1>
        <div ref={listRef} className={`${isVisible ? "visible" : ''} our-partners`}>
            <ul>
                <li>
                    <img src="https://i.postimg.cc/CL4XTyd1/editted_logo.jpg" alt="partner" />
                </li>
                <li>
                    <img src="https://i.postimg.cc/gc81sLW3/miydo_logo.jpg" alt="partner" />
                </li>
                <li>
                    <img src="https://i.postimg.cc/NG6Pmh64/Screenshot_2024-12-25_170425.png" alt="partner" />
                </li>
                <li>
                    <img src="https://i.postimg.cc/JhGxtvxR/new-gudumale.png" alt="partner" />
                </li>
            </ul>
            <ul>
                <li>
                    <img src="https://i.postimg.cc/CL4XTyd1/editted_logo.jpg" alt="partner" />
                </li>
                <li>
                    <img src="https://i.postimg.cc/gc81sLW3/miydo_logo.jpg" alt="partner" />
                </li>
                <li>
                    <img src="https://i.postimg.cc/NG6Pmh64/Screenshot_2024-12-25_170425.png" alt="partner" />
                </li>
                <li>
                    <img src="https://i.postimg.cc/JhGxtvxR/new-gudumale.png" alt="partner" />
                </li>
            </ul>
        </div>
        </>
    )
}