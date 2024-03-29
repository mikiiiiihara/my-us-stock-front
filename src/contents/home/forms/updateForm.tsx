import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { PrimaryButton } from "../../../components/primary-button/primaryButton";
import { sortTickers } from "../../../functions/tickers/sortTickers";

import { DangerButton } from "../../../components/danger-button/dangerButton";
import { UpdateTickerProps } from "./props/updateTickerProps";

interface FormData {
  id: string;
  getPrice: string;
  quantity: string;
  usdjpy: string;
}

const UpdateFormComponent: React.FC<UpdateTickerProps> = ({
  setShowModal,
  tickers,
  executeDeleteTicker,
  executeUpdateTicker,
}) => {
  const [msg, setMsg] = useState("");
  // dafault values
  const [getPrice, setGetPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [usdJpy, setUsdJpy] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  // フォーム表示用
  const tickerDisplayList = sortTickers(tickers);

  const { register, handleSubmit } = useForm<FormData>();
  const closeModal = () => {
    setShowModal(false);
  };

  const onSubmit = handleSubmit(async ({ id, getPrice, quantity, usdjpy }) => {
    const intQuantity = parseInt(quantity);
    const parsedToNumberId = parseInt(id);
    // 更新時、マーケットデータの取得は実施せず、入力時の値を表示
    // なんらかの理由で取得できなかった場合は新規登録時と同じ対応
    const myTicker = tickers.find((ticker) => ticker.id.toString() === id);
    // 現在価格
    const currentPrice = myTicker ? myTicker.price : parseFloat(getPrice);
    const priceGets = myTicker ? myTicker.priceGets : 0;
    const priceRate = myTicker ? myTicker.priceRate : 0;
    if (intQuantity == 0) {
      // 削除
      await executeDeleteTicker(
        parsedToNumberId,
        currentPrice,
        priceGets,
        priceRate
      );
      setMsg("削除中...");
    } else {
      // 更新
      await executeUpdateTicker(
        parsedToNumberId,
        parseFloat(getPrice),
        intQuantity,
        parseFloat(usdjpy),
        currentPrice,
        priceGets,
        priceRate
      );
      setMsg("更新中...");
    }
    await new Promise((s) => {
      setTimeout(s, 300);
    });
    closeModal();
    setMsg("");
  });

  // 削除処理のみを実行する関数
  const executeDelete = async () => {
    if (selectedId != null) {
      const myTicker = tickers.find(
        (ticker) => ticker.id.toString() === selectedId.toString()
      );
      if (myTicker) {
        await executeDeleteTicker(
          selectedId,
          myTicker.price,
          myTicker.priceGets,
          myTicker.priceRate
        );
        setMsg("削除中...");
        await new Promise((s) => {
          setTimeout(s, 300);
        });
        closeModal();
        setMsg("");
      }
    }
  };
  return (
    <div>
      <h4 className="mb-3">Update ticker Price</h4>
      <p className="text-muted small text-secondary">
        買い増し・売却による取得価格・株数の変更
      </p>
      <form onSubmit={onSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="id">ティッカー名</label>
          <select
            {...register("id", {
              onChange: (e) => {
                const selectedValue = parseInt(e.target.value);
                setSelectedId(selectedValue);
                const ticker = tickerDisplayList.find(
                  (element) => element.id == selectedValue
                );
                if (ticker !== undefined) {
                  setGetPrice(ticker?.getPrice.toString());
                  setQuantity(ticker?.quantity.toString());
                  setUsdJpy(ticker?.usdjpy.toString());
                }
              },
            })}
            className="form-control"
          >
            {tickerDisplayList?.map(
              (ticker: { id: number; ticker: string; price: number }) => (
                <option key={ticker.id} value={ticker.id}>
                  {ticker.ticker}
                </option>
              )
            )}
          </select>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="getPrice">取得価格（$）</label>
          <input
            type="double"
            className="form-control"
            {...register("getPrice")}
            placeholder="例：162.34"
            defaultValue={getPrice}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="quantity">株数</label>
          <input
            type="int"
            className="form-control"
            {...register("quantity")}
            placeholder="例：6"
            defaultValue={quantity}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="usdjpy">購入時為替</label>
          <input
            type="double"
            className="form-control"
            {...register("usdjpy")}
            placeholder="例：133.43"
            defaultValue={usdJpy}
          />
        </div>
        <PrimaryButton content="更新" className="mb-3 w-100" type="submit" />
        <p>{msg}</p>
      </form>
      <DangerButton
        content="この銘柄を全売却"
        className="mb-3 w-100"
        onClick={executeDelete}
      />
    </div>
  );
};
UpdateFormComponent.displayName = "UpdateForm";
export const UpdateForm = React.memo(UpdateFormComponent);
