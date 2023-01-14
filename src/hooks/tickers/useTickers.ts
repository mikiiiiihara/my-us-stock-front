import { gql, useMutation, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useCallback } from "react";
import { HOOKS_STATE } from "../../constants/hooks";
import { calculateTickerData } from "../../functions/tickers/calculateTickerData";
import { Ticker } from "../../types/ticker.type";
import { TickerData } from "../../types/tickerData.type";
import { useGetMarketData } from "../export/useGetMarketData";
import { useGetUSDJPY } from "../export/useGetUSDJPY";

export const useTickers = () => {
  // 保有株式情報の取得
  const GET_TICKERS = gql`
    query GetTickers($user: String!) {
      getTickers(user: $user) {
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
  const { data, loading: getLoading } = useQuery(GET_TICKERS, {
    variables: { user: session?.user?.email ?? "none" },
  });
  const tickers: Ticker[] = data?.getTickers;
  //保有株式の現在価格を取得
  const tickerList: string[] = [];
  tickers?.forEach((ticker) => {
    tickerList.push(ticker.ticker);
  });
  const { marketData } = useGetMarketData(tickerList);
  // 保有株式情報を取得する関数
  const getTickers = useCallback(
    (selectedFx: string) => {
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
    },
    [currentUsd, getLoading, marketData, tickers]
  );
  // 保有株式情報の追加
  const CREATE_TICKER = gql`
    mutation CreateTicker($input: CreateTickerInput!) {
      createTicker(input: $input) {
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
  // 追加時にキャッシュする処理も実装
  const [CreateTicker, { loading: createLoading }] = useMutation(
    CREATE_TICKER,
    {
      update(cache, { data: { createTicker } }) {
        cache.modify({
          fields: {
            readAllTickers(existingTickers = []) {
              const newTickerRef = cache.writeFragment({
                data: createTicker,
                fragment: gql`
                  fragment NewTicker on Ticker {
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
                `,
              });
              return [...existingTickers, newTickerRef];
            },
          },
        });
      },
    }
  );
  // 保有株式情報を追加する関数
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
        input: {
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
      },
    });
  };
  // 保有株式情報の更新
  const UPDATE_TICKER = gql`
    mutation UpdateTicker($input: UpdateTickerInput!) {
      updateTicker(input: $input) {
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
  const [UpdateTicker, { loading: updateLoading }] = useMutation(UPDATE_TICKER);
  // 保有株式情報を更新する関数
  const executeUpdateTicker = async (
    id: number,
    getPrice: number,
    quantity: number,
    dividend: number,
    usdjpy: number
  ): Promise<void> => {
    await UpdateTicker({
      variables: {
        input: {
          id,
          getPrice,
          quantity,
          dividend,
          usdjpy,
        },
      },
    });
  };
  return {
    getTickers,
    executeCreateTicker,
    createLoading,
    executeUpdateTicker,
    updateLoading,
    currentUsd,
  };
};
