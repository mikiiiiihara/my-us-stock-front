import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  console.log(`${process.env.NEXT_PUBLIC_API_URL}/auth`);
  return <Component {...pageProps} />;
}
export default App;
