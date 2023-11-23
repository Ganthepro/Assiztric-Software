import "./Home.css";
import { useRef } from "react";
import Nav from "../Nav";
import Header from "../templent/Header";
import Home_Dashboard from "./Home_Dashboard";
import Home_Leaderboard from "./Home_Leaderboard";
import Blank from "../templent/blank";

export function Home() {
  const setRef = useRef(null);

  function Start() {
    setRef.current.style.backgroundColor = "#be6850";
  }
  function End() {
    setRef.current.style.backgroundColor = "#E9714F";
  }
  return (
    <div className="main-home">
      <Header />
      <div className="body-home">
        <h1 style={{marginTop: "15px"}}>Home</h1>
        <Home_Dashboard />
        <Home_Leaderboard />
      </div>
      <Blank />
      <Nav />
    </div>
  );
}

// export default Home
