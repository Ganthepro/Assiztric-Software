import './Header.css'
import catPic from '../assets/download(1).jpg'

function Header() {
  return (
    <div className="main-header">
      <div className="box-left" style={{width:"80%"}}>
        <h1 style={{textOverflow:"ellipsis",whiteSpace:"nowrap",overflow:"hidden"}}>ธรรมทิกร เกียรติพวงชัย</h1>
        <h4 style={{ color: "#E9714F" }}>ค่าใช้ไฟฟ้า 1,535.65</h4>
      </div>
      <div className="profile">
        <img src={catPic} alt="profile-pic" style={{height:"100%"}} />
      </div>
    </div>
  )
}

export default Header
