import React, { useState } from "react";
import Image from "next/image";
import { Loading } from "../../components/common/loading/loading";
import { HOOKS_STATE } from "../../constants/hooks";
import { useGetTickers } from "../../hooks/tickers/useGetTickers";
import { SearchTicker } from "./search-ticker/search-ticker";

export const TickerContent = () => {
  // 表示する通貨
  const [fx, setFx] = useState("$");
  const changeFx = () => {
    if (fx == "$") {
      setFx("¥");
    } else if (fx == "¥") {
      setFx("$");
    }
  };
  // 保有株式情報取得
  const { tickers } = useGetTickers(fx);
  if (tickers === HOOKS_STATE.LOADING)
    return (
      <div className="home-content">
        <Loading />
      </div>
    );
  // 一覧表示用の配列をTickerでアルファベット順にソート
  const tickerDetailValue = tickers.tickerDetail.map((ticker) => {
    return ticker;
  });
  tickerDetailValue.sort(function (a, b) {
    if (a.ticker < b.ticker) return -1;
    if (a.ticker > b.ticker) return 1;
    return 0;
  });
  return (
    <div className="ticker-content">
      <SearchTicker tickers={tickerDetailValue} selectedFx={fx} />
      <button onClick={changeFx} className="primary-button fx-button-fix">
        <p className="fx-button">{fx == "$" ? "$" : "¥"}表示</p>
        <Image
          src="/fx.png"
          width={30}
          height={30}
          style={{ objectFit: "contain" }}
          alt="logo"
        />
      </button>
    </div>
  );
};
