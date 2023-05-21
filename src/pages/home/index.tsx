import { HomeContent } from "../../contents/home/homeContent";
import { NextHead } from "../../components/common/next-head/nextHead";

const Home = () => {
  // const router = useRouter();

  // useEffect(() => {
  //   // パラメータredirectedがtrueならページをリロードする
  //   if (router.query.redirected === "true") {
  //     // パラメータを削除する
  //     router.replace(router.pathname);
  //   }
  // }, [router, router.query]);
  return (
    <>
      <NextHead title="My US Stock Portfolio | Home" />
      <HomeContent />
    </>
  );
};
export default Home;
