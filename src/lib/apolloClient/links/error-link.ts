import { FetchResult, Observable } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const executeRefreshToken = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SELF_BASE_URL}/api/refresh`
  );
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
        }
      }
    }

    if (networkError) console.log(`[Network error]: ${networkError}`);
  }
);
