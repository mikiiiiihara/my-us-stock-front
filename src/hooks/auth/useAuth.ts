import { gql, useMutation, useQuery } from "@apollo/client";
import Cookies from "js-cookie";
import router from "next/router";
import { useEffect } from "react";
import { User } from "../../types/user";
import { Token } from "../../types/token";
import { HOOKS_STATE } from "../../constants/hooks";

export const useAuth = () => {
  const GET_USER = gql`
    query user {
      user {
        id
        email
        name
      }
    }
  `;

  const { data: meData, loading } = useQuery(GET_USER);
  // 取得関数
  const getUser = () => {
    const user: User = meData?.user;
    if (loading) return { user: HOOKS_STATE.LOADING };
    return { user };
  };
  const LOGIN = gql`
    mutation login($input: LoginUserInput!) {
      login(loginUserInput: $input) {
        accessToken
        refreshToken
      }
    }
  `;
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

  const LOGOUT = gql`
    mutation logout {
      logout
    }
  `;
  // ログアウト
  const [logout] = useMutation(LOGOUT);
  // ログアウト関数
  const executeLogout = async () => {
    await logout();
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
  };

  // ユーザー新規登録
  const CREATE_USER = gql`
    mutation createUser($data: UserCreateInput!) {
      createUser(data: $data) {
        id
        email
        name
      }
    }
  `;
  const [createuser] = useMutation(CREATE_USER);
  const executeCreateUser = async (
    email: string,
    name: string,
    password: string
  ) => {
    await createuser({
      variables: {
        data: {
          email,
          name,
          password,
        },
      },
    });
  };
  return {
    getUser,
    requestLogin,
    executeLogout,
    executeCreateUser,
  };
};
