import { gql, useMutation } from "@apollo/client";

export function useUpdateCash() {
  const UPDATE_CASH = gql`
    mutation UpdateCash($input: UpdateCashInput!) {
      updateCash(input: $input) {
        id
        total
        asset
        year
        month
        date
        addDate
        updDate
        user
        cashUSD
        cashJPY
        cashBTC
        cashETH
        cashRIPPLE
        cashBAT
        cashLTC
      }
    }
  `;
  // ユーザー情報を取得
  const email = "mikiwhigh1274@gmail.com";
  const [updateCash, loading] = useMutation(UPDATE_CASH);
  const executeUpdateCash = async (
    asset: number,
    cashUSD: number,
    cashJPY: number,
    cashBTC: number,
    cashETH: number,
    cashRIPPLE: number,
    cashBAT: number,
    cashLTC: number
  ): Promise<void> => {
    await updateCash({
      variables: {
        input: {
          user: email,
          asset,
          cashUSD,
          cashJPY,
          cashBTC,
          cashETH,
          cashRIPPLE,
          cashBAT,
          cashLTC,
        },
      },
    });
  };
  return {
    executeUpdateCash,
    loading,
  };
}
