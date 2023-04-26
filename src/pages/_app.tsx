import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import type { AppContext, AppInitialProps, AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { createApolloClient } from "../lib/apolloClient/apollo-client";
import { parse } from "cookie";
import { useMemo } from "react";

function App({
  Component,
  pageProps,
  accessToken,
}: AppProps & { accessToken?: string }) {
  const client = useMemo(
    () => createApolloClient(pageProps.req, accessToken),
    [accessToken, pageProps.req]
  );
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
App.getInitialProps = async (
  appContext: AppContext
): Promise<AppInitialProps & { accessToken?: string }> => {
  const pageProps = appContext.Component.getInitialProps
    ? await appContext.Component.getInitialProps(appContext.ctx)
    : {};

  let accessToken;
  if (appContext.ctx.req) {
    const cookies = parse(appContext.ctx.req.headers.cookie || "");
    accessToken = cookies["accessToken"];
  }

  return { pageProps, accessToken };
};
export default App;
