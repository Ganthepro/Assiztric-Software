import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
);

function Chart(props) {
  const [chartData, setData] = useState(null);
  const [chartColors, setChartColors] = useState([
    "red",
    "blue",
    "yellow",
    "green",
    "purple",
    "orange",
    "black",
    "pink",
    "gray",
    "brown",
    "cyan",
    "magenta",
    "lime",
    "teal",
    "lavender",
    "maroon",
    "navy",
    "olive",
    "silver",
    "skyblue",
    "tan",
    "violet",
    "wheat",
    "salmon",
    "plum",
    "orchid",
    "khaki",
    "indigo",
    "gold",
    "fuchsia",
    "crimson",
    "coral",
    "chocolate",
    "chartreuse",
    "cadetblue",
    "burlywood",
    "aquamarine",
    "aliceblue",
    "aqua",
    "azure",
    "beige",
    "bisque",
    "blanchedalmond",
    "blueviolet",
    "brown",
    "burlywood",
    "cadetblue",
    "chartreuse",
    "chocolate",
    "coral",
    "cornflowerblue",
    "cornsilk",
    "crimson",
    "cyan",
    "darkblue",
    "darkcyan",
    "darkgoldenrod",
    "darkgray",
    "darkgreen",
    "darkgrey",
    "darkkhaki",
    "darkmagenta",
    "darkolivegreen",
    "darkorange",
    "darkorchid",
    "darkred",
    "darksalmon",
    "darkseagreen",
    "darkslateblue",
    "darkslategray",
  ]);
  let interval;

  function getData(mode) {
    const userId = Cookies.get("userId");
    fetch(`https://assiztric-software.vercel.app/getPredictData/${userId}`, {
      method: "GET",
      
      headers: {
        token: Cookies.get("token"),
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (props.emission != null || props.emission != undefined) props.emission(data.totalEmission);
        if (props.watt != null || props.watt != undefined) props.watt(data.totalWatt);
        let datasets = [];
        const powerDistributionStack = [];
        const powerData = props.isOnly != null || props.isOnly != undefined || props.watt != undefined ? data.powerDistributionStackDay : mode == 0 ? data.powerDistributionStackDay : data.powerDistributionStackWeek;
        for (let j = 0; j < powerData[0].length; j++) {
          let powerDistributionStackConcat = [];
          for (let i = 0; i < powerData.length; i++)
            powerDistributionStackConcat = powerDistributionStackConcat.concat(
              powerData[i][j]
            );
          powerDistributionStack.push(powerDistributionStackConcat);
        }
        if (props.updateTimeFunc != null)
          props.updateTimeFunc(data.timeDay[data.timeDay.length - 1]);
        if (props.isOnly != null || props.isOnly != undefined) {
          const index = data.types.indexOf(props.isOnly);
          datasets.push({
            label: data.types[index],
            data: powerDistributionStack[index],
            fill: false,
            borderColor: chartColors[index],
            borderWidth: 2,
            lineTension: 0.1,
          });
          props.setMean(powerDistributionStack[index].filter((element) => element != 0).reduce((a, b) => a + b, 0) / powerDistributionStack[index].filter((element) => element != 0).length);
        }
        else {
          if (mode == 0 || props.watt != undefined) {
            powerDistributionStack.forEach((element, index) => {
              datasets.push({
                label: data.types[index],
                data: element,
                fill: false,
                borderColor: chartColors[index],
                borderWidth: 2,
                lineTension: 0.1,
              });
            });
          } else {
            datasets.push({
              label: "Total",
              data: data.powerDistributionStackWeek,
              fill: false,
              borderColor: 'orange',
              borderWidth: 2,
              lineTension: 0.1,
            });
          }
        }
        setData({
          labels: props.isOnly != null || props.isOnly != undefined || props.watt != undefined ? data.timeDay : mode == 0 ? data.timeDay : data.timeWeek,
          datasets: datasets,
        });
      });
  }

  useEffect(() => {
    clearInterval(interval);
    interval = setInterval(() => getData(props.mode), 60000);
    async function fetchData() {
      await setData(null);
      getData(props.mode);
    }
    fetchData();
    return () => clearInterval(interval);
  }, [props.mode]);

  return (
    <div style={{width:"90%",display:"flex",justifyContent:"center"}} >
      {chartData != null ? <Line data={chartData} style={{width:"100%"}} /> : <p>Loading..</p>}
    </div>
  );
}

export default Chart;
