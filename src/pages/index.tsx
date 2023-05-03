import { GetServerSideProps } from "next";
import { Header } from "../components/common/header/header";
import { HomeContent } from "../contents/home/homeContent";
import { TickerProvider } from "../contexts/tickersContext";
import { parse } from "cookie";
import { createApolloClient } from "../lib/apolloClient/apollo-client";
import { ApolloProvider } from "@apollo/client";
import Cookies from "js-cookie";

const Home: React.FC<{ accessToken: string }> = ({ accessToken }) => {
  const token = Cookies.get("accessToken");
  console.log(token);
  const client = createApolloClient({ req: null, res: null, accessToken });
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
export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = parse(context.req.headers.cookie || "");
  const accessToken = cookies["accessToken"] || null;
  console.log("serverside:");
  console.log(context.req.headers.cookie);
  const token = Cookies.get("accessToken");
  console.log(token);
  return {
    props: {
      accessToken,
    },
  };
};

export default Home;
