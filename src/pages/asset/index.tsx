import router from "next/router";
import { AssetContent } from "../../contents/asset/assetContent";
import { useEffect } from "react";
import { createApolloClient } from "../../lib/apolloClient/apollo-client";
import { ApolloProvider } from "@apollo/client";
import { NextHead } from "../../components/common/next-head/nextHead";

const Asset = () => {
  // accessTokenが取得できなかった場合、ログイン画面に飛ばす
  const apolloClient = createApolloClient();
  return (
    <ApolloProvider client={apolloClient}>
      <NextHead title="My US Stock Portfolio | Asset" />
      <AssetContent />
    </ApolloProvider>
  );
};

export default Asset;
