import { FC, ReactNode, useContext, createContext } from "react";
import { HOOKS_STATE } from "../constants/hooks";
import { useGetUSDJPY } from "../hooks/export/useGetUSDJPY";
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
    usdjpy: number
  ) => Promise<void>; // 保有株式情報追加関数
  createLoading: boolean; // 保有株式情報追加関数ステータス
  executeUpdateTicker: (
    id: number,
    getPrice: number,
    quantity: number,
    dividend: number,
    usdjpy: number
  ) => Promise<void>; // 保有株式情報更新関数
  updateLoading: boolean; // 保有株式情報更新関数ステータス
  currentUsd: number | Loading; // 現在のドル円
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
    createLoading,
    executeUpdateTicker,
    updateLoading,
    currentUsd,
  } = useTickers();
  return (
    <TickerContext.Provider
      value={{
        fx,
        changeFx,
        getTickers,
        executeCreateTicker,
        createLoading,
        executeUpdateTicker,
        updateLoading,
        currentUsd,
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
