import { HomeContent } from "../../contents/home/homeContent";
import { NextHead } from "../../components/common/next-head/nextHead";

const Home = () => {
  return (
    <>
      <NextHead title="My US Stock Portfolio | Home" />
      <HomeContent />
    </>
  );
};
export default Home;
