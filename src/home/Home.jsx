import "./Home.css";
import Nav from "../templent/Nav";
import Header from "../templent/Header";
import Home_Dashboard from "./Home_Dashboard";
import Home_Leaderboard from "./Home_Leaderboard";
import Blank from "../templent/Blank";

export function Home(props) {
  return (
    <div className="main-home">
      <Header />
      <div className="body-home">
        <h1 style={{marginTop: "15px"}}>Home</h1>
        <Home_Dashboard />
        <Home_Leaderboard />
      </div>
      <Blank />
      <Nav id={props.id} />
    </div>
  );
}
