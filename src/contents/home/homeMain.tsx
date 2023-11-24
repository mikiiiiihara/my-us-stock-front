import React, { FC } from "react";
import { TickerDetail } from "../../types/tickerDetail.type";
import { TickerData } from "../../types/tickerData.type";
import { TickerContent } from "../ticker/tickerContent";
import { SummaryContent } from "./summary/summaryContent";
import { DISPLAY_MODE } from "./homeContent";

type Props = {
  displayMode: string;
  tickerDetail: TickerDetail[];
  tickers: TickerData;
};

export const HomeMain: FC<Props> = ({ displayMode, tickerDetail, tickers }) => {
  return (
    <>
      {displayMode === DISPLAY_MODE.summary ? (
        <SummaryContent tickerDetail={tickerDetail} />
      ) : (
        <TickerContent tickers={tickers} />
      )}
    </>
  );
};
