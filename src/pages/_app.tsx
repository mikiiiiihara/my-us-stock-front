import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import "../styles/home-content.scss";
import "../styles/strategy-content.scss";
import "../styles/asset-content.scss";
import "../styles/dividend-content.scss";
import "../styles/ticker-content.scss";
import "../styles/sector-content.scss";
import type { AppProps } from "next/app";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Layout } from "../components/common/layout/layout";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { TickerProvider } from "../contexts/tickersContext";

export const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_API_URL}`,
  cache: new InMemoryCache(),
});

export default function App({
  Component,
  pageProps,
}: AppProps<{ session: Session }>) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={pageProps.session}>
        <TickerProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </TickerProvider>
      </SessionProvider>
    </ApolloProvider>
  );
}
