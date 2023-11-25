import './Header.css'

function Header(props) {
  return (
    <div className="main-header">
      <div className="box-left" style={{width:"80%"}}>
        <h1 style={{textOverflow:"ellipsis",whiteSpace:"nowrap",overflow:"hidden"}}>{props.profile}</h1>
        <h4 style={{ color: "#E9714F" }}>ค่าใช้ไฟฟ้า 1,535.65</h4>
      </div>
      <div className="profile">
        {/* <img src="" alt="profile-pic" /> */}
      </div>
    </div>
  )
}

export default Header
