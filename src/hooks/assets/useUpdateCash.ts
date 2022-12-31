import { gql, useMutation } from "@apollo/client";
import { useSession } from "next-auth/react";

export function useUpdateCash() {
  const UPDATE_CASH = gql`
    mutation UpdateCash(
      $user: String!
      $cashUSD: Float!
      $cashJPY: Int!
      $priceTotal: Float!
    ) {
      updateCash(
        user: $user
        cashUSD: $cashUSD
        cashJPY: $cashJPY
        priceTotal: $priceTotal
      ) {
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
        user: session?.user?.email,
        cashUSD: parseFloat(cashUSD),
        cashJPY: parseInt(cashJPY),
        priceTotal: priceTotal,
      },
    });
  };
  return {
    executeUpdateCash,
    loading,
  };
}
