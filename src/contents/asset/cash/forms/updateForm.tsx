import { format } from "date-fns";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Loading } from "../../../../components/common/loading/loading";
import { HOOKS_STATE } from "../../../../constants/hooks";
import { useAssets } from "../../../../hooks/assets/useAssets";
import { useUpdateCash } from "../../../../hooks/assets/useUpdateCash";

type Props = {
  setShowModal: Function;
  priceTotal: number;
};
type FormData = {
  cashUSD: string;
  cashJPY: string;
};
const UpdateForm: React.FC<Props> = ({ setShowModal, priceTotal }) => {
  const [msg, setMsg] = useState("");
  const { getAssets } = useAssets();
  const { assets } = getAssets();
  const closeModal = () => {
    setMsg("");
    setShowModal(false);
  };
  const { executeUpdateCash, loading } = useUpdateCash();
  const { register, handleSubmit } = useForm<FormData>();
  if (assets === HOOKS_STATE.LOADING) return <Loading />;
  // 本日の資産総額を取得
  // 現在日時取得
  const year = format(new Date(), "yyyy");
  const month = format(new Date(), "MM");
  const date = format(new Date(), "dd");
  const todayCashData = assets.find(
    (asset) =>
      year === asset.year && month === asset.month && date === asset.date
  );
  const onSubmit = handleSubmit(async ({ cashUSD, cashJPY }) => {
    await executeUpdateCash(cashUSD, cashJPY, priceTotal);
    if (loading) {
      setMsg("更新中...");
    }
    await new Promise((s) => {
      setTimeout(s, 300);
    });
    closeModal();
  });
  return (
    <div className="update-form">
      <h4 className="mb-3">所有現金額を変更</h4>
      <p className="sub-sentence text-secondary">
        買い増し・売却による取得価格・株数の変更
      </p>
      <form onSubmit={onSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="getPrice">ドル（$）</label>
          <input
            type="double"
            className="form-control"
            {...register("cashUSD", { required: true })}
            placeholder="例：3,000"
            defaultValue={todayCashData?.cashUSD.toString(10)}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="getPrice">円（¥）</label>
          <input
            type="int"
            className="form-control"
            {...register("cashJPY", { required: true })}
            placeholder="例：400,000"
            defaultValue={todayCashData?.cashJPY.toString(10)}
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
