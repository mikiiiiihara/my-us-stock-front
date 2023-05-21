import { onError } from "@apollo/client/link/error";
import axios, { AxiosError } from "axios";

const executeRefreshToken = async () => {
  try {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
      withCredentials: true,
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // 400番台または500番台のエラーの場合のみログイン画面に飛ばす
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 600
      ) {
        if (typeof window !== "undefined") {
          window.location.href = "/";
          return;
        }
      }
    }
    console.error(error);
  }
};

export const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.extensions.code) {
          case "UNAUTHENTICATED":
            executeRefreshToken();
            break;
          default:
            // TODO: エラー画面に飛ばすようにしたい
            console.log(`[GraphQL error]: ${err.message}`);
            break;
        }
      }
    }

    if (networkError) console.log(`[Network error]: ${networkError}`);
  }
);
