// lib/apolloClient.ts
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import fetch from "isomorphic-fetch";
import { IncomingMessage } from "http";
import { errorLink } from "./links/error-link";
import { createAuthLink } from "./links/create-auth-link";

export const createApolloClient = (
  req?: IncomingMessage,
  accessToken?: string
) => {
  const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`, // GraphQL API エンドポイントを指定してください
    credentials: "same-origin",
    headers: {
      // アプリ起動時→ログイン→取得したアクセストークンを、GraphQLリクエストヘッダーにデフォルトで設定する。
      Authorization: `Bearer ${accessToken}`,
    },
    fetch: (input: RequestInfo, init?: RequestInit) => {
      if (req) {
        const cookie = req.headers.cookie || "";
        if (init) {
          init.headers = { ...init.headers, Cookie: cookie };
        } else {
          init = {
            headers: {
              Cookie: cookie,
            },
          };
        }
      }
      return fetch(input, init);
    },
  });

  const authLink = createAuthLink(req);

  return new ApolloClient({
    ssrMode: true,
    link: ApolloLink.from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        nextFetchPolicy: "cache-first",
      },
    },
    ssrForceFetchDelay: 60000,
  });
};
