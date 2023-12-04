import './Notification_Group.css'
import Notification_Data from './Notification_Data'

function Notification_Group(props) {
    return (
        <div className="main-notificationGroup">
            <p>{props.notification.date}</p>
            <Notification_Data />
            <Notification_Data />
        </div>
    )
}

export default Notification_Group