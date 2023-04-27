import { onError } from "@apollo/client/link/error";

export const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    for (const error of graphQLErrors) {
      console.log(error.extensions.code);
      console.log(error);
      if (error.extensions && error.extensions.code === "UNAUTHENTICATED") {
        if (typeof window !== "undefined") {
          window.location.href = "/login";
          return;
        }
      }
    }
  }

  return forward(operation);
});
