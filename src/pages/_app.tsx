import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import "../styles/header.scss";
import "../styles/home-content.scss";
import "../styles/ticker-panel-item.scss";
import type { AppProps } from "next/app";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Layout } from "../components/common/layout/layout";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://asia-northeast1-my-stock-be-b1b1f.cloudfunctions.net/api/graphql",
  // uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

export default function App({
  Component,
  pageProps,
}: AppProps<{ session: Session }>) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={pageProps.session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </ApolloProvider>
  );
}
