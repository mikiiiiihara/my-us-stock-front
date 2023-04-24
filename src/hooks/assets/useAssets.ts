import { useQuery, gql, useMutation } from "@apollo/client";
import { HOOKS_STATE } from "../../constants/hooks";
import { Asset } from "../../types/asset.type";
import { useContext } from "react";
import EmailContext from "../../contexts/emailContext";

export function useAssets() {
  // 取得
  const GET_ASSETS = gql`
    query GetAssets($user: String!, $day: Int!) {
      getAssets(user: $user, day: $day) {
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
  // ログイン情報
  const { email } = useContext(EmailContext);
  // 資産情報算出
  const { data, loading, refetch } = useQuery(GET_ASSETS, {
    variables: { user: email ?? "none", day: 7 },
  });
  // 取得関数
  const getAssets = () => {
    const assets: Asset[] = data?.getAssets ?? [];
    return {
      assets: loading ? HOOKS_STATE.LOADING : assets,
    };
  };
  // クエリ表示期間を変更する
  const changeAssetLength = async (day: number) => {
    await refetch({ user: email ?? "none", day });
  };
  // 更新
  const UPDATE_TODAY_ASSET = gql`
    mutation UpdateTodayAsset($input: UpdateTodayAssetInput!) {
      updateTodayAsset(input: $input) {
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
  const [UpdateTodayAsset] = useMutation(UPDATE_TODAY_ASSET);
  // 更新関数
  const executeUpdateTodayAsset = async (
    id: number,
    asset: number,
    cashUSD: number,
    cashJPY: number,
    cashBTC: number,
    cashETH: number,
    cashRIPPLE: number,
    cashBAT: number,
    cashLTC: number
  ): Promise<void> => {
    await UpdateTodayAsset({
      variables: {
        input: {
          id,
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
  // 追加
  const CREATE_TODAY_ASSET = gql`
    mutation CreateTodayAsset($input: CreateTodayAssetInput!) {
      createTodayAsset(input: $input) {
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
  const [CreateTodayAsset] = useMutation(CREATE_TODAY_ASSET, {
    update(cache, { data: { createTodayAsset } }) {
      cache.modify({
        fields: {
          getAssets(existingAssets = []) {
            const newAssetRef = cache.writeFragment({
              data: createTodayAsset,
              fragment: gql`
                fragment NewAsset on Asset {
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
              `,
            });
            return [...existingAssets, newAssetRef];
          },
        },
      });
    },
  });
  // 新規作成関数
  const executeCreateTodayAsset = async (asset: number): Promise<void> => {
    await CreateTodayAsset({
      variables: {
        input: {
          user: email,
          asset,
        },
      },
    });
  };
  return {
    getAssets,
    changeAssetLength,
    executeUpdateTodayAsset,
    executeCreateTodayAsset,
  };
}
