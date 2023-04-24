import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PrimaryButton from "../../../components/primary-button/primaryButton";
import { sectorList } from "../../../constants/sectorList";

type Props = {
  setShowModal: Function;
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
  ) => Promise<void>; // 保有株式情報追加関数
};

type FormData = {
  ticker: string;
  getPrice: string;
  quantity: string;
  dividend: string;
  dividendTime: string;
  dividendFirstTime: string;
  sector: string;
  usdjpy: string;
};

const CreateFormComponent: React.FC<Props> = ({
  setShowModal,
  executeCreateTicker,
}) => {
  const [msg, setMsg] = useState("");
  const closeModal = () => {
    setMsg("");
    setShowModal(false);
  };
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = handleSubmit(
    async ({
      ticker,
      getPrice,
      quantity,
      dividend,
      dividendTime,
      dividendFirstTime,
      sector,
      usdjpy,
    }) => {
      await executeCreateTicker(
        ticker,
        parseFloat(getPrice),
        parseInt(quantity),
        parseFloat(dividend),
        parseInt(dividendTime),
        parseInt(dividendFirstTime),
        sector,
        parseFloat(usdjpy),
        // 新規登録時、マーケットデータの取得は実施せず、ダミー値を表示
        parseFloat(getPrice),
        0,
        0
      );
      setMsg("追加中...");
      await new Promise((s) => {
        setTimeout(s, 300);
      });
      closeModal();
      setMsg("");
    }
  );
  return (
    <div>
      <h4 className="mb-3">Add Ticker Info</h4>
      <form onSubmit={onSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="ticker">ティッカー名</label>
          <input
            type="text"
            className="form-control"
            {...register("ticker", { required: true })}
            placeholder="例：AAPL"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="buyPrice">取得価格（$）</label>
          <input
            type="double"
            className="form-control"
            {...register("getPrice", { required: true })}
            placeholder="例：162.34"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="quantity">株数</label>
          <input
            type="int"
            className="form-control"
            {...register("quantity", { required: true })}
            placeholder="例：4"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="dividend">配当/年</label>
          <input
            type="double"
            className="form-control"
            {...register("dividend", { required: true })}
            placeholder="例：0.92"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="dividendTime">配当回数/年</label>
          <p className="sub-sentence text-secondary">
            ※米国株の場合は主に年４回（その場合4を入力）
          </p>
          <input
            type="int"
            className="form-control"
            {...register("dividendTime", { required: true })}
            placeholder="例：4"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="dividendFirstTime">初回配当権利月</label>
          <p className="sub-sentence text-secondary">
            ※AAPL:2/5/8/11月が配当権利月なため、
            <br />
            2を入力
          </p>
          <input
            type="int"
            className="form-control"
            {...register("dividendFirstTime", { required: true })}
            placeholder="例：2"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="sector">セクター</label>
          <select {...register("sector")} className="form-control">
            {sectorList
              .sort(function (a, b) {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
              })
              .map((sector: { id: number; name: string }) => (
                <option key={sector.id} value={sector.name}>
                  {sector.name}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="usdjpy">購入時為替</label>
          <input
            type="double"
            className="form-control"
            {...register("usdjpy", { required: true })}
            placeholder="例：133.43"
          />
        </div>
        <PrimaryButton content="追加" className="mb-3 w-100" type="submit" />
        <p>{msg}</p>
      </form>
    </div>
  );
};
CreateFormComponent.displayName = "CreateForm";
export const CreateForm = React.memo(CreateFormComponent);
