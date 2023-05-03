// lib/apolloClient.ts
import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  createHttpLink,
} from "@apollo/client";
import fetch from "isomorphic-fetch";
import { IncomingMessage, ServerResponse } from "http";
import { errorLink } from "./links/error-link";

// UseApolloClientOptions タイプを定義
export type CreateApolloClientOptions = {
  req: IncomingMessage | null;
  res: ServerResponse | null;
  accessToken?: string;
};

export const createApolloClient = (options: CreateApolloClientOptions) => {
  const { req, res, accessToken } = options;
  const authLink = new ApolloLink((operation, forward) => {
    if (accessToken) {
      operation.setContext({
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }
    return forward(operation);
  });
  const httpLink = createHttpLink({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`, // GraphQL API エンドポイントを指定してください
    credentials: "same-origin",
    fetch,
  });
  const cache = new InMemoryCache();
  const client = new ApolloClient({
    link: authLink.concat(errorLink).concat(httpLink),
    cache: cache,
    ssrMode: true,
  });

  return client;
};
