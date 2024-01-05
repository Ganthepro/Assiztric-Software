import './Appliance_Info_Info.css'
import Washing_Logo from '../assets/Washing_Icon.svg';
import Fan_Logo from '../assets/Fan_Icon.svg';
import Fridge_Logo from '../assets/Fridge_Icon.svg';
import AirCon_Logo from '../assets/AirCon_Icon.svg';
import Iron_Logo from '../assets/Iron_Icon.svg';
import RiceCookie from '../assets/RiceCooker_Icon.svg';
import AirPurifier from '../assets/AirPurifier_Icon.svg';
import TV_Logo_Dark from '../assets/Television_Icon.svg';
import Kettle_Logo from '../assets/Kettle_Icon.svg';

function Appliance_Info_Info(props) {
    const icons = [
      ['WashingMC',Washing_Logo],
      ['RiceCooker',RiceCookie],
      ['ElecFan',Fan_Logo],
      ['Fridge',Fridge_Logo],
      ['AirCon',AirCon_Logo],
      ['Iron',Iron_Logo],
      ['TV',TV_Logo_Dark],
      ['AirPurifier',AirPurifier],
      ["Kettle",Kettle_Logo]
    ]

    return (
        <div className='main-applianceInfoInfo'>
            <div style={{display:"flex",alignItems:"center"}}>
                <img src={props.data != null ? icons.filter((value) => {
                    return value[0] === props.data.name ? value[1] : null
                })[0][1] : TV_Logo_Dark} alt="Logo" style={{marginRight:"10px",height:"35px"}} />
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