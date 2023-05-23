import { gql, useMutation, useQuery } from "@apollo/client";
import { HOOKS_STATE } from "../../constants/hooks";
import { Strategy } from "../../types/strategy.type";

export const useStrategy = () => {
  // 取得
  const GET_STRATEGY = gql`
    query getStrategy {
      getStrategy {
        id
        text
        updDate
      }
    }
  `;
  const { data: strategyData, loading: getLoading } = useQuery(GET_STRATEGY);
  const data: Strategy = strategyData?.getStrategy;
  // 取得関数
  const getStrategy = () => {
    return getLoading ? HOOKS_STATE.LOADING : data;
  };
  // 更新
  const UPDATE_STRATEGY = gql`
    mutation UpdateStrategy($input: UpdateStrategyInput!) {
      updateStrategy(input: $input) {
        id
        text
        updDate
      }
    }
  `;
  const [UpdateStrategy, updateLoading] = useMutation(UPDATE_STRATEGY);
  // 更新関数
  const updateStrategy = async (text: string) => {
    await UpdateStrategy({
      variables: {
        input: {
          text: text,
        },
      },
    });
  };
  return {
    getStrategy,
    updateStrategy,
    updateLoading,
  };
};
