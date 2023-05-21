// lib/apolloClient.ts
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { errorLink } from "./links/error-link";
import { createAuthLink } from "./links/auth-link";

export const createApolloClient = () => {
  const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`, // GraphQL API エンドポイントを指定してください
    credentials: "include",
  });

  const authLink = createAuthLink();

  return new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
  });
};
