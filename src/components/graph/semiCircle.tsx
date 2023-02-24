import React from "react";
import { FC } from "react";
import Highcharts from "highcharts";

import exporting from "highcharts/modules/exporting";

import HighchartsMore from "highcharts/highcharts-more";

import HighchartsReact from "highcharts-react-official";

type Props = {
  value1: { name: string; value: number };
  value2: { name: string; value: number };
  themeColor: string[];
  background: string;
};

const SemiCircle: FC<Props> = ({ value1, value2, themeColor, background }) => {
  if (typeof Highcharts === "object") {
    HighchartsMore(Highcharts);
    exporting(Highcharts);
  }

  const options = {
    chart: {
      backgroundColor: background,
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
    },
    colors: themeColor,
    title: {
      text: "",
      align: "center",
      verticalAlign: "middle",
      y: 60,
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          distance: -50,
          style: {
            fontWeight: "bold",
            color: "white",
          },
        },
        startAngle: -90,
        endAngle: 90,
        center: ["50%", "75%"],
        size: "110%",
      },
    },
    series: [
      {
        type: "pie",
        name: "Cash vs Stock",
        innerSize: "50%",
        data: [
          [value1.name, value1.value],
          [value2.name, value2.value],
        ],
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default SemiCircle;
