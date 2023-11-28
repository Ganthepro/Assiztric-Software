import "./OverlayAdd.css";
import Input from "./Input";
import { useRef } from "react";

function OverlayAdd(props) {
  const input = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  function submit() {
    const data = {
      type: input[0].current.value,
      model: input[1].current.value,
      brand: input[2].current.value,
      power: input[3].current.value,
      description: input[4].current.value,
    };
    fetch(`https://assiztric-software.vercel.app/addApplianceData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: Cookies.get("token"),
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }

  return (
    <div className="real-main">
      <div className="main-overlayAdd">
        <h3>เพิ่มเครื่องใช้ไฟฟ้า</h3>
        <button
          className="close-overlayAdd"
          onClick={() => props.setShow(false)}
        >
          ปิด
        </button>
        <div className="inputs-overlayAdd">
          <Input
            title="ประเภทเครื่องใช้ไฟฟ้า"
            placeholder="กรุณากรอกประเภท"
            ref={input[0]}
          />
          <Input
            title="ชื่อรุ่น"
            placeholder="กรุณากรอกชื่อรุ่น"
            ref={input[1]}
          />
          <Input
            title="ชื่อยี่ห้อ"
            placeholder="กรุณากรอกยี่ห้อ"
            ref={input[2]}
          />
          <Input
            title="การใช้พลังงานไฟฟ้าโดยเฉลี่ย (วัตต์)"
            placeholder="กรุณากรอกตัวเลข"
            ref={input[3]}
          />
          <Input
            title="ลักษณะการใช้งานโดยสังเขป"
            placeholder="กรุณากรอกข้อความ"
            isBig={true}
            ref={input[4]}
          />
        </div>
        <button className="submit-overlayAdd" onClick={submit}>เพิ่ม</button>
      </div>
    </div>
  );
}

export default OverlayAdd;
