import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import { AppProps } from "next/app";
import { Layout } from "../components/common/layout/layout";
import { createApolloClient } from "../lib/apolloClient/apollo-client";
import { TickerProvider } from "../contexts/tickersContext";
import { ApolloProvider } from "@apollo/client";

function App({ Component, pageProps }: AppProps) {
  const client = createApolloClient();
  return (
    <ApolloProvider client={client}>
      <TickerProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </TickerProvider>
    </ApolloProvider>
  );
}
export default App;
