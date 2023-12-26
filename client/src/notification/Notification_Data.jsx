import './Notification_Data.css' 
import NofiSuggest from '../assets/Noti_Suggest.svg'
import NotiAlert from '../assets/Noti_Alert.svg'
import NotiChange from '../assets/Noti_Change.svg'
import { useEffect, useRef, useState } from 'react';


function Notification_Data(props) {
    const [show,setShow] = useState(false);
    const code = props.data.code;
    const notificationDataRef = useRef(null);

    useEffect(() => {
        if (show) {
            notificationDataRef.current.style.textOverflow = "unset";
            notificationDataRef.current.style.whiteSpace = "unset";
            notificationDataRef.current.style.overflow = "unset";
        } else {
            notificationDataRef.current.style.textOverflow = "ellipsis";
            notificationDataRef.current.style.whiteSpace = "nowrap";
            notificationDataRef.current.style.overflow = "hidden";
        }
    },[show])

    return (
        <>
            <div className='main-notificationData'>
                <div style={{width:"250px",display:"flex", alignItems:"center"}}>
                    <img src={code == 0 ? NofiSuggest : code == 1 ? NotiAlert : code == 2 ? NotiChange : "Loading"} style={{height:"30px"}} />
                    <div style={{display:"flex",flexDirection:"column",justifyContent:"space-between",width:"70%",marginLeft:"10px"}}>
                        <p>{props.data != null ? props.data.heading : "Loading"}</p>
                        <h6 style={{textOverflow:"ellipsis",whiteSpace:"nowrap",overflow:"hidden"}} ref={notificationDataRef}>{props.data.advice}</h6>
                    </div>
                </div>
                <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                    <p>{props.data.time}</p>
                    <button onClick={() => setShow(!show)} className="more-btn">{show ? "ลดรายละเอียด" : "ดูรายละเอียด"}</button>
                </div>
            </div>
            <hr />
        </>
    )
}

export default Notification_Data