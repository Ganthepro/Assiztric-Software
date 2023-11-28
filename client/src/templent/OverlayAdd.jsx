import './OverlayAdd.css'
import Input from './Input'

function OverlayAdd(props) {
    return (
        <div className='real-main'>
            <div className="main-overlayAdd">
                <h3>เพิ่มเครื่องใช้ไฟฟ้า</h3>
                <button onClick={() => props.setShow(false)}>ปิด</button>
                <div className='inputs-overlayAdd'>
                    <Input title="ประเภทเครื่องใช้ไฟฟ้า" placeholder="กรุณากรอกประเภท" />
                    <Input title="ชื่อรุ่น" placeholder="กรุณากรอกชื่อรุ่น" />
                    <Input title="ชื่อยี่ห้อ" placeholder="กรุณากรอกยี่ห้อ" />
                    <Input title="การใช้พลังงานไฟฟ้าโดยเฉลี่ย (วัตต์)" placeholder="กรุณากรอกตัวเลข" />
                    <Input title="ลักษณะการใช้งานโดยสังเขป" placeholder="กรุณากรอกข้อความ" isBig={true} />
                </div>
            </div>
        </div>
    )
}

export default OverlayAdd