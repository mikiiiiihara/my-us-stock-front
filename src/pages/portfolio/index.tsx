import Header from "../../components/common/header/header";
import { TickerContent } from "../../contents/portfolio/tickerContent";

export default function Portfolio() {
  return (
    <>
      <Header title="My US Stock Portfolio | Portfolio" />
      <TickerContent tickerDetail={[]} currency={""} />
    </>
  );
}
