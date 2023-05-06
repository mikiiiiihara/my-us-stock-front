import { gql, useMutation, useQuery } from "@apollo/client";
import Cookies from "js-cookie";
import router from "next/router";
import { useEffect } from "react";
import { User } from "../../types/user";
import { Token } from "../../types/token";
import { HOOKS_STATE } from "../../constants/hooks";

const GET_USER = gql`
  query user {
    user {
      id
      email
      name
    }
  }
`;

const LOGIN = gql`
  mutation login($input: LoginUserInput!) {
    login(loginUserInput: $input) {
      accessToken
      refreshToken
    }
  }
`;

const LOGOUT = gql`
  mutation logout {
    logout
  }
`;

export const useAuth = () => {
  const { data: meData, loading } = useQuery(GET_USER);
  // 取得関数
  const getUser = () => {
    const user: User = meData?.user;
    if (loading) return { user: HOOKS_STATE.LOADING };
    return { user };
  };
  // ログイン
  const [login, { data }] = useMutation<{
    login: Token;
  }>(LOGIN);
  const requestLogin = async (email: string, password: string) => {
    await login({
      variables: {
        input: {
          email,
          password,
        },
      },
    });
    router.push("/home");
  };
  useEffect(() => {
    if (!data) return;

    const { accessToken, refreshToken } = data.login;

    // Save tokens in cookie
    Cookies.set("accessToken", accessToken);
    Cookies.set("refreshToken", refreshToken);
  }, [data]);

  // ログアウト
  const [logout] = useMutation(LOGOUT);
  // ログアウト関数
  const executeLogout = async () => {
    await logout();
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    // トップへ戻る
    router.push("/");
  };
  return {
    getUser,
    requestLogin,
    executeLogout,
  };
};