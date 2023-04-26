import React from "react";
import { FC } from "react";
import Highcharts from "highcharts";

import HighchartsMore from "highcharts/highcharts-more";

import HighchartsReact from "highcharts-react-official";

type Props = {
  values: { name: string; value: number }[];
  themeColor: string[];
  background: string;
};

const SemiCircleComponent: FC<Props> = ({ values, themeColor, background }) => {
  if (typeof Highcharts === "object") {
    HighchartsMore(Highcharts);
  }

  const options = {
    chart: {
      backgroundColor: background,
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
    },
    colors: themeColor,
    exporting: { enabled: false },
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
        name: "資産割合",
        innerSize: "50%",
        data: values.map((value) => [value.name, value.value]),
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

SemiCircleComponent.displayName = "SemiCircle";

export const SemiCircle = React.memo(SemiCircleComponent);
