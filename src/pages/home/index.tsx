import router from "next/router";
import { Header } from "../../components/common/header/header";
import { HomeContent } from "../../contents/home/homeContent";
import { GetServerSideProps } from "next";
import { parse } from "cookie";
import { useEffect } from "react";
import { createApolloClient } from "../../lib/apolloClient/apollo-client";
import { ApolloProvider } from "@apollo/client";
import { NextHead } from "../../components/common/next-head/nextHead";

type Props = {
  accessToken?: string;
};

const Home = (props: Props) => {
  // accessTokenが取得できなかった場合、ログイン画面に飛ばす
  useEffect(() => {
    if (props.accessToken == null || props.accessToken.length === 0)
      router.push("/");
  }, [props.accessToken]);
  const apolloClient = createApolloClient(undefined, props.accessToken);
  return (
    <ApolloProvider client={apolloClient}>
      <NextHead title="My US Stock Portfolio | Home" />
      <HomeContent />
    </ApolloProvider>
  );
};
export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  let accessToken = "";
  if (context.req.headers.cookie) {
    const cookies = parse(context.req.headers.cookie);
    accessToken = cookies["accessToken"]; // Remove const before accessToken here
  }

  return {
    props: {
      accessToken,
    },
  };
};
