import { GraphQLRequest } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Cookies from "js-cookie";

const isRefreshRequest = (operation: GraphQLRequest) => {
  // ヘッダーにrefreshTokenを使う場合true
  return (
    operation.operationName === "refreshToken" ||
    operation.operationName === "logout"
  );
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
