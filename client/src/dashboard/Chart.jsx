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

  function getData() {
    const userId = Cookies.get("userId");
    // const userId = "test";
    fetch(`https://assiztric-software.vercel.app/getPredictData/${userId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (props.emission != null || props.emission != undefined) props.emission(data.totalEmission);
        if (props.watt != null || props.watt != undefined) props.watt(data.totalWatt);
        let datasets = [];
        const powerDistributionStack = [];
        const powerData = props.mode === 0 ? data.powerDistributionStackDay : data.powerDistributionStackWeek;
        for (let j = 0; j < powerData[0].length; j++) {
          let powerDistributionStackConcat = [];
          for (let i = 0; i < powerData.length; i++)
            powerDistributionStackConcat = powerDistributionStackConcat.concat(
              powerData[i][j]
            );
          powerDistributionStack.push(powerDistributionStackConcat);
        }
        if (props.updateTimeFunc != null)
          props.updateTimeFunc(data.times[data.times.length - 1]);
        // console.log(powerDistributionStack);
        // console.log(props.isOnly);
        if (props.isOnly != null && props.isOnly != undefined) {
          const index = data.types.indexOf(props.isOnly);
          datasets.push({
            label: data.types[index],
            data: powerDistributionStack[index],
            fill: false,
            borderColor: chartColors[index],
            borderWidth: 2,
            lineTension: 0.1,
          });
        }
        else {
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
        }
        setData({
          labels: data.times,
          datasets: datasets,
        });
      });
  }

  useEffect(() => {
    const interval = setInterval(getData, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function fetchData() {
      await setData(null);
      getData();
    }
    fetchData();
  }, [props.mode]);

  return (
    <div style={{width:"90%",display:"flex",justifyContent:"center"}} >
      {chartData != null ? <Line data={chartData} style={{width:"100%"}} /> : <p>Loading..</p>}
    </div>
  );
}

export default Chart;
