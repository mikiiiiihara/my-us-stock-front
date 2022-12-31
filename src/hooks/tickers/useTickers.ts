import { gql, useMutation, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { HOOKS_STATE } from "../../constants/hooks";
import { calculateTickerData } from "../../functions/tickers/calculateTickerData";
import { Ticker } from "../../types/ticker.type";
import { TickerData } from "../../types/tickerData.type";
import { useGetMarketData } from "../export/useGetMarketData";
import { useGetUSDJPY } from "../export/useGetUSDJPY";

export function useTickers() {
  // 保有株式情報の取得
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
  const {
    data,
    loading: getLoading,
    refetch,
  } = useQuery(GET_TICKERS, {
    variables: { user: session?.user?.email },
  });
  const tickers: Ticker[] = data?.readAllTickers;
  //保有株式の現在価格を取得
  const tickerList: string[] = [];
  tickers?.forEach((ticker) => {
    tickerList.push(ticker.ticker);
  });
  const { marketData } = useGetMarketData(tickerList);
  // 保有株式情報を取得する関数
  const getTickers = (selectedFx: string) => {
    const fxValue = selectedFx == "$" ? 1 : currentUsd;
    if (
      getLoading ||
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
  };
  // 保有株式情報の追加
  const CREATE_TICKER = gql`
    mutation createTicker(
      $ticker: String!
      $getPrice: Float!
      $quantity: Int!
      $user: String!
      $dividend: Float!
      $dividendTime: Int!
      $dividendFirstTime: Int!
      $sector: String!
      $usdjpy: Float!
    ) {
      createTicker(
        ticker: $ticker
        getPrice: $getPrice
        quantity: $quantity
        user: $user
        dividend: $dividend
        dividendTime: $dividendTime
        dividendFirstTime: $dividendFirstTime
        sector: $sector
        usdjpy: $usdjpy
      ) {
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
  const [CreateTicker, loading] = useMutation(CREATE_TICKER);
  const executeCreateTicker = async (
    ticker: string,
    getPrice: number,
    quantity: number,
    dividend: number,
    dividendTime: number,
    dividendFirstTime: number,
    sector: string,
    usdjpy: number
  ): Promise<void> => {
    await CreateTicker({
      variables: {
        ticker,
        getPrice,
        quantity,
        user: session?.user?.email,
        dividend,
        dividendTime,
        dividendFirstTime,
        sector,
        usdjpy,
      },
    });
    // TODO: 画面側でのuseState管理が実装できたら削除する
    refetch({ user: session?.user?.email });
  };
  // 保有株式情報を追加する関数
  return { getTickers, executeCreateTicker, createLoading: loading };
}
