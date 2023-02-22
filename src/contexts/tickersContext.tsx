import { FC, ReactNode, useContext, createContext } from "react";
import { HOOKS_STATE } from "../constants/hooks";
import { useSelectedFx } from "../hooks/selected-fx/useSelectedFx";
import { useTickers } from "../hooks/tickers/useTickers";
import { TickerData } from "../types/tickerData.type";

type Props = {
  children: ReactNode;
};
export type Loading = typeof HOOKS_STATE[keyof typeof HOOKS_STATE];

type ContextType = {
  fx: string; // 画面表示する為替の値
  changeFx: () => void; // 画面表示する為替を切り替える関数
  getTickers: (selectedFx: string) =>
    | {
        tickers: "loading";
      }
    | {
        tickers: TickerData;
      }; // 保有株式情報取得関数
  executeCreateTicker: (
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
  ) => Promise<void>; // 保有株式情報追加関数
  executeUpdateTicker: (
    id: number,
    getPrice: number,
    quantity: number,
    dividend: number,
    usdjpy: number,
    currentPrice: number,
    priceGets: number,
    currentRate: number
  ) => Promise<void>; // 保有株式情報更新関数
  currentUsd: number | Loading; // 現在のドル円
  executeDeleteTicker: (
    id: number,
    currentPrice: number,
    priceGets: number,
    currentRate: number
  ) => Promise<void>; // 保有株式情報削除関数
};
/**
 * TickerContext
 */
const TickerContext = createContext({} as ContextType);
/**
 * TickerProvider
 * @param children
 * @constructor
 */
export const TickerProvider: FC<Props> = ({ children }) => {
  // カスタムフックから状態とロジックを呼び出してコンテキストプロバイダーにあてがう
  const { fx, changeFx } = useSelectedFx();
  const {
    getTickers,
    executeCreateTicker,
    executeUpdateTicker,
    currentUsd,
    executeDeleteTicker,
  } = useTickers();
  return (
    <TickerContext.Provider
      value={{
        fx,
        changeFx,
        getTickers,
        executeCreateTicker,
        executeUpdateTicker,
        currentUsd,
        executeDeleteTicker,
      }}
    >
      {children}
    </TickerContext.Provider>
  );
};

/**
 * useTickerContext
 */
export const useTickerContext = () => useContext(TickerContext);
