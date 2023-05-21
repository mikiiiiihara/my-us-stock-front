import { FetchResult, Observable } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import axios from "axios";

const executeRefreshToken = async () => {
  let response: any;
  try {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
      withCredentials: true,
    });
  } catch (error) {
    console.error(error);
    // API処理に失敗した場合、ログイン画面に飛ばす
    if (typeof window !== "undefined") {
      window.location.href = "/";
      return;
    }
  }
  const data = await response.json();
  return data.accessToken as string;
};

export const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.extensions.code) {
          case "UNAUTHENTICATED":
            return new Observable<FetchResult>((observer) => {
              executeRefreshToken().then((accessToken) => {
                const oldHeaders = operation.getContext().headers || {};
                operation.setContext({
                  headers: {
                    ...oldHeaders,
                    authorization: `Bearer ${accessToken}`,
                  },
                });

                const subscriber = {
                  next: observer.next.bind(observer),
                  error: observer.error.bind(observer),
                  complete: observer.complete.bind(observer),
                };

                // Retry the request with the new context
                forward(operation).subscribe(subscriber);
              });
            });
          default:
        }
      }
    }

    if (networkError) console.log(`[Network error]: ${networkError}`);
  }
);
