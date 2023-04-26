import React from "react";
import { FC } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { DivData } from "../../types/divData.type";

type Props = {
  divData: DivData[];
  themeColor: string[];
  background: string;
};
const StackedColumnComponent: FC<Props> = ({
  divData,
  themeColor,
  background,
}) => {
  // y軸の最大値を自動計算
  let divSum: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let div of divData) {
    for (let i = 1; i <= 12; i++) {
      divSum[i - 1] += div.data[i - 1];
    }
  }
  const max = Math.max(...divSum);
  const setMax = Math.round(max * 1) / 1 + 3;

  const options = {
    chart: {
      backgroundColor: background,
      type: "column",
    },
    colors: themeColor,
    title: {
      text: "",
    },
    exporting: { enabled: false },
    xAxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yAxis: {
      min: 0,
      max: setMax,
      title: {
        text: "dividend",
      },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: "bold",
          color: "gray",
          textOutline: "none",
        },
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      headerFormat: "<b>{point.x}</b><br/>",
      pointFormat: "{series.name}: {point.y}",
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: divData,
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

StackedColumnComponent.displayName = "StackedColumn";

export const StackedColumn = React.memo(StackedColumnComponent);
