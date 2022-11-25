import { useMutation } from "@apollo/client";
import router from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { CREATE_TICKER } from "../../../hooks/tickers/useCreateTicker";
import { sectorList } from "../../../constants/sectorList";

type Props = {
  setShowModal: Function;
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

const CreateForm: React.FC<Props> = ({ setShowModal }) => {
  const [msg, setMsg] = useState("");
  const { data: session } = useSession();
  const closeModal = () => {
    setMsg("");
    setShowModal(false);
  };
  const [createTicker] = useMutation(CREATE_TICKER);

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
      const result = await createTicker({
        variables: {
          ticker: ticker,
          getPrice: parseFloat(getPrice),
          quantity: parseInt(quantity),
          user: session?.user?.email,
          dividend: parseFloat(dividend),
          dividendTime: parseInt(dividendTime),
          dividendFirstTime: parseInt(dividendFirstTime),
          sector: sector,
          usdjpy: parseFloat(usdjpy),
        },
      });
      if (result != null) {
        setMsg("登録が完了しました！");
      }
      await new Promise((s) => {
        setTimeout(s, 300);
      });
      closeModal();
      router.reload();
    }
  );
  return (
    <div className="create-form">
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
            {sectorList.map((sector: { id: number; name: string }) => (
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
        <button type="submit" className="btn primary-button mb-3 w-100">
          追加
        </button>
        <p>{msg}</p>
      </form>
    </div>
  );
};

export default CreateForm;
