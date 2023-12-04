import './Notification_Group.css'
import Notification_Data from './Notification_Data'
import { useEffect, useState } from 'react'

function Notification_Group(props) {
    const [date, setDate] = useState(null)

    function getDate() {
        const now = new Date();
        const year = String(now.getFullYear());
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${day}/${month}/${year}`;
      }
    useEffect(() => {
        console.log(props.date)
    }, [props.date])

    return (
        <div className="main-notificationGroup">
            <p>{getDate() == props.date ? "Today" : props.date}</p>
            {
                props.data.map((data, index) => {
                    return <Notification_Data key={index} data={data} />
                })
            }
            {/* <Notification_Data />
            <Notification_Data /> */}
        </div>
    )
}

export default Notification_Group