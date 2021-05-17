import React, { useState } from "react";
import { Card, Button } from "antd";
import ReactECharts from "echarts-for-react";
export default function Line() {
  const [options, setOptions] = useState({
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: "line",
      },
    ],
  });
  function updateGraph() {
    setOptions({
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [15, 20, 24, 218, 135, 147, 26],
          type: "line",
        },
      ],
    });
  }
  return (
    <div>
      <Card
        title={
          <Button
            type="primary"
            onClick={() => {
              updateGraph();
            }}
          >
            Update Graph
          </Button>
        }
      >
        <ReactECharts option={options} />
      </Card>
    </div>
  );
}
