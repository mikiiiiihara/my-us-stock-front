import React from "react";
import styles from "./sector-panel-item.module.scss";
import { TickerRealData } from "../../types/tickerRealData.type";

interface Props {
  data: TickerRealData;
}
const SectorPanelItem: React.FC<{ data: TickerRealData }> = ({
  data,
}: Props) => {
  //現在価格：損益率
  const rate = data.dp;
  let rateClass = "";
  if (rate > 0) {
    rateClass = "fc-plus";
  } else if (rate < 0) {
    rateClass = "fc-minus";
  }
  return (
    <div className={styles.sectorPanelItem}>
      <p className="fw-bold">{data.ticker}</p>
      <p className={rateClass}>{rate}%</p>
    </div>
  );
};

export default SectorPanelItem;
