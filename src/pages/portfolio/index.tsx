import Header from "../../components/common/header/header";
import { TickerContent } from "../../contents/ticker/tickerContent";

export default function Portfolio() {
  return (
    <>
      <Header title="My US Stock Portfolio | Portfolio" />
      <TickerContent />
    </>
  );
}
