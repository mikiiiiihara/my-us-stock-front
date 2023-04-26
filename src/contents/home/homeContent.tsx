import React, { useState, useCallback } from "react";
import { Loading } from "../../components/common/loading/loading";
import { CreateForm } from "./forms/createForm";
import { UpdateForm } from "./forms/updateForm";
import { Modal } from "../../components/modal/modal";
import { HOOKS_STATE } from "../../constants/hooks";
import { PrimaryButton } from "../../components/primary-button/primaryButton";
import { Center } from "../../components/common/center/center";
import { TickerContent } from "../ticker/tickerContent";
import { SummaryContent } from "./summary/summaryContent";
import { TickerData } from "../../types/tickerData.type";
import { useTickerContext } from "../../contexts/tickersContext";

const DISPLAY_MODE = {
  summary: "summary",
  detail: "detail",
};

type HomeContentProps = {
  tickers: "loading" | TickerData;
  currentUsd: number | "loading";
  executeDeleteTicker: (
    id: number,
    currentPrice: number,
    priceGets: number,
    currentRate: number
  ) => Promise<void>;
  executeUpdateTicker: (
    id: number,
    getPrice: number,
    quantity: number,
    dividend: number,
    usdjpy: number,
    currentPrice: number,
    priceGets: number,
    currentRate: number
  ) => Promise<void>;
  executeCreateTicker: (
    ticker: string,
    getPrice: number,
    quantity: number,
    dividend: number,
    dividendTime: number,
    dividendFirstTime: number,
    sector: string,
    usdjpy: number,
    currentPrice: number,
    priceGets: number,
    currentRate: number
  ) => Promise<void>;
};

export const HomeContentComponent: React.FC<HomeContentProps> = ({
  tickers,
  currentUsd,
  executeDeleteTicker,
  executeUpdateTicker,
  executeCreateTicker,
}) => {
  const { fx } = useTickerContext();
  const [displayMode, setDisplayMode] = useState(DISPLAY_MODE.summary);
  const changeDisplayToSummary = useCallback(
    () => setDisplayMode(DISPLAY_MODE.summary),
    []
  );
  const changeDisplayToDetail = useCallback(
    () => setDisplayMode(DISPLAY_MODE.detail),
    []
  );

  const [showUpdModal, setUpdModal] = useState(false);
  const [showAddModal, setAddModal] = useState(false);
  const ShowUpdModal = useCallback(() => setUpdModal(true), []);
  const ShowAddModal = useCallback(() => setAddModal(true), []);

  if (tickers === HOOKS_STATE.LOADING) {
    return (
      <Center>
        <div className="content">
          <h1>保有株式総額:</h1>
          <Loading />
        </div>
      </Center>
    );
  }

  const { tickerDetail, priceTotal, getPriceTotal, dividendTotal } = tickers;
  const balanceTotal = Math.round((priceTotal - getPriceTotal) * 10) / 10;
  const balanceRateTotal = ((balanceTotal / getPriceTotal) * 100).toFixed(2);
  const balanceRateClass =
    Number(balanceRateTotal) > 0
      ? "text-success"
      : Number(balanceRateTotal) < 0
      ? "text-danger"
      : "";

  return (
    <Center>
      <div className="content">
        <h1>
          保有株式総額: {fx}
          {priceTotal.toLocaleString()}
        </h1>
        <p className={balanceRateClass}>
          損益: {fx}
          {balanceTotal.toLocaleString()}（{balanceRateTotal}
          %）
        </p>
        <p>
          年配当金総額： {fx}
          {dividendTotal.toLocaleString()}
        </p>
        <p>（USDJPY: {currentUsd}）</p>
        <div className="m-3">
          <PrimaryButton
            content="ポートフォリオ"
            notSelected={displayMode !== DISPLAY_MODE.summary}
            onClick={changeDisplayToSummary}
          />
          <PrimaryButton
            content="保有銘柄一覧"
            notSelected={displayMode !== DISPLAY_MODE.detail}
            onClick={changeDisplayToDetail}
          />
        </div>
        {displayMode === DISPLAY_MODE.summary ? (
          <SummaryContent tickerDetail={tickerDetail} />
        ) : (
          <TickerContent tickers={tickers} />
        )}
        <PrimaryButton
          content="情報を変更"
          onClick={ShowUpdModal}
          isForContent={true}
        />
        <PrimaryButton
          content="銘柄を追加"
          onClick={ShowAddModal}
          isForContent={true}
        />
        <Modal
          showFlag={showUpdModal}
          setShowModal={setUpdModal}
          content={
            <UpdateForm
              setShowModal={setUpdModal}
              tickers={tickers.tickerDetail}
              executeUpdateTicker={executeUpdateTicker}
              executeDeleteTicker={executeDeleteTicker}
            />
          }
        />
        <Modal
          showFlag={showAddModal}
          setShowModal={setAddModal}
          content={
            <CreateForm
              setShowModal={setAddModal}
              executeCreateTicker={executeCreateTicker}
            />
          }
        />
      </div>
    </Center>
  );
};
HomeContentComponent.displayName = "HomeContent";
export const HomeContent = React.memo(HomeContentComponent);
