import React, { useState } from "react";
import { Loading } from "../../components/common/loading/loading";
import { TickerDetail } from "../../types/tickerDetail.type";
import { calculateTickerPie } from "../../functions/tickers/calculateTickerPie";
import { themeDefault } from "../../constants/themeColor";
import Pie from "../../components/graph/pie";
import Image from "next/image";
import CreateForm from "./forms/createForm";
import UpdateForm from "./forms/updateForm";
import Modal from "../../components/modal/modal";
import { HOOKS_STATE } from "../../constants/hooks";
import { useTickerContext } from "../../contexts/tickersContext";

export const HomeContent = () => {
  // 画面表示
  const [showUpdModal, setUpdModal] = useState(false);
  const [showAddModal, setAddModal] = useState(false);
  const ShowUpdModal = () => {
    setUpdModal(true);
  };
  const ShowAddModal = () => {
    setAddModal(true);
  };
  // コンテキストから取得
  const { fx, changeFx, getTickers, currentUsd } = useTickerContext();
  // 保有株式総額を取得
  const { tickers } = getTickers(fx);
  if (tickers === HOOKS_STATE.LOADING || currentUsd === HOOKS_STATE.LOADING)
    return (
      <div className="home-content">
        <Loading />
      </div>
    );
  const tickerDetail: TickerDetail[] = tickers.tickerDetail;
  const priceTotal = tickers.priceTotal;
  const balanceTotal =
    Math.round((tickers.priceTotal - tickers.getPriceTotal) * 10) / 10;
  const balanceRateTotal =
    (Math.round((balanceTotal / tickers.getPriceTotal) * 100) / 100) * 100;
  const dividendTotal = tickers.dividendTotal;
  const pieData = calculateTickerPie(tickerDetail, priceTotal);
  let balanceRateClass = "";
  if (balanceRateTotal > 0) {
    balanceRateClass = "fc-plus";
  } else if (balanceRateTotal < 0) {
    balanceRateClass = "fc-minus";
  }
  return (
    <div className="home-content">
      <div className="content">
        <h1>
          保有株式総額: {fx}
          {priceTotal.toLocaleString()}
        </h1>
        <p className={balanceRateClass}>
          損益: {fx}
          {balanceTotal.toLocaleString()}（{balanceRateTotal.toLocaleString()}
          %）
        </p>
        <p>
          年配当金総額： {fx}
          {dividendTotal.toLocaleString()}
        </p>
        <p>（USDJPY: {currentUsd}）</p>
        <Pie pieData={pieData} themeColor={themeDefault} background="#343a40" />
        <div className="menu-btn-content">
          <input
            type="button"
            value="情報を変更"
            onClick={ShowUpdModal}
            className="btn menu-button primary-button"
          />
          <input
            type="button"
            value="銘柄を追加"
            onClick={ShowAddModal}
            className="btn menu-button primary-button"
          />
        </div>
        <Modal
          showFlag={showUpdModal}
          setShowModal={setUpdModal}
          content={
            <UpdateForm
              setShowModal={setUpdModal}
              tickers={tickers.tickerDetail}
            />
          }
        />
        <Modal
          showFlag={showAddModal}
          setShowModal={setAddModal}
          content={<CreateForm setShowModal={setAddModal} />}
        />
      </div>
      <button onClick={changeFx} className="primary-button fx-button-fix">
        <p className="fx-button">{fx == "$" ? "$" : "¥"}表示</p>
        <Image
          src="/fx.png"
          width={30}
          height={30}
          style={{ objectFit: "contain" }}
          alt="logo"
        />
      </button>
    </div>
  );
};
