import './Nav.css'
import onHomePic from './assets/on_home.png'
import offDashPic from './assets/off_dash.png'
import offNotiPic from './assets/off_noti.png'

function Nav() {
    return (
        <nav>
        <div className="nav-items on">
        <img src={onHomePic} alt="home" />
        <p>Home</p>
        </div>

        <div className="nav-items off" >
        <img src={offDashPic} alt="dashboard" />
        <p>Dashboard</p>
        </div>

        <div className="nav-items off">
        <img src={offNotiPic} alt="notification" />
        <p>Notification</p>
        </div>
        </nav>
    )
}
    

export default Nav