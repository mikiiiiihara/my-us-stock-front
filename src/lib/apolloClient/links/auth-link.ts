import { ApolloLink } from "@apollo/client";
import { IncomingMessage } from "http";

export const createAuthLink = (accessToken: string, req?: IncomingMessage) => {
  return new ApolloLink((operation, forward) => {
    if (req) {
      const headers = operation.getContext().headers || {};
      operation.setContext({
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      });
    }
    return forward ? forward(operation) : null;
  });
};
