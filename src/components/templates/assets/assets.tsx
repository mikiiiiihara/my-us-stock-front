import React, { FC, useCallback, useEffect, useState } from "react";
import { summarizeAllAssets } from "./summarize-all-asset";
import { Center } from "../../common/center/center";
import { PrimaryButton } from "../../primary-button/primaryButton";
import { HomeMain } from "../../../contents/home/homeMain";
import { Empty } from "../../graph/empty";
import { Asset } from "../../../pages/test/calculate-all-assets";

type Props = {
  assets: Asset[];
  currentUsdJpy: number;
};

type SelectedGroups = {
  [key: string]: boolean;
  usStock: boolean;
  japanFund: boolean;
  crypto: boolean;
  fixedIncomeAsset: boolean;
};

const DISPLAY_MODE = {
  summary: "summary",
  detail: "detail",
};

const AssetsComponent: FC<Props> = ({ assets, currentUsdJpy }) => {
  const [displayAssets, setDisplayAssets] = useState(assets);
  const [selectedGroups, setSelectedGroups] = useState<SelectedGroups>({
    usStock: true,
    japanFund: true,
    crypto: true,
    fixedIncomeAsset: true,
  });
  const [displayMode, setDisplayMode] = useState(DISPLAY_MODE.summary);
  const changeDisplayToSummary = useCallback(
    () => setDisplayMode(DISPLAY_MODE.summary),
    []
  );
  const changeDisplayToDetail = useCallback(
    () => setDisplayMode(DISPLAY_MODE.detail),
    []
  );
  // 保有株式情報をグラフ用に加工
  const usStockSummary = summarizeAllAssets(displayAssets, currentUsdJpy);
  const { usStockDetails, priceTotal, getPriceTotal } = usStockSummary;
  const balanceTotal = Math.round((priceTotal - getPriceTotal) * 10) / 10;
  const balanceRateTotal = ((balanceTotal / getPriceTotal) * 100).toFixed(2);
  const balanceRateClass =
    Number(balanceRateTotal) > 0
      ? "text-success"
      : Number(balanceRateTotal) < 0
      ? "text-danger"
      : "";

  // チェックボックスの変更をハンドルする関数
  const handleCheckboxChange = useCallback((event: any) => {
    const { name, checked } = event.target;
    setSelectedGroups((prev) => ({ ...prev, [name]: checked }));
  }, []);

  // チェックボックスの状態に基づいて assets をフィルタリング
  useEffect(() => {
    const filteredAssets = assets.filter(
      (asset) => selectedGroups[asset.group]
    );
    setDisplayAssets(filteredAssets);
  }, [selectedGroups, assets]);
  // チェックボックスのレンダリング
  const renderCheckboxes = () => (
    <div>
      {Object.entries(selectedGroups).map(([group, isSelected]) => (
        <label key={group}>
          <input
            type="checkbox"
            name={group}
            checked={isSelected}
            onChange={handleCheckboxChange}
          />
          {group}
        </label>
      ))}
    </div>
  );
  return (
    <div>
      <Center>
        <div className="content">
          <h1>保有株式総額¥:{priceTotal.toLocaleString()}</h1>
          <p className={balanceRateClass}>
            損益¥:{balanceTotal.toLocaleString()}（
            {isNaN(Number(balanceRateTotal)) ? 0 : balanceRateTotal}
            %）
          </p>
          <p>（USDJPY: {currentUsdJpy}）</p>
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
          {renderCheckboxes()}
          {usStockDetails.length > 0 ? (
            <HomeMain
              displayMode={displayMode}
              usStockDetail={usStockDetails}
              usStockSummary={usStockSummary}
            />
          ) : (
            <Empty />
          )}
        </div>
      </Center>
    </div>
  );
};
AssetsComponent.displayName = "AssetTemplate";
export const AssetTemplate = React.memo(AssetsComponent);
