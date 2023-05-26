// lib/apolloClient.ts
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { errorLink } from "./links/error-link";

export const createApolloClient = () => {
  const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`, // GraphQL API エンドポイントを指定してください
    credentials: "include",
  });

  return new ApolloClient({
    link: ApolloLink.from([errorLink, httpLink]),
    cache: new InMemoryCache(),
  });
};
