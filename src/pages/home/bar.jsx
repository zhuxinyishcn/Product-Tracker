import React from "react";
import { Card } from "antd";
import ReactECharts from "echarts-for-react";
import graph from "./bus.json";
export default function Bar() {
  const option = {
    tooltip: {},
    legend: [
      {
        data: graph.categories.map(function (a) {
          return a.name;
        }),
      },
    ],
    series: [
      {
        name: "Les Miserables",
        type: "graph",
        layout: "none",
        data: graph.nodes,
        links: graph.links,
        categories: graph.categories,
        roam: true,
        label: {
          show: true,
          position: "right",
          formatter: "{b}",
        },
        labelLayout: {
          hideOverlap: true,
        },
        scaleLimit: {
          min: 0.4,
          max: 2,
        },
        lineStyle: {
          color: "source",
          curveness: 0.3,
        },
      },
    ],
  };
  return (
    <div>
      <Card size="small">
        <ReactECharts option={option} />
      </Card>
    </div>
  );
}
