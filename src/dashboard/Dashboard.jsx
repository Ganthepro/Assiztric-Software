import "./Dashboard.css";
import Header from "../templent/Header";
import Dashboard_Graph from "./Dashboard_Graph";
import Dashboard_Leaderboard from "./Dashboard_Leaderboard";
import Blank from "../templent/Blank";
import Nav from "../templent/Nav";

export function Dashboard(props) {
  return (
    <div className="main-dashboard">
      <Header />
      <div className="body-dashboard">
        <h1 style={{marginTop: "15px"}}>Dashboard</h1>
        <Dashboard_Graph />
        <Dashboard_Leaderboard />
      </div>
      <Blank />
      <Nav id={props.id} />
    </div>
  );
}
