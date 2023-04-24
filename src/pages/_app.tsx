import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../components/common/layout/layout";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { TickerProvider } from "../contexts/tickersContext";
import EmailContext from "../contexts/emailContext";

export const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_API_URL}`,
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <EmailContext.Provider value={{ email: "mikiwhigh1274@gmail.com" }}>
        <TickerProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </TickerProvider>
      </EmailContext.Provider>
    </ApolloProvider>
  );
}
