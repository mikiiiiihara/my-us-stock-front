import { format } from "date-fns";
import React from "react";
import { Header } from "../../components/common/header/header";
import { useUser } from "../../hooks/user/userUser";
import { useDividend } from "../../hooks/dividend/useDividend";
import { HOOKS_STATE } from "../../constants/hooks";
import { Loading } from "../../components/common/loading/loading";
import { useGetUSDJPY } from "../../hooks/export/useGetUSDJPY";
import { useTickerContext } from "../../contexts/tickersContext";
import { Center } from "../../components/common/center/center";
import { StackedColumn } from "../../components/graph/stackedColumn";
import { themeDefault } from "../../constants/themeColor";
import { DivData } from "../../types/divData.type";
import { calculateDividendCalendar } from "../../functions/dividend/calculateDividendCalendar";
import { FxChangeButton } from "../../components/fx-change-button/fxChangeButton";

export const DividendContent = () => {
  const { fx, changeFx } = useTickerContext();
  // 配当情報を取得する
  const { getDividendList } = useDividend();
  const { dividendList } = getDividendList(fx);
  const { getUserName } = useUser();
  // ユーザー名取得
  const userName = getUserName();
  // 為替情報取得
  const { currentUsd } = useGetUSDJPY();
  if (
    userName === HOOKS_STATE.LOADING ||
    currentUsd === HOOKS_STATE.LOADING ||
    dividendList === HOOKS_STATE.LOADING
  )
    return <Loading />;
  const divData: DivData[] = calculateDividendCalendar(
    fx === "$" ? 1 : currentUsd,
    dividendList
  );
  const dividendAmountList = dividendList.map(
    (dividend) => dividend.quantity * dividend.dividendTotal
  );
  // 配当総額
  const dividendTotal = dividendAmountList.reduce((a, b) => {
    return a + b;
  });
  const displayDividendTotal =
    fx === "$" ? dividendTotal : dividendTotal * currentUsd;
  return (
    <>
      <Center>
        <Header userName={userName} />
        <div className="content">
          <h1>配当推移(仮)</h1>
          <p>
            年配当金総額： {fx}
            {displayDividendTotal.toLocaleString()}
          </p>
          <p>（USDJPY: {currentUsd}）</p>
          <StackedColumn
            divData={divData}
            themeColor={themeDefault}
            background="#343a40"
          />
        </div>
        <FxChangeButton currency={fx == "$" ? "$" : "¥"} onClick={changeFx} />
      </Center>
    </>
  );
};
