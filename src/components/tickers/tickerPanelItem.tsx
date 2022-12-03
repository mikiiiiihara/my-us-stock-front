import React, { FC, useState } from "react";
import { TickerDetail } from "../../types/tickerDetail.type";

type Props = {
  data: TickerDetail;
  currency: string;
  displayType?: string;
};

export const TickerPanelItem: FC<Props> = ({ data, currency, displayType }) => {
  // モーダル表示切り替え用
  const [modalClass, setClass] = useState("ticker-modal-close");
  const changeModal = () => {
    if (modalClass == "ticker-modal-close") {
      setClass("ticker-modal");
    } else if (modalClass == "ticker-modal") {
      setClass("ticker-modal-close");
    }
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
  let rateClass = "";
  if (rate > 0) {
    rateClass = "fc-plus";
  } else if (rate < 0) {
    rateClass = "fc-minus";
  }
  //保有資産：損益
  const balance = data.balance;
  let getRateClass = "";
  if (balance > 0) {
    getRateClass = "fc-plus";
  } else if (balance < 0) {
    getRateClass = "fc-minus";
  }
  return (
    <div className="ticker-panel-item">
      <div className="ticker-panel-item-content" onClick={changeModal}>
        <h3>{data.ticker}</h3>
        <p>
          {currency}
          {(Math.round(data.price * 10) / 10).toLocaleString()}
        </p>
        <p className={rateClass}>
          {rate}
          {displayType == "balance" ? "" : "%"}
        </p>
      </div>
      <div className="ticker-panel-item-modal">
        <div className={modalClass} onClick={changeModal}>
          <div className="ticker-modal-content">
            <div className="base-info">
              <p className="ticker-name">{data.ticker}</p>
              <div>
                <p className="ticker-name">
                  {currency}
                  {(Math.round(data.price * 10) / 10).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="base-info mb-3 base-info-rate">
              <p></p>
              <p className={rateClass}>
                {rate}
                {displayType == "balance" ? "" : "%"}
              </p>
            </div>
            <p className="modal-text">セクター：{data.sector}</p>
            <p className="modal-text">保有株数：{data.quantity}</p>
            <p className="modal-text">
              取得価格：{currency}
              {(Math.round(data.getPrice * 10) / 10).toLocaleString()}
            </p>
            <p className="modal-text">
              取得為替：{currency}
              {data.usdjpy.toLocaleString()}
            </p>
            <p className="modal-text">
              時価総額：{currency}
              {data.sumOfPrice.toLocaleString()}
            </p>
            <p className="modal-text">
              損益額：
              <span className={getRateClass}>
                {currency}
                {balance.toLocaleString()}（{data.balanceRate}%）
              </span>
            </p>
            <p className="modal-text">
              年配当総額：{currency}
              {data.sumOfDividend.toLocaleString()}
            </p>
            <p className="modal-text">配当利回り：{data.dividendRate}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};
