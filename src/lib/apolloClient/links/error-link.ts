import { onError } from "@apollo/client/link/error";

const executeRefreshToken = async () => {
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
    credentials: "include", // Send the cookies
    // Other settings...
  })
    .then((response) => {
      // レスポンスが 400 または 500 の範囲にある場合、エラーとして処理します
      if (response.status >= 400 && response.status < 600) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then((data) => {
      if (data.success) {
        // Redirect to the /home page
        window.location.href = "/home";
      } else {
        // Handle the error
        console.error(data.message);
      }
    })
    .catch((error) => {
      console.error(error);
      // ログイン画面にリダイレクトします
      if (typeof window !== "undefined") {
        window.location.href = "/";
        return;
      }
    });
};

export const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      switch (err.extensions.code) {
        case "UNAUTHENTICATED":
          executeRefreshToken();
          break;
        default:
          console.log(`[GraphQL error]: ${err.message}`);
          // ポップアップを表示
          alert(`${err.message}`);
          break;
      }
    }
  }

  if (networkError) console.log(`[Network error]: ${networkError}`);
});
