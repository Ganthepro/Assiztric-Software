import './Notification_Data.css' 
import NofiSuggest from '../assets/Noti_Suggest.svg'

function Notification_Data(props) {
    return (
        <>
            <div className='main-notificationData'>
                <div style={{width:"210px",display:"flex",justifyContent:"space-between"}}>
                    <img src={NofiSuggest} />
                    <div style={{display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
                        <p>แนะนำการใช้เครื่องใช้ไฟฟ้า</p>
                        <h6>text</h6>
                    </div>
                </div>
                <p>time</p>
            </div>
            <hr />
        </>
    )
}

export default Notification_Data