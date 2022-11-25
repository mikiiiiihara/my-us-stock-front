import { useMutation } from "@apollo/client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { UPDATE_CASH } from "../../../../hooks/assets/useUpdateCash";
import { UseGetAsset } from "../../../../hooks/assets/useGetAsset";

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
  const { data: session } = useSession();
  const todayCashData = UseGetAsset(session?.user?.email);
  const closeModal = () => {
    setMsg("");
    setShowModal(false);
  };
  const [updateCash] = useMutation(UPDATE_CASH);

  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = handleSubmit(async ({ cashUSD, cashJPY }) => {
    const result = await updateCash({
      variables: {
        user: session?.user?.email,
        cashUSD: parseFloat(cashUSD),
        cashJPY: parseInt(cashJPY),
        dividend: parseInt(cashJPY),
        priceTotal: priceTotal,
      },
    });
    if (result != null) {
      setMsg("更新が完了しました！");
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