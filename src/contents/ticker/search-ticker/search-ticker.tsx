import React, { useEffect, useState } from "react";
import { SearchBar } from "../../../components/search-bar/search-bar";
import { TickerPanel } from "../../../components/tickers/tickerPanel";
import { TickerDetail } from "../../../types/tickerDetail.type";

type SearchTickerProps = {
  tickers: TickerDetail[];
  selectedFx: string;
};

export const SearchTickerComponent: React.FC<SearchTickerProps> = ({
  tickers,
  selectedFx,
}) => {
  const [tickerList, setTickerList] = useState(tickers);

  useEffect(() => {
    setTickerList(tickers);
  }, [selectedFx, tickers]);

  const search = (searchValue: string) => {
    const result = tickers.filter(
      (ticker) =>
        ticker.ticker.includes(searchValue) ||
        ticker.sector.includes(searchValue)
    );

    setTickerList(result.length > 0 ? result : tickers);
  };

  return (
    <>
      <SearchBar placeholder="銘柄名、セクターを検索" search={search} />
      <TickerPanel tickerDetail={tickerList} currency={selectedFx} />
      <div className="clear-both"></div>
    </>
  );
};

SearchTickerComponent.displayName = "SearchTicker";
export const SearchTicker = React.memo(SearchTickerComponent);
