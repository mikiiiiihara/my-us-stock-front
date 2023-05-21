import { HomeContent } from "../../contents/home/homeContent";
import { createApolloClient } from "../../lib/apolloClient/apollo-client";
import { ApolloProvider } from "@apollo/client";
import { NextHead } from "../../components/common/next-head/nextHead";

const Home = () => {
  // accessTokenが取得できなかった場合、ログイン画面に飛ばす
  const apolloClient = createApolloClient();
  return (
    <ApolloProvider client={apolloClient}>
      <NextHead title="My US Stock Portfolio | Home" />
      <HomeContent />
    </ApolloProvider>
  );
};
export default Home;
