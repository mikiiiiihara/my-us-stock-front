import Header from "../components/common/header/header";
import { DividendContent } from "../contents/dividend/dividendContent";
import { HomeContent } from "../contents/home/homeContent";
import { StrategyContent } from "../contents/home/strategy/strategyContent";

export default function Home() {
  return (
    <>
      <Header title="My US Stock Portfolio | Home" />
      <HomeContent />
      <StrategyContent />
      <DividendContent />
    </>
  );
}
