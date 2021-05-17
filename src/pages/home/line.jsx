import React from "react";
import ReactECharts from "echarts-for-react";

export default function Line() {
  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#999",
        },
      },
    },
    legend: {
      data: ["Actual Sales", "Actual Forecast", "Project Growth"],
    },
    xAxis: [
      {
        type: "category",
        data: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        axisPointer: {
          type: "shadow",
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "Amount (in thousands)",
        min: 0,
        max: 210,
        interval: 30,
        axisLabel: {
          formatter: "$ {value}",
        },
      },
      {
        type: "value",
        name: "",
        min: 0,
        max: 25,
        interval: 5,
        axisLabel: {
          formatter: "{value} °C",
        },
        show: false,
      },
    ],
    series: [
      {
        name: "Actual Sales",
        type: "bar",
        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
      },
      {
        name: "Actual Forecast",
        type: "bar",
        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
      },
      {
        name: "Project Growth",
        type: "line",
        yAxisIndex: 1,
        data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
      },
    ],
  };
  return <ReactECharts option={option} style={{ top: "10%", left: "9%" }} />;
}
