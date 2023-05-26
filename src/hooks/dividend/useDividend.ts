import { gql, useQuery } from "@apollo/client";
import { useCallback } from "react";
import { HOOKS_STATE } from "../../constants/hooks";
import { useGetUSDJPY } from "../export/useGetUSDJPY";
import { Dividend } from "../../types/dividend.type";

export const useDividend = () => {
  // 保有株式の配当情報の取得
  const GET_DIVIDEND_LIST = gql`
    query GetDividendList {
      getDividendList {
        ticker
        dividend
        dividendTotal
        quantity
        dividendTime
        dividendMonth
      }
    }
  `;
  // 為替情報取得
  const { currentUsd } = useGetUSDJPY();
  // 保有株式情報取得
  const { data, loading: getLoading } = useQuery(GET_DIVIDEND_LIST);
  const dividendList: Dividend[] = data?.getDividendList;
  // 保有株式情報を取得する関数
  const getDividendList = useCallback(
    (selectedFx: string) => {
      const fxValue = selectedFx == "$" ? 1 : currentUsd;
      if (getLoading || fxValue === HOOKS_STATE.LOADING)
        return { dividendList: HOOKS_STATE.LOADING };
      return { dividendList };
    },
    [currentUsd, dividendList, getLoading]
  );
  return {
    getDividendList,
  };
};
