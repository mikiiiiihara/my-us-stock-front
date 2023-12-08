import { NextHead } from "../../components/common/next-head/nextHead";
import { AssetContent } from "../../contents/asset/assetContent";

const Home = () => {
  return (
    <>
      <NextHead title="My US Stock Portfolio | Home" />
      <AssetContent />
    </>
  );
};
export default Home;
