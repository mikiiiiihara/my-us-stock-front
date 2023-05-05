import { GraphQLRequest } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Cookies from "js-cookie";

const isRefreshRequest = (operation: GraphQLRequest) => {
  return operation.operationName === "refreshToken";
};
// Returns accesstoken if opoeration is not a refresh token request
const returnTokenDependingOnOperation = (operation: GraphQLRequest) => {
  if (isRefreshRequest(operation)) return Cookies.get("refreshToken") || "";
  else return Cookies.get("accessToken") || "";
};

export const authLink = setContext((operation, { headers }) => {
  let token = returnTokenDependingOnOperation(operation);

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
