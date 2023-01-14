import { gql, useQuery } from "@apollo/client";
import { HOOKS_STATE } from "../../constants/hooks";

export function useGetUSDJPY() {
  const GET_USD = gql`
    query GetUSD {
      getCurrentUsdJpy
    }
  `;
  // 為替情報取得
  const { data, loading } = useQuery(GET_USD);
  const currentUsd: number = data?.getCurrentUsdJpy;
  return {
    currentUsd: loading ? HOOKS_STATE.LOADING : currentUsd,
  };
}
