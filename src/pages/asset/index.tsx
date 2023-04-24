import Header from "../../components/common/header/header";
import { AssetContent } from "../../contents/asset/assetContent";
import { TickerProvider } from "../../contexts/tickersContext";

export default function Asset() {
  return (
    <>
      <TickerProvider>
        <Header title="My US Stock Portfolio | Asset" />
        <AssetContent />
      </TickerProvider>
    </>
  );
}
