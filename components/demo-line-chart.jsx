"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Student Count by Program",
    },
  },
};
export async function getData() {
  const res = await fetch(
    "http://localhost:3000/api/charts/student-by-program"
  );
  if (!res.ok) {
    throw new Error("Failed to get data");
  }
  return res.json();
}

export function DemoLineChart() {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Dataset 1",
        data: [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  });

  useEffect(() => {
    async function fetchData() {
      const jsonData = await getData();
      console.log(jsonData);
      setData({
        labels: jsonData ? jsonData.map((item) => item.pgm_name) : [],
        datasets: [
          {
            label: "Dataset 1",
            data: jsonData ? jsonData.map((item) => item.student_count) : [],
            borderColor: "rgb(169, 108, 255)",
            backgroundColor: "rgba(0, 106, 255, 0.54)",
          },
        ],
      });
    }
    fetchData();
  }, []);

  return <Line options={options} data={data} />;
}
