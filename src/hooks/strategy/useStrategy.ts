import { gql, useMutation, useQuery } from "@apollo/client";
import { HOOKS_STATE } from "../../constants/hooks";
import { Strategy } from "../../types/strategy.type";

export const useStrategy = () => {
  // 取得
  const GET_STRATEGY = gql`
    query getStrategy($user: String!) {
      getStrategy(user: $user) {
        id
        text
        user
        addDate
        updDate
      }
    }
  `;
  const email = "mikiwhigh1274@gmail.com";
  const { data: strategyData, loading: getLoading } = useQuery(GET_STRATEGY, {
    variables: { user: email ?? "none" },
  });
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
        user
        addDate
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
          user: email,
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
