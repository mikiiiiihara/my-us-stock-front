import React, { FC } from "react";
import { TickerDetail } from "../../types/tickerDetail.type";
import { TickerPanelItem } from "./tickerPanelItem";

type Props = {
  tickerDetail: TickerDetail[];
  currency: string;
  displayType?: string;
};

export const TickerPanel: FC<Props> = ({
  tickerDetail,
  currency,
  displayType,
}) => {
  return (
    <div className="ticker-panel">
      {tickerDetail.map((data) => (
        <div key={data.ticker}>
          <TickerPanelItem
            data={data || []}
            currency={currency}
            displayType={displayType}
          />
        </div>
      ))}
    </div>
  );
};
