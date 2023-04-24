import { gql, useMutation, useQuery } from "@apollo/client";
import { useCallback } from "react";
import { HOOKS_STATE } from "../../constants/hooks";
import { calculateTickerData } from "../../functions/tickers/calculateTickerData";
import { Ticker } from "../../types/ticker.type";
import { TickerData } from "../../types/tickerData.type";
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
        currentPrice
        priceGets
        currentRate
      }
    }
  `;
  // ログイン情報
  const email = "mikiwhigh1274@gmail.com";
  // 為替情報取得
  const { currentUsd } = useGetUSDJPY();
  // 保有株式情報取得
  const { data, loading: getLoading } = useQuery(GET_TICKERS, {
    variables: { user: email ?? "none" },
  });
  const tickers: Ticker[] = data?.getTickers;
  //保有株式の現在価格を取得
  const tickerList: string[] = [];
  tickers?.forEach((ticker) => {
    tickerList.push(ticker.ticker);
  });
  // 保有株式情報を取得する関数
  const getTickers = useCallback(
    (selectedFx: string) => {
      const fxValue = selectedFx == "$" ? 1 : currentUsd;
      if (getLoading || fxValue === HOOKS_STATE.LOADING)
        return { tickers: HOOKS_STATE.LOADING };
      const portfolio: TickerData = calculateTickerData(tickers, fxValue);
      return { tickers: portfolio };
    },
    [currentUsd, getLoading, tickers]
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
        currentPrice
        priceGets
        currentRate
      }
    }
  `;
  // 追加時にキャッシュする処理も実装
  const [CreateTicker] = useMutation(CREATE_TICKER, {
    update(cache, { data: { createTicker } }) {
      cache.modify({
        fields: {
          getTickers(existingTickers = []) {
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
                  currentPrice
                  priceGets
                  currentRate
                }
              `,
            });
            return [...existingTickers, newTickerRef];
          },
        },
      });
    },
  });
  // 保有株式情報を追加する関数
  const executeCreateTicker = async (
    ticker: string,
    getPrice: number,
    quantity: number,
    dividend: number,
    dividendTime: number,
    dividendFirstTime: number,
    sector: string,
    usdjpy: number,
    currentPrice: number,
    priceGets: number,
    currentRate: number
  ): Promise<void> => {
    await CreateTicker({
      variables: {
        input: {
          ticker,
          getPrice,
          quantity,
          user: email,
          dividend,
          dividendTime,
          dividendFirstTime,
          sector,
          usdjpy,
          currentPrice,
          priceGets,
          currentRate,
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
        currentPrice
        priceGets
        currentRate
      }
    }
  `;
  const [UpdateTicker] = useMutation(UPDATE_TICKER);
  // 保有株式情報を更新する関数
  const executeUpdateTicker = async (
    id: number,
    getPrice: number,
    quantity: number,
    dividend: number,
    usdjpy: number,
    currentPrice: number,
    priceGets: number,
    currentRate: number
  ): Promise<void> => {
    await UpdateTicker({
      variables: {
        input: {
          id,
          getPrice,
          quantity,
          dividend,
          usdjpy,
          currentPrice,
          priceGets,
          currentRate,
        },
      },
    });
  };

  // 保有株式情報の削除
  const DELETE_TICKER = gql`
    mutation DeleteTicker($input: UpdateTickerInput!) {
      deleteTicker(input: $input) {
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
        currentPrice
        priceGets
        currentRate
      }
    }
  `;
  const [DeleteTicker] = useMutation(DELETE_TICKER, {
    update(cache, data) {
      cache.modify({
        fields: {
          getTickers(existing = [], { readField }) {
            const newTickerList = existing.filter((item: any) => {
              return readField("id", item) !== data.data?.deleteTicker?.id;
            });
            return [...newTickerList];
          },
        },
      });
    },
  });
  // 保有株式情報を更新する関数
  const executeDeleteTicker = async (
    id: number,
    currentPrice: number,
    priceGets: number,
    currentRate: number
  ): Promise<void> => {
    await DeleteTicker({
      variables: {
        input: {
          id,
          currentPrice,
          priceGets,
          currentRate,
        },
      },
    });
  };
  return {
    getTickers,
    executeCreateTicker,
    executeUpdateTicker,
    currentUsd,
    executeDeleteTicker,
  };
};
