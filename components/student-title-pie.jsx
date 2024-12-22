"use client";
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);




export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Student Count by title',
    },
  },
};
export async function getData(){
  const res = await fetch('http://localhost:3000/api/charts/student-by-title')
  if (!res.ok){
    throw new Error("Failed to get data")
  }
  return res.json()
}




export function DemoPieChart() {
  const [data,setData] = useState({
    labels : [],
    datasets  : [
      {
        label: 'Dataset 1',
        data : [],
        borderColor: 'rgb(0, 0, 0)',
        backgroundColor: 'rgba(224, 255, 99, 0.5)',
      },
    ]
  });




  useEffect(() => {
    async function fetchData(){
      const jsonData = await getData()
      console.log(jsonData)
      setData({
        labels : jsonData ? jsonData.map(item => item.ttl_name): [],
        datasets  : [
          {
            label: 'Dataset 1',
            data : jsonData ? jsonData.map(item => item.total_students): [],
            borderColor: 'rgb(179, 179, 179)',
            backgroundColor: 'rgba(66, 72, 254, 0.94)',
          },
        ]        
      })
    }
    fetchData()
  },[])




  return <Pie options={options} data={data} />;
}
