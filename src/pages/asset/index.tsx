import { Header } from "../../components/common/header/header";
import { AssetContent } from "../../contents/asset/assetContent";
import { createApolloClient } from "../../lib/apolloClient/apollo-client";
import { ApolloProvider } from "@apollo/client";

const Asset = () => {
  const client = createApolloClient({ req: null, res: null });
  return (
    <>
      <ApolloProvider client={client}>
        <Header title="My US Stock Portfolio | Asset" />
        <AssetContent />
      </ApolloProvider>
    </>
  );
};

export default Asset;
