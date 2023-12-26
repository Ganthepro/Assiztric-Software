import './Appliance_Info_Info.css'
import Washing_Logo from '../assets/Washing_Icon.svg';
import Fan_Logo from '../assets/Fan_Icon.svg';
import Fridge_Logo from '../assets/Fridge_Icon.svg';
import TV_Logo_Dark from '../assets/Television_Icon.svg';

function Appliance_Info_Info(props) {
    const icons = [
      ['WashingMC',Washing_Logo],
      ['RiceCooker',TV_Logo_Dark],
      ['ElecFan',Fan_Logo],
      ['Fridge',Fridge_Logo],
      ['AirCon',TV_Logo_Dark],
      ['Iron',TV_Logo_Dark],
      ['TV',TV_Logo_Dark],
      ['AirPurifier',TV_Logo_Dark]
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