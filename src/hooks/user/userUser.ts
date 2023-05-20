import { gql, useQuery } from "@apollo/client";
import { HOOKS_STATE } from "../../constants/hooks";

export const useUser = () => {
  // 取得
  const GET_USER = gql`
    query getUserName {
      getUserName
    }
  `;
  const { data: userData, loading: getLoading } = useQuery(GET_USER);
  const data: string = userData?.getUserName;
  // 取得関数
  const getUserName = () => {
    return getLoading ? HOOKS_STATE.LOADING : data;
  };
  return {
    getUserName,
  };
};
