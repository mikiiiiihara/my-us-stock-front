import React, { useEffect, useState } from "react";
import { SearchBar } from "../../../components/search-bar/search-bar";
import { TickerPanel } from "../../../components/tickers/tickerPanel";
import { UsStockDetail } from "../../../components/templates/assets/types";

type SearchTickerProps = {
  usStockDetails: UsStockDetail[];
  selectedFx: string;
};

export const SearchTickerComponent: React.FC<SearchTickerProps> = ({
  usStockDetails,
  selectedFx,
}) => {
  const [tickerList, setTickerList] = useState(usStockDetails);

  useEffect(() => {
    setTickerList(usStockDetails);
  }, [selectedFx, usStockDetails]);

  const search = (searchValue: string) => {
    const result = usStockDetails.filter(
      (usStockDetail) =>
        usStockDetail.code.includes(searchValue) ||
        usStockDetail.sector.includes(searchValue)
    );

    setTickerList(result.length > 0 ? result : usStockDetails);
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
