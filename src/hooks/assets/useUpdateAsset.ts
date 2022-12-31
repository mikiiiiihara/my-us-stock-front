import { gql, useMutation } from "@apollo/client";
import { useSession } from "next-auth/react";

export const UPDATE_ASSET = gql`
  mutation UpdateAsset($user: String!, $asset: Float!) {
    updateAsset(user: $user, asset: $asset) {
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
export function useUpdateAsset() {
  // ユーザー情報を取得
  const { data: session } = useSession();
  const [UpdateAsset, loading] = useMutation(UPDATE_ASSET);
  const executeUpdateAsset = async (priceTotal: number): Promise<void> => {
    await UpdateAsset({
      variables: {
        user: session?.user?.email,
        asset: priceTotal,
      },
    });
  };
  return {
    executeUpdateAsset,
    loading,
  };
}
