import { TopContent } from "../contents/top/topContent";
import { NextHead } from "../components/common/next-head/nextHead";

const Top = () => {
  // accessTokenが取得できた場合、Home画面に飛ばす
  return (
    <>
      <NextHead title="My US Stock Portfolio | Top" />
      <TopContent />
    </>
  );
};
export default Top;
