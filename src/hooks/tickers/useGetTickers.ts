import { gql, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { HOOKS_STATE } from "../../constants/hooks";
import { calculateTickerData } from "../../functions/tickers/calculateTickerData";
import { Ticker } from "../../types/ticker.type";
import { TickerData } from "../../types/tickerData.type";
import { useGetMarketData } from "../export/useGetMarketData";
import { useGetUSDJPY } from "../export/useGetUSDJPY";

export function useGetTickers(selectedFx: string) {
  const GET_TICKERS = gql`
    query GetTickers($user: String) {
      readAllTickers(user: $user) {
        id
        ticker
        getPrice
        quantity
        user
        dividend
        dividendTime
        dividendFirstTime
        sector
        usdjpy
      }
    }
  `;
  // ログイン情報
  const { data: session } = useSession();
  // 為替情報取得
  const { currentUsd } = useGetUSDJPY();
  // 保有株式情報取得
  const { data, loading } = useQuery(GET_TICKERS, {
    variables: { user: session?.user?.email },
  });
  const tickers: Ticker[] = data?.readAllTickers;
  //保有株式の現在価格を取得
  const tickerList: string[] = [];
  tickers?.forEach((ticker) => {
    tickerList.push(ticker.ticker);
  });
  const { marketData } = useGetMarketData(tickerList);
  const fxValue = selectedFx == "$" ? 1 : currentUsd;
  if (
    loading ||
    marketData === HOOKS_STATE.LOADING ||
    fxValue === HOOKS_STATE.LOADING
  )
    return { tickers: HOOKS_STATE.LOADING };
  const portfolio: TickerData = calculateTickerData(
    tickers,
    marketData,
    fxValue
  );
  return { tickers: portfolio };
}
