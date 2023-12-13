import './Header.css'

function Header(props) {
  return (
    <div className="main-header">
      <div className="box-left" style={{width:"80%"}}>
        <h1 style={{textOverflow:"ellipsis",whiteSpace:"nowrap",overflow:"hidden"}}>{props.profiles != null ? props.profiles[0] : "Loading..."}</h1>
        <h4 style={{ color: "#E9714F" }}>ค่าการปล่อยก๊าซเรือนกระจก {parseInt(props.emission) / 1000} tCO₂e</h4>
      </div>
      <div className="profile">
        <img src={props.profiles != null ? props.profiles[1] : ""} alt="profile-pic" />
      </div>
    </div>
  )
}

export default Header
