import { Header } from "../components/common/header/header";
import { HomeContainer } from "../contents/home/homeContainer";
import { TickerProvider } from "../contexts/tickersContext";

export default function Home() {
  return (
    <>
      <TickerProvider>
        <Header title="My US Stock Portfolio | Home" />
        <HomeContainer />
      </TickerProvider>
    </>
  );
}
