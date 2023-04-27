import { GetServerSideProps } from "next";
import { Header } from "../../components/common/header/header";
import { AssetContent } from "../../contents/asset/assetContent";
import { parse } from "cookie";
import { createApolloClient } from "../../lib/apolloClient/apollo-client";
import { ApolloProvider } from "@apollo/client";

const Asset: React.FC<{ accessToken: string }> = ({ accessToken }) => {
  const client = createApolloClient({ req: null, res: null, accessToken });
  return (
    <>
      <ApolloProvider client={client}>
        <Header title="My US Stock Portfolio | Asset" />
        <AssetContent />
      </ApolloProvider>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = parse(context.req.headers.cookie || "");
  const accessToken = cookies["accessToken"] || null;

  return {
    props: {
      accessToken,
    },
  };
};

export default Asset;
