import { useQuery, gql, useMutation } from "@apollo/client";
import { HOOKS_STATE } from "../../constants/hooks";
import { Asset } from "../../types/asset.type";

export function useAssets() {
  // 取得
  const GET_ASSETS = gql`
    query GetAssets($day: Int!) {
      getAssets(day: $day) {
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
  // 資産情報算出
  const { data, loading, refetch } = useQuery(GET_ASSETS, {
    variables: { day: 7 },
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
    await refetch({ day });
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
  const [UpdateTodayAsset] = useMutation(UPDATE_TODAY_ASSET);
  // 更新関数
  const executeUpdateTodayAsset = async (
    id: number,
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
    mutation CreateTodayAsset {
      createTodayAsset {
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
                  updDate
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
  const executeCreateTodayAsset = async (): Promise<void> => {
    await CreateTodayAsset();
  };
  return {
    getAssets,
    changeAssetLength,
    executeUpdateTodayAsset,
    executeCreateTodayAsset,
  };
}
