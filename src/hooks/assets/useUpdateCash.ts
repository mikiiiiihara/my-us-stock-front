import { gql, useMutation } from "@apollo/client";
import { useSession } from "next-auth/react";

export function useUpdateCash() {
  const UPDATE_CASH = gql`
    mutation UpdateCash(input: UpdateCashInput!) {
      updateCash(input: $input) {
        id
        asset
        year
        month
        date
        addDate
        updDate
        user
        cashUSD
        cashJPY
      }
    }
  `;
  // ユーザー情報を取得
  const { data: session } = useSession();
  const [updateCash, loading] = useMutation(UPDATE_CASH);
  const executeUpdateCash = async (
    cashUSD: string,
    cashJPY: string,
    priceTotal: number
  ): Promise<void> => {
    await updateCash({
      variables: {
        input: {
          user: session?.user?.email,
          cashUSD: parseFloat(cashUSD),
          cashJPY: parseInt(cashJPY),
          asset: priceTotal,
        },
      },
    });
  };
  return {
    executeUpdateCash,
    loading,
  };
}
