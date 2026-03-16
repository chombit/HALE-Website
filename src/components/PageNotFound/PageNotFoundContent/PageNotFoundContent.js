import { Link } from "react-router-dom"
import "./PageNotFoundContent.css"
export default function PageNotFoundContent(){
    return(
        <div className="not-found-content">
            <h1>Oops!!!</h1>
            <h2>Looks like you got to where you're not supposed to</h2>
            <Link to={"/"}>Go back home</Link>
        </div>
    )
}