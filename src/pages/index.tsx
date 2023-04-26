import { Header } from "../components/common/header/header";
import { HomeContent } from "../contents/home/homeContent";
import { TickerProvider } from "../contexts/tickersContext";

export default function Home() {
  return (
    <>
      <TickerProvider>
        <Header title="My US Stock Portfolio | Home" />
        <HomeContent />
      </TickerProvider>
    </>
  );
}
