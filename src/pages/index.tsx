import Header from "../components/common/header/header";
import { HomeContent } from "../containers/home/homeContent";

export default function Home() {
  return (
    <>
      <Header title="My US Stock Portfolio | Home" />
      <HomeContent />
    </>
  );
}
