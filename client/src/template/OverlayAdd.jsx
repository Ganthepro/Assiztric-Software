import "./OverlayAdd.css";
import Input from "./Input";
import { useRef } from "react";
import Cookies from "js-cookie";

function OverlayAdd(props) {
  const modelRef = useRef(null);
  const brandRef = useRef(null);
  const powerRef = useRef(null);
  const descriptionRef = useRef(null);
  const optionRef = useRef(null);

  const submit = async () => {
    const data = {
      userId: Cookies.get("userId"),
      Model: modelRef.current.value,
      Brand: brandRef.current.value,
      Usage: powerRef.current.value,
      UsageBehavior: descriptionRef.current.value,
      Type: optionRef.current.value
    };
    try {
      const response = await fetch(`https://assiztric-software.vercel.app/addApplianceData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: Cookies.get("token"),
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        console.log(err);
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i];
          const eqPos = cookie.indexOf("=");
          const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
          Cookies.remove(name);
        }
        window.location.reload();
      }
      // Close the overlay after successful submission
      alert("เพิ่มเครื่องใช้ไฟฟ้าสำเร็จ");
      props.setShow(false);
    } catch (error) {
      console.error("Error adding appliance:", error.message);
      // Handle error scenario - show an error message to the user, etc.
    }
  };

  return (
    <div className="real-main">
      <div className="main-overlayAdd">
        <h3>เพิ่มเครื่องใช้ไฟฟ้า *</h3>
        <button
          className="close-overlayAdd"
          onClick={() => props.setShow(false)}
        >
          ปิด
        </button>
        <div className="content">
        <div className="inputs-overlayAdd">
          ประเภทเครื่องใช้ไฟฟ้า
          <select className="Dropdown" name="appliances" id="appliances" ref={optionRef}>
            <option value="WashingMC">เครื่องซักผ้า</option>
            <option value="RiceCooker">หม้อหุงข้าว</option>
            <option value="ElecFan">พัดลม</option>
            <option value="Fridge">ตู้เย็น</option>
            <option value="AirCon">เครื่องปรับอากาศ</option>
            <option value="Iron">เตารีด</option>
            <option value="TV">โทรทัศน์</option>
            <option value="AirPurifier">เครื่องกรองอากาศ</option>
            <option value="Kettle">กาต้มน้ำ</option>
          </select>
          <Input
            title="ชื่อรุ่น"
            placeholder="กรุณากรอกชื่อรุ่น"
            ref={modelRef}
          />
          <Input
            title="ชื่อยี่ห้อ"
            placeholder="กรุณากรอกยี่ห้อ"
            ref={brandRef}
          />
          <Input
            title="การใช้พลังงานไฟฟ้าโดยเฉลี่ย (วัตต์)"
            placeholder="กรุณากรอกตัวเลข"
            ref={powerRef}
          />
          <Input
            title="ลักษณะการใช้งานโดยสังเขป *"
            placeholder="กรุณากรอกข้อความ"
            isBig={true}
            ref={descriptionRef}
          />
        </div>
        <button className="submit-overlayAdd" onClick={submit}>
          เพิ่มข้อมูล
        </button>
        </div>
      </div>
    </div>
  );
}

export default OverlayAdd;
