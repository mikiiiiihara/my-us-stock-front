import React, { FC, useState } from "react";
import styles from "./ticker-panel-item.module.scss";
import { UsStockDetail } from "../templates/assets/types";

// 表示タイプ
export const DISPLAY_TYPE = {
  balance: "balance", // // 金額単位
  balanceRate: "balanceRate", // 率単位
} as const;
export type DisplayType = (typeof DISPLAY_TYPE)[keyof typeof DISPLAY_TYPE];

type Props = {
  data: UsStockDetail;
  currency: string;
  displayType?: DisplayType;
};

const TickerPanelItemComponent: FC<Props> = ({
  data,
  currency,
  displayType,
}) => {
  // モーダル表示切り替え用
  const [modalState, setModalState] = useState(false);
  const changeModal = () => {
    setModalState(!modalState);
  };
  //表示する項目
  let rate = Math.round(data.priceRate * 100) / 100;
  switch (displayType) {
    case "balance":
      rate = Math.round(data.balance * 100) / 100;
      break;
    case "balanceRate":
      rate = Math.round(data.balanceRate * 100) / 100;
      break;
  }

  //保有資産：損益
  const balance = data.balance;
  return (
    <div className={styles.tickerPanelItem}>
      <div className={styles.tickerPanelItemContent} onClick={changeModal}>
        <h3>{data.code}</h3>
        <p>
          {currency}
          {(Math.round(data.price * 10) / 10).toLocaleString()}
        </p>
        <p className={rate > 0 ? "text-success" : "text-danger"}>
          {rate}
          {displayType == "balance" ? "" : "%"}
        </p>
      </div>
      <div className={styles.tickerPanelItemModal}>
        {modalState ? (
          <div className={styles.tickerModal} onClick={changeModal}>
            <div className={styles.tickerModalContent}>
              <div className={styles.baseInfo}>
                <p className={styles.tickerName}>{data.code}</p>
                <div>
                  <p className={styles.tickerName}>
                    {currency}
                    {(Math.round(data.price * 10) / 10).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className={`${styles.baseInfo} mb-3 ${styles.baseInfoRate}`}>
                <p></p>
                <p className={rate > 0 ? "text-success" : "text-danger"}>
                  {rate}
                  {displayType == "balance" ? "" : "%"}
                </p>
              </div>
              <p className={styles.modalText}>セクター：{data.sector}</p>
              <p className={styles.modalText}>保有株数：{data.quantity}</p>
              <p className={styles.modalText}>
                取得価格：{currency}
                {(Math.round(data.getPrice * 10) / 10).toLocaleString()}
              </p>
              <p className={styles.modalText}>
                取得為替：{currency}
                {data.usdJpy.toLocaleString()}
              </p>
              <p className={styles.modalText}>
                時価総額：{currency}
                {data.sumOfPrice.toLocaleString()}
              </p>
              <p className={styles.modalText}>
                損益額：
                <span className={balance > 0 ? "text-success" : "text-danger"}>
                  {currency}
                  {balance.toLocaleString()}（{data.balanceRate}%）
                </span>
              </p>
              <p className={styles.modalText}>
                年配当総額：{currency}
                {data.sumOfDividend.toLocaleString()}
              </p>
              <p className={styles.modalText}>
                配当利回り：{data.dividendRate}%
              </p>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

TickerPanelItemComponent.displayName = "TickerPanelItem";
export const TickerPanelItem = React.memo(TickerPanelItemComponent);
