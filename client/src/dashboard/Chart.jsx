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

function Chart() {
  const [chartData, setData] = useState(null);
  const [chartColors, setChartColors] = useState(["red", "blue", "yellow", "green", "purple", "orange", "black", "pink", "gray", "brown", "cyan", "magenta", "lime", "teal", "lavender", "maroon", "navy", "olive", "silver", "skyblue", "tan", "violet", "wheat", "salmon", "plum", "orchid", "khaki", "indigo", "gold", "fuchsia", "crimson", "coral", "chocolate", "chartreuse", "cadetblue", "burlywood", "aquamarine", "aliceblue", "aqua", "azure", "beige", "bisque", "blanchedalmond", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkgrey", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray"]);

  function getData() {
    // const userId = Cookies.get("userId");
    const userId = "test";
    fetch(`http://localhost:5500/getPredictData/${userId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        let datasets = [];
        const powerDistributionStack = [];
        for (let j = 0; j < data.powerDistributionStack[0].length; j++) {
          let powerDistributionStackConcat = [];
          for (let i = 0; i < data.powerDistributionStack.length; i++) powerDistributionStackConcat = powerDistributionStackConcat.concat(data.powerDistributionStack[i][j]);
          powerDistributionStack.push(powerDistributionStackConcat);
        }
        powerDistributionStack.forEach((element, index) => {
            datasets.push({
                label: index,
                data: element,
                fill: false,
                borderColor: chartColors[index], // Color for the first dataset
                borderWidth: 2,
                lineTension: 0.1,
            });
        });
        setData({
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange", "Black"], // Replace static labels with Time Series data
            datasets: datasets,
        });
      });
  }

  useEffect(() => {
    const interval = setInterval(getData, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
        {
            chartData != null && <Line data={chartData} />
        }
    </div>
  );
}

export default Chart;
