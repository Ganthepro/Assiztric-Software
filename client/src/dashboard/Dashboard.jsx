import "./Dashboard.css";
// import Header from "../template/Header";
import Dashboard_Graph from "./Dashboard_Graph";
import Dashboard_Leaderboard from "./Dashboard_Leaderboard";
import Blank from "../template/Blank";
import Nav from "../template/Nav";
import Add from "../template/Add";

export function Dashboard(props) {
  return (
    <div className="main-dashboard">
      {/* <Header /> */}
      <div className="body-dashboard">
        <h1>Dashboard</h1>
        <Dashboard_Graph />
        <Dashboard_Leaderboard />
      </div>
      <Blank />
      <Add />
      <Nav id={props.id} />
    </div>
  );
}
