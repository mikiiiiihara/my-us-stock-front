import { useMutation } from "@apollo/client";
import router from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { sortTickers } from "../../../functions/tickers/sosrtTickers";

import { UPDATE_TICKER } from "../../../hooks/tickers/useUpdateTicker";
import { Ticker } from "../../../types/ticker.type";

type Props = {
  setShowModal: Function;
  tickers: Ticker[];
};

interface FormData {
  id: string;
  getPrice: string;
  quantity: string;
  dividend: string;
  usdjpy: string;
}

const UpdateForm: React.FC<Props> = ({ setShowModal, tickers }) => {
  const [msg, setMsg] = useState("");
  // dafault values
  const [getPrice, setGetPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [dividend, setDividend] = useState("");
  const [usdJpy, setUsdJpy] = useState("");
  // フォーム表示用
  const tickerDisplayList = sortTickers(tickers);

  const { register, handleSubmit } = useForm<FormData>();
  const closeModal = () => {
    setShowModal(false);
  };
  const [updateTicker] = useMutation(UPDATE_TICKER);

  const onSubmit = handleSubmit(
    async ({ id, getPrice, quantity, dividend, usdjpy }) => {
      const intQuantity = parseInt(quantity);
      const result = await updateTicker({
        variables: {
          id: parseInt(id),
          getPrice: parseFloat(getPrice),
          quantity: intQuantity,
          dividend: parseFloat(dividend),
          usdjpy: parseFloat(usdjpy),
        },
      });
      if (result != null) {
        setMsg("更新が完了しました！");
        if (intQuantity == 0) {
          router.reload();
        }
        await new Promise((s) => {
          setTimeout(s, 300);
        });
        closeModal();
      }
    }
  );
  return (
    <div className="update-form">
      <h4 className="mb-3">Update ticker Price</h4>
      <p className="sub-sentence text-secondary">
        買い増し・売却による取得価格・株数の変更
      </p>
      <form onSubmit={onSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="id">ティッカー名</label>
          <select
            {...register("id", {
              onChange: (e) => {
                const ticker = tickerDisplayList.find(
                  (element) => element.id == parseInt(e.target.value)
                );
                if (ticker !== undefined) {
                  setGetPrice(ticker?.getPrice.toString());
                  setQuantity(ticker?.quantity.toString());
                  setDividend(ticker?.dividend.toString());
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
          <label htmlFor="dividend">配当/年</label>
          <input
            type="double"
            className="form-control"
            {...register("dividend")}
            placeholder="例：0.92"
            defaultValue={dividend}
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
        <button type="submit" className="btn primary-button mb-3 w-100">
          更新
        </button>
        <p>{msg}</p>
      </form>
    </div>
  );
};

export default UpdateForm;
