import React from "react";
import { FC } from "react";
import Highcharts from "highcharts";
import exporting from "highcharts/modules/exporting";

import HighchartsMore from "highcharts/highcharts-more";

import HighchartsReact from "highcharts-react-official";
import { PieData } from "../../types/pieData.type";

type Props = {
  pieData: PieData[];
  themeColor: string[];
  background: string;
};

const PieComponent: FC<Props> = ({ pieData, themeColor, background }) => {
  if (typeof Highcharts === "object") {
    HighchartsMore(Highcharts);
    exporting(Highcharts);
  }

  const options = {
    chart: {
      backgroundColor: background,
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    title: {
      text: "",
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
        allowPointSelect: false,
        cursor: "pointer",
        colors: themeColor,
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b><br>{point.percentage:.1f} %",
          distance: -50,
          filter: {
            property: "percentage",
            operator: ">",
            value: 4,
          },
        },
      },
    },
    series: [
      {
        name: "Share",
        data: pieData,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};
PieComponent.displayName = "Pie";

export const Pie = React.memo(PieComponent);
