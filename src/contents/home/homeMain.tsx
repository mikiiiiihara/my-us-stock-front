import React, { FC } from "react";
import { TickerContent } from "../ticker/tickerContent";
import { SummaryContent } from "./summary/summaryContent";
import {
  UsStockDetail,
  UsStockSummary,
} from "../../components/templates/assets/types";

type Props = {
  displayMode: string;
  usStockDetail: UsStockDetail[];
  usStockSummary: UsStockSummary;
};

const DISPLAY_MODE = {
  summary: "summary",
  detail: "detail",
};

export const HomeMain: FC<Props> = ({
  displayMode,
  usStockDetail,
  usStockSummary,
}) => {
  return (
    <>
      {displayMode === DISPLAY_MODE.summary ? (
        <SummaryContent usStockDetail={usStockDetail} />
      ) : (
        <TickerContent usStockSummary={usStockSummary} />
      )}
    </>
  );
};
