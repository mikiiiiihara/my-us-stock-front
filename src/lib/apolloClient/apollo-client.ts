import {
  ApolloClient,
  ApolloLink,
  FetchResult,
  InMemoryCache,
  Observable,
  gql,
} from "@apollo/client";
import { httpLink } from "./links/http-link";
import { authLink } from "./links/auth-link";
import Cookies from "js-cookie";
import { onError } from "@apollo/client/link/error";
import { GraphQLError } from "graphql";
import { AccessToken } from "./types/access-token";
import { ERRORS } from "../../constants/errors";

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.extensions.code) {
          case ERRORS.UNAUTHENTICATED:
            // ignore 401 error for a refresh request and a login request
            if (operation.operationName === "refreshToken") return;

            const observable = new Observable<FetchResult<Record<string, any>>>(
              (observer) => {
                // used an annonymous function for using an async function
                (async () => {
                  try {
                    const accessToken = await refreshToken();

                    if (!accessToken) {
                      throw new GraphQLError("Empty AccessToken");
                    }

                    // Retry the failed request
                    const subscriber = {
                      next: observer.next.bind(observer),
                      error: observer.error.bind(observer),
                      complete: observer.complete.bind(observer),
                    };

                    forward(operation).subscribe(subscriber);
                  } catch (err) {
                    observer.error(err);
                    console.log("catch!");

                    // ログイン失敗の時、メッセージを表示
                    if (operation.operationName === "login")
                      alert("ID・パスワードが異なります");
                  }
                })();
              }
            );

            return observable;
        }
      }
    }

    if (networkError) console.log(`[Network error]: ${networkError}`);
  }
);

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

export const REFRESH_TOKEN = gql`
  mutation refreshToken {
    refreshToken {
      accessToken
    }
  }
`;

// Request a refresh token to then stores and returns the accessToken.
const refreshToken = async () => {
  try {
    const refreshResolverResponse = await client.mutate<{
      refreshToken: AccessToken;
    }>({
      mutation: REFRESH_TOKEN,
    });

    const accessToken = refreshResolverResponse.data?.refreshToken.accessToken;
    Cookies.set("accessToken", accessToken || "");
    return accessToken;
  } catch (err) {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    throw err;
  }
};

export const createApolloClient = () => {
  return client;
};
