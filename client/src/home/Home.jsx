import "./Home.css";
import Nav from "../template/Nav";
import Header from "../template/Header";
import Home_Dashboard from "./Home_Dashboard";
import Home_Leaderboard from "./Home_Leaderboard";
import Blank from "../template/Blank";
import Add from "../template/Add";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import liff from "@line/liff";

export function Home(props) {
  return (
    <div className="main-home">
      <Header />
      <div className="body-home">
        <h1 style={{ marginTop: "15px" }}>Home</h1>
        <Home_Dashboard />
        <Home_Leaderboard />
      </div>
      <Blank />
      <Add />
      <Nav id={props.id} />
    </div>
  );
}
