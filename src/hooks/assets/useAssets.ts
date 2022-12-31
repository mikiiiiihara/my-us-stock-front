import { useQuery, gql } from "@apollo/client";
import { useSession } from "next-auth/react";
import { HOOKS_STATE } from "../../constants/hooks";
import { Asset } from "../../types/asset.type";

export function useAssets() {
  const GET_ASSETS = gql`
    query GetAssets($user: String) {
      readAllAssets(user: $user) {
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
    variables: { user: session?.user?.email },
  });
  const assets: Asset[] = data?.readAllAssets ?? [];
  return {
    assets: loading ? HOOKS_STATE.LOADING : assets,
  };
}
