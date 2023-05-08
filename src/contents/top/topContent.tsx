import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuth } from "../../hooks/auth/useAuth";
import { PrimaryButton } from "../../components/primary-button/primaryButton";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  name?: string;
  password: string;
};

export const TopContentComponent = () => {
  //表示切り替え用
  const [isLogined, setIsLogined] = useState(true);
  const router = useRouter();
  const { requestLogin, executeCreateUser } = useAuth();
  const executeLogin = async (email: string, password: string) => {
    try {
      await requestLogin(email, password);
    } catch (error) {
      console.log("Loginをcatch!");
    }
    router.push("/");
  };

  // formを定義
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = handleSubmit(async ({ email, name, password }) => {
    // ユーザー新規登録処理
    if (!isLogined) {
      // name入力ない場合は空文字で登録
      await executeCreateUser(email, name ?? "", password);
    }
    // ログイン処理
    await executeLogin(email, password);
  });
  return (
    <>
      <h1 className="text-center m-3">
        {isLogined ? "ログイン" : "ユーザー新規登録"}
      </h1>
      <form onSubmit={onSubmit} className="w-75" style={{ margin: "0 auto" }}>
        <div className="form-group mb-3">
          <label htmlFor="email">メール</label>
          <input
            type="text"
            className="form-control"
            {...register("email", { required: true })}
            placeholder="例：test@example.com"
          />
        </div>
        {!isLogined ? (
          <div className="form-group mb-3">
            <label htmlFor="name">ニックネーム</label>
            <input
              type="text"
              className="form-control"
              {...register("name")}
              placeholder="例：taro"
            />
          </div>
        ) : (
          <></>
        )}
        <div className="form-group mb-3">
          <label htmlFor="password">パスワード</label>
          <input
            type="password"
            className="form-control"
            {...register("password", { required: true })}
          />
        </div>
        <p
          className="text-primary text-right"
          onClick={() => setIsLogined(!isLogined)}
        >
          {isLogined ? "ユーザー新規登録" : "ログイン"}はコチラ
        </p>
        <PrimaryButton
          content={isLogined ? "ログイン" : "登録"}
          className="mb-3"
          type="submit"
        />
      </form>
    </>
  );
};
TopContentComponent.displayName = "TopContent";
export const TopContent = React.memo(TopContentComponent);
