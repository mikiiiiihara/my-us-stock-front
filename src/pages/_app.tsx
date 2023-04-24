import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import type { AppContext, AppInitialProps, AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { TickerProvider } from "../contexts/tickersContext";
import { createApolloClient } from "../lib/apolloClient/apollo-client";
import { parse } from "cookie";

function App({
  Component,
  pageProps,
  accessToken,
  email,
}: AppProps & { accessToken?: string; email?: string }) {
  const client = createApolloClient(pageProps.req, accessToken);
  return (
    <ApolloProvider client={client}>
      <TickerProvider>
        <Component {...pageProps} />
      </TickerProvider>
    </ApolloProvider>
  );
}
App.getInitialProps = async (
  appContext: AppContext
): Promise<AppInitialProps & { accessToken?: string; email?: string }> => {
  const pageProps = appContext.Component.getInitialProps
    ? await appContext.Component.getInitialProps(appContext.ctx)
    : {};

  let accessToken;
  let email;
  if (appContext.ctx.req) {
    const cookies = parse(appContext.ctx.req.headers.cookie || "");
    accessToken = cookies["accessToken"];
    email = cookies["email"];
  }

  return { pageProps, accessToken, email };
};
export default App;
