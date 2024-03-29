import React, { useState, useCallback } from "react";
import { Loading } from "../../components/common/loading/loading";
import { CreateForm } from "./forms/createForm";
import { UpdateForm } from "./forms/updateForm";
import { Modal } from "../../components/modal/modal";
import { HOOKS_STATE } from "../../constants/hooks";
import { PrimaryButton } from "../../components/primary-button/primaryButton";
import { Center } from "../../components/common/center/center";
import { useTickerContext } from "../../contexts/tickersContext";
import { StrategyContent } from "./strategy/strategyContent";
import { FxChangeButton } from "../../components/fx-change-button/fxChangeButton";
import { useTickers } from "../../hooks/tickers/useTickers";
import { useGetUSDJPY } from "../../hooks/export/useGetUSDJPY";
import { Header } from "../../components/common/header/header";
import { useUser } from "../../hooks/user/userUser";
import { HomeMain } from "./homeMain";
import { Empty } from "../../components/graph/empty";

export const DISPLAY_MODE = {
  summary: "summary",
  detail: "detail",
};

export const HomeContentComponent = () => {
  const { fx, changeFx } = useTickerContext();
  const {
    getTickers,
    executeCreateTicker,
    executeUpdateTicker,
    executeDeleteTicker,
  } = useTickers();
  const { getUserName } = useUser();
  // ユーザー名取得
  const userName = getUserName();
  // 為替情報取得
  const { currentUsd } = useGetUSDJPY();
  // 保有株式総額を取得
  const { tickers } = getTickers(fx);
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

  if (userName === HOOKS_STATE.LOADING || tickers === HOOKS_STATE.LOADING) {
    return (
      <Center>
        <div className="content">
          <h1>保有株式総額:</h1>
          <Loading />
        </div>
      </Center>
    );
  }

  const { tickerDetail, priceTotal, getPriceTotal } = tickers;
  const balanceTotal = Math.round((priceTotal - getPriceTotal) * 10) / 10;
  const balanceRateTotal = ((balanceTotal / getPriceTotal) * 100).toFixed(2);
  const balanceRateClass =
    Number(balanceRateTotal) > 0
      ? "text-success"
      : Number(balanceRateTotal) < 0
      ? "text-danger"
      : "";
  return (
    <>
      <Center>
        <Header userName={userName} />
        <div className="content">
          <h1>
            保有株式総額: {fx}
            {priceTotal.toLocaleString()}
          </h1>
          <p className={balanceRateClass}>
            損益: {fx}
            {balanceTotal.toLocaleString()}（
            {isNaN(Number(balanceRateTotal)) ? 0 : balanceRateTotal}
            %）
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
          {tickerDetail.length > 0 ? (
            <HomeMain
              displayMode={displayMode}
              tickerDetail={tickerDetail}
              tickers={tickers}
            />
          ) : (
            <Empty />
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
      <StrategyContent />
      <FxChangeButton currency={fx == "$" ? "$" : "¥"} onClick={changeFx} />
    </>
  );
};
HomeContentComponent.displayName = "HomeContent";
export const HomeContent = React.memo(HomeContentComponent);
