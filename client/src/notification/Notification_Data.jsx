import './Notification_Data.css' 
import NofiSuggest from '../assets/Noti_Suggest.svg'
import NotiAlert from '../assets/Noti_Alert.svg'
import NotiChange from '../assets/Noti_Change.svg'

function Notification_Data(props) {
    const code = props.data.code;

    return (
        <>
            <div className='main-notificationData'>
                <div style={{width:"210px",display:"flex",justifyContent:"space-between"}}>
                    <img src={code == 0 ? NofiSuggest : code == 1 ? NotiAlert : code == 2 ? NotiChange : "Loading"} />
                    <div style={{display:"flex",flexDirection:"column",justifyContent:"space-between",width:"80%"}}>
                        <p>{code == 0 ? "แนะนำการใช้เครื่องใช้ไฟฟ้า" : code == 1 ? "การใช้งานเครื่องใช้ไฟฟ้าที่ผิดปกติ" : code == 2 ? "การเปลี่ยนแปลงของค่า Ft." : "Loading"}</p>
                        <h6 style={{textOverflow:"ellipsis",whiteSpace:"nowrap",overflow:"hidden"}}>{props.data.detail}</h6>
                    </div>
                </div>
                <p>{props.data.time}</p>
            </div>
            <hr />
        </>
    )
}

export default Notification_Data