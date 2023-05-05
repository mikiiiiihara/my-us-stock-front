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
  mutation login {
    login(
      loginUserInput: {
        email: "mikiwhigh1274@gmail.com"
        password: "vQBk4H.BBiwy"
      }
    ) {
      accessToken
      refreshToken
    }
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
  const [login, { data }] = useMutation<{
    login: Token;
  }>(LOGIN);
  const requestLogin = async () => {
    await login();
    router.push("/home");
  };
  useEffect(() => {
    if (!data) return;

    const { accessToken, refreshToken } = data.login;

    // Save tokens in cookie
    Cookies.set("accessToken", accessToken);
    Cookies.set("refreshToken", refreshToken);
  }, [data]);

  const logout = async () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    // ページをリロード
    router.push("/");
  };
  return {
    getUser,
    requestLogin,
    logout,
  };
};
