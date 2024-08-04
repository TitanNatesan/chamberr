import React, { useEffect, useState } from "react";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "react-chatbot-kit/build/main.css";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [formData, setFormData] = useState([]);
  const [selectedChart, setSelectedChart] = useState("bar");

  useEffect(() => {
    axios
      .get("http://192.168.188.144:8000/membershipform/")
      .then((response) => {
        console.log("API response:", response.data); // Debugging log
        setFormData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  if (formData.length === 0) {
    return <div>Loading...</div>;
  }

  const chartTypes = ["bar", "line", "pie", "doughnut"];

  const chartComponents = {
    bar: Bar,
    line: Line,
    pie: Pie,
    doughnut: Doughnut,
  };

  const ChartComponent = chartComponents[selectedChart];

  const getChartData = (data, labels, title) => ({
    labels,
    datasets: [
      {
        label: title,
        data,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
        ],
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  });

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const aggregateData = (field) => {
    return formData.map((item) => parseFloat(item[field]) || 0);
  };

  // Aggregate data for the first chart: annual turnover of all members year by year
  const annualTurnoverData = {
    year1: aggregateData("Annualturnover_year1"),
    year2: aggregateData("Annualturnover_year2"),
    year3: aggregateData("Annualturnover_year3"),
  };

  const annualTurnoverChartData = getChartData(
    [
      annualTurnoverData.year1.reduce((a, b) => a + b, 0),
      annualTurnoverData.year2.reduce((a, b) => a + b, 0),
      annualTurnoverData.year3.reduce((a, b) => a + b, 0),
    ],
    ["Year 1", "Year 2", "Year 3"],
    "Annual Turnover"
  );

  // Aggregate data for the second chart: number of members by constitution
  const constitutionCounts = formData.reduce((acc, curr) => {
    acc[curr.constitution] = (acc[curr.constitution] || 0) + 1;
    return acc;
  }, {});

  const constitutionChartData = getChartData(
    Object.values(constitutionCounts),
    Object.keys(constitutionCounts),
    "Individual"
  );

  // Aggregate data for the third chart: catering to market
  const marketCounts = formData.reduce((acc, curr) => {
    acc[curr.Cateringtomarket] = (acc[curr.Cateringtomarket] || 0) + 1;
    return acc;
  }, {});

  const marketChartData = getChartData(
    Object.values(marketCounts),
    Object.keys(marketCounts),
    "Catering to Market"
  );

  // Aggregate data for the fourth chart: classification of industry
  const industryCounts = formData.reduce((acc, curr) => {
    acc[curr.Classificationofindustry] =
      (acc[curr.Classificationofindustry] || 0) + 1;
    return acc;
  }, {});

  const industryChartData = getChartData(
    Object.values(industryCounts),
    Object.keys(industryCounts),
    "Classification of Industry"
  );

  const charts = [
    { title: "Annual Turnover Year by Year", data: annualTurnoverChartData },
    { title: "Number of Members by Constitution", data: constitutionChartData },
    { title: "Catering to Market", data: marketChartData },
    { title: "Classification of Industry", data: industryChartData },
  ];

  return (
    <div className="bg-gray-100 p-6">
      <h1 className="flex items-center justify-center font-bold text-4xl mb-10">
        Dashboard
      </h1>
      <div className="mb-4">
        <label htmlFor="chartType" className="mr-2">
          Select Chart Type:
        </label>
        <select
          id="chartType"
          value={selectedChart}
          onChange={(e) => setSelectedChart(e.target.value)}
          className="p-2 border rounded"
        >
          {chartTypes.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-6">
        {charts.map((chart, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold mb-4">{chart.title}</h3>
            <div className="h-64">
              <ChartComponent data={chart.data} options={chartOptions} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
