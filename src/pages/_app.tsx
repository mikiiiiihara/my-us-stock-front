import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import { AppProps } from "next/app";
import { TickerProvider } from "../contexts/tickersContext";

function App({ Component, pageProps }: AppProps) {
  return (
    <TickerProvider>
      <Component {...pageProps} />
    </TickerProvider>
  );
}
export default App;
