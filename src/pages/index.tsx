import { Header } from "../components/common/header/header";
import { HomeContent } from "../contents/home/homeContent";
import { TickerProvider } from "../contexts/tickersContext";
import { createApolloClient } from "../lib/apolloClient/apollo-client";
import { ApolloProvider } from "@apollo/client";

const Home = () => {
  const client = createApolloClient({ req: null, res: null });
  return (
    <>
      <ApolloProvider client={client}>
        <TickerProvider>
          <Header title="My US Stock Portfolio | Home" />
          <HomeContent />
        </TickerProvider>
      </ApolloProvider>
    </>
  );
};
export default Home;
