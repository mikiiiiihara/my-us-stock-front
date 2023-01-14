import { useQuery, gql, useMutation } from "@apollo/client";
import { useSession } from "next-auth/react";
import { HOOKS_STATE } from "../../constants/hooks";
import { Asset } from "../../types/asset.type";

export function useAssets() {
  // 取得
  const GET_ASSETS = gql`
    query GetAssets($user: String!) {
      getAssets(user: $user) {
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
  // ログイン情報
  const { data: session } = useSession();
  // 資産情報算出
  const { data, loading } = useQuery(GET_ASSETS, {
    variables: { user: session?.user?.email ?? "none" },
  });
  // 取得関数
  const getAssets = () => {
    const assets: Asset[] = data?.getAssets ?? [];
    return {
      assets: loading ? HOOKS_STATE.LOADING : assets,
    };
  };

  // 更新
  const UPDATE_ASSET = gql`
    mutation UpdateOrCreateAsset($input: UpdateOrCreateAssetInput!) {
      updateOrCreateAsset(input: $input) {
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
  const [UpdateAsset] = useMutation(UPDATE_ASSET);
  // 更新関数
  const executeUpdateAsset = async (priceTotal: number): Promise<void> => {
    await UpdateAsset({
      variables: {
        input: {
          user: session?.user?.email,
          asset: priceTotal,
        },
      },
    });
  };
  return { getAssets, executeUpdateAsset };
}
