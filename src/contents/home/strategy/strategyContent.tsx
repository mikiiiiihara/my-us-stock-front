import { format } from "date-fns";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Loading } from "../../../components/common/loading/loading";
import { useStrategy } from "../../../hooks/strategy/useStrategy";
import { HOOKS_STATE } from "../../../constants/hooks";
import { PrimaryButton } from "../../../components/primary-button/primaryButton";
type FormData = {
  text: string;
};

export const StrategyContent = () => {
  const { getStrategy, updateStrategy } = useStrategy();
  const data = getStrategy();
  const [msg, setMsg] = useState("");
  const { register, handleSubmit } = useForm<FormData>();
  const onSubmit = handleSubmit(async ({ text }) => {
    await updateStrategy(text);
    const nowDate = format(new Date(), "yyyy/MM/dd/HH:mm:ss");
    const msg = `更新完了しました！：${nowDate}更新`;
    setMsg(msg);
  });
  if (data === HOOKS_STATE.LOADING)
    return (
      <div className="content">
        <h2>投資方針メモ</h2>
        <Loading />
      </div>
    );
  // textarea行数自動算出
  const autoTxtAreaRows = () => {
    let numOfN = (data?.text.match(new RegExp("\n", "g")) || []).length;
    return numOfN * 2;
  };

  return (
    <div className="content">
      <h2 className="m-2">投資方針メモ</h2>
      <p className="m-2">{data?.updDate}更新</p>
      <form onSubmit={onSubmit}>
        <div className="form-group mb-3">
          <textarea
            className="form-control"
            {...register("text", { required: true })}
            placeholder="投資方針のメモを記入してください。"
            defaultValue={data?.text}
            rows={autoTxtAreaRows()}
          />
        </div>
        <PrimaryButton content="更新" className="mb-3" type="submit" />
        <p className="m-2">{msg}</p>
      </form>
    </div>
  );
};
