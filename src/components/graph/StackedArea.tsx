import React from "react";
import { FC } from "react";
import Highcharts from "highcharts";
import exporting from "highcharts/modules/exporting";

import HighchartsMore from "highcharts/highcharts-more";

import HighchartsReact from "highcharts-react-official";
type Props = {
  themeColor: string;
  background: string;
  xData: string[];
  yData: number[];
};

const StackedAreaComponent: FC<Props> = ({
  themeColor,
  background,
  xData,
  yData,
}) => {
  if (typeof Highcharts === "object") {
    HighchartsMore(Highcharts);
    exporting(Highcharts);
  }

  const options = {
    chart: {
      type: "area",
      backgroundColor: background,
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: xData,
      crosshair: true,
    },
    yAxis: {
      title: {
        useHTML: true,
        text: "",
      },
    },
    tooltip: {
      shared: true,
      headerFormat:
        '<span style="font-size:12px"><b>{point.key}</b></span><br>',
    },
    plotOptions: {
      area: {
        stacking: "normal",
        color: themeColor,
        lineColor: themeColor,
        lineWidth: 1,
        marker: {
          lineWidth: 1,
          lineColor: "themeColor",
        },
      },
    },
    series: [
      {
        name: "資産総額",
        data: yData,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

StackedAreaComponent.displayName = "StackedArea";
export const StackedArea = React.memo(StackedAreaComponent);
