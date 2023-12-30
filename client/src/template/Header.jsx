import { useEffect } from 'react'
import './Header.css'

function Header(props) {
  useEffect(() => {
    console.log(props.emission)
  }, [props.emission])
  return (
    <div className="main-header">
      <div className="box-left" style={{width:"80%"}}>
        <h1 style={{textOverflow:"ellipsis",whiteSpace:"nowrap",overflow:"hidden"}}>{props.profiles != null ? `สวัสดีคุณ ${props.profiles[0]}` : "Loading..."}</h1>
        <h4 style={{ color: "#E9714F" }}>ปล่อย Carbon Footprint {parseInt(props.emission) / 1000} tCO₂e</h4>
      </div>
      <div className="profile">
        <img src={props.profiles != null ? props.profiles[1] : ""} alt="profile-pic" />
      </div>
    </div>
  )
}

export default Header
