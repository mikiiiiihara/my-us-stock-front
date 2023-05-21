import { ApolloLink } from "@apollo/client";

export const createAuthLink = () => {
  return new ApolloLink((operation, forward) => {
    return forward ? forward(operation) : null;
  });
};
