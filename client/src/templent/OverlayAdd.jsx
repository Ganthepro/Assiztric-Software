import "./OverlayAdd.css";
import Input from "./Input";
import { useRef, useState } from "react";

function OverlayAdd(props) {
  const [formData, setFormData] = useState({
    type: '',
    model: '',
    brand: '',
    power: '',
    description: ''
  });

  const typeRef = useRef(null);
  const modelRef = useRef(null);
  const brandRef = useRef(null);
  const powerRef = useRef(null);
  const descriptionRef = useRef(null);

  const submit = async () => {
    const data = {
      type: typeRef.current.value,
      model: modelRef.current.value,
      brand: brandRef.current.value,
      power: powerRef.current.value,
      description: descriptionRef.current.value,
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
        throw new Error('Failed to add appliance');
      }

      const responseData = await response.json();
      console.log(responseData); // Handle success response data

      // Optionally reset form fields or handle success scenario
      setFormData({
        type: '',
        model: '',
        brand: '',
        power: '',
        description: ''
      });

      // Close the overlay after successful submission
      props.setShow(false);
    } catch (error) {
      console.error('Error adding appliance:', error.message);
      // Handle error scenario - show an error message to the user, etc.
    }
  };

  return (
    <div className="real-main">
      <div className="main-overlayAdd">
        <h3>เพิ่มเครื่องใช้ไฟฟ้า</h3>
        <button className="close-overlayAdd" onClick={() => props.setShow(false)}>
          ปิด
        </button>
        <div className="inputs-overlayAdd">
          <Input
            title="ประเภทเครื่องใช้ไฟฟ้า"
            placeholder="กรุณากรอกประเภท"
            ref={typeRef}
          />
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
            title="ลักษณะการใช้งานโดยสังเขป"
            placeholder="กรุณากรอกข้อความ"
            isBig={true}
            ref={descriptionRef}
          />
        </div>
        <button className="submit-overlayAdd" onClick={submit}>เพิ่ม</button>
      </div>
    </div>
  );
}

export default OverlayAdd;
