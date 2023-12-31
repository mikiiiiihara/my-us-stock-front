import { FC, ReactNode, useContext, createContext } from "react";
import { useSelectedFx } from "../hooks/selected-fx/useSelectedFx";

type Props = {
  children: ReactNode;
};
type ContextType = {
  fx: string; // 画面表示する為替の値
  changeFx: () => void; // 画面表示する為替を切り替える関数
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
  return (
    <TickerContext.Provider
      value={{
        fx,
        changeFx,
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
