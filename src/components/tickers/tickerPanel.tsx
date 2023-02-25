import React, { FC } from "react";
import { TickerDetail } from "../../types/tickerDetail.type";
import { DisplayType, TickerPanelItem } from "./tickerPanelItem";

type Props = {
  tickerDetail: TickerDetail[];
  currency: string;
  displayType?: DisplayType;
};

export const TickerPanel: FC<Props> = ({
  tickerDetail,
  currency,
  displayType,
}) => {
  return (
    <div>
      {tickerDetail.map((data) => (
        <div key={data.ticker}>
          <TickerPanelItem
            data={data}
            currency={currency}
            displayType={displayType}
          />
        </div>
      ))}
    </div>
  );
};
