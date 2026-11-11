
//import Inbox from "../messages/pages/Inbox";
import "./nav.scss"
import { useNavigate } from 'react-router-dom'

const Nav = () => {
  const navigate= useNavigate()
  return (
   <nav className="nav-bar">
    <div className="top"> <img src="./instagram.svg" className="logo-svg"></img> </div>
    <div className="middle">
    <button onClick={()=>{navigate()}}><img src="./home.svg"></img></button>
    <button onClick={()=>{navigate()}}><img src="./messages.svg"></img></button>
    <button onClick={()=>{navigate()}}><img src="./reels.svg"></img></button>
    
    <button onClick={()=>{navigate()}}><img src="./my-profile.svg"></img></button>


    </div>
    
    <div className="bottom"> <button onClick={()=>{navigate()}}><img src="./menu.svg"></img></button></div>
   </nav>
  )
}

export default Nav