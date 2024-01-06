import './Header.css'

function Header(props) {
  return (
    <div className="main-header">
      <div className="in-header">
      <div className="empty"></div>
        <div className="box-left">
          <h1 style={{fontSize:"24px",textOverflow:"ellipsis",whiteSpace:"nowrap",overflow:"hidden"}}>{props.profiles != null ? `สวัสดีคุณ ${props.profiles[0]}` : "Loading..."}</h1>
          <div className="profile">
            <img src={props.profiles != null ? props.profiles[1] : ""} alt="profile-pic" />
          </div>
        </div>
          <h4 style={{ color: "#E9714F" ,fontSize:"16px"}}>ปล่อย Carbon Footprint {parseInt(props.emission) / 1000} tCO₂e</h4>
      </div>
    </div>
  )
}

export default Header
