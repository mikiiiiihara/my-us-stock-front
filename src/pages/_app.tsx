import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import { AppProps } from "next/app";
import { TickerProvider } from "../contexts/tickersContext";
import { ApolloProvider } from "@apollo/client";
import { createApolloClient } from "../lib/apolloClient/apollo-client";

function App({ Component, pageProps }: AppProps) {
  const apolloClient = createApolloClient();
  return (
    <ApolloProvider client={apolloClient}>
      <TickerProvider>
        <Component {...pageProps} />
      </TickerProvider>
    </ApolloProvider>
  );
}
export default App;
