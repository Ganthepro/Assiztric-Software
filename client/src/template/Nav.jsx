import './Nav.css'
import onHomePic from "../assets/On_Home.svg"
import onDashPic from "../assets/On_Dashboard.svg"
// import onNotiPic from "../assets/On_Notification.svg"
import offHomePic from "../assets/Off_Home.svg"
import offDashPic from "../assets/Off_Dashboard.svg"
import offNotiPic from "../assets/Off_Notification.svg"

function Nav(props) {
    return (
        <nav>
            <div className="nav-items on" onClick={() => window.location.href="/"}>
                <img src={props.id == 0 ? onHomePic : offHomePic} alt="home" />
                <p>Home</p>
            </div>
            <div className="nav-items off" onClick={() => window.location.href="/dashboard"} >
                <img src={props.id == 1 ? onDashPic : offDashPic} alt="dashboard" />
                <p>Dashboard</p>
            </div>
            <div className="nav-items off" onClick={() => window.location.href="/notification"}>
                <img src={props.id == 2 ? null : offNotiPic} alt="notification" />
                <p>Notification</p>
            </div>
        </nav>
    )
}
    

export default Nav