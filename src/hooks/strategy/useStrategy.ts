import { gql, useMutation, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { HOOKS_STATE } from "../../constants/hooks";
import { Strategy } from "../../types/strategy.type";

export const useStrategy = () => {
  // 取得
  const GET_STRATEGY = gql`
    query readStrategy($user: String) {
      readStrategy(user: $user) {
        id
        text
        user
        addDate
        updDate
      }
    }
  `;
  const { data: session } = useSession();
  const { data: strategyData, loading: getLoading } = useQuery(GET_STRATEGY, {
    variables: { user: session?.user?.email },
  });
  const data: Strategy = strategyData?.readStrategy;
  // 取得関数
  const getStrategy = () => {
    return getLoading ? HOOKS_STATE.LOADING : data;
  };
  // 更新
  const UPDATE_STRATEGY = gql`
    mutation UpdateStrategy($user: String!, $text: String!) {
      updateStrategy(user: $user, text: $text) {
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
        user: session?.user?.email,
        text: text,
      },
    });
  };
  return {
    getStrategy,
    updateStrategy,
    updateLoading,
  };
};