import { useEffect } from 'react';
import './Appliance_Info_Info.css'
import TV_Logo_Light from "../assets/Television_Icon_Light.svg";

function Appliance_Info_Info(props) {
    return (
        <div className='main-applianceInfoInfo'>
            <div style={{display:"flex",alignItems:"center"}}>
                <img src={TV_Logo_Light} alt="TV Logo" style={{marginRight:"10px",height:"35px"}} />
                <h4 className='applianceInfo'>{props.data != null ? props.data.name : "Name"}</h4>
            </div>
            <hr />
            <div className='applianceInfo'>
                <p>ชื่อรุ่น</p>
                <p>{props.data != null ? props.data.brand : "Brand"}</p>
            </div>
            <hr />
            <div className='applianceInfo'>
                <p>ชื่อยี่ห้อ</p>
                <p>{props.data != null ? props.data.model : "Model"}</p>
            </div>
        </div>
    )
}

export default Appliance_Info_Info;