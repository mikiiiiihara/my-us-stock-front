import { AssetContent } from "../../contents/asset/assetContent";
import { NextHead } from "../../components/common/next-head/nextHead";

const Asset = () => {
  return (
    <>
      <NextHead title="My US Stock Portfolio | Asset" />
      <AssetContent />
    </>
  );
};

export default Asset;
