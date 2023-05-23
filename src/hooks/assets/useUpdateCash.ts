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
        updDate
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
  const [updateCash, loading] = useMutation(UPDATE_CASH);
  const executeUpdateCash = async (
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
