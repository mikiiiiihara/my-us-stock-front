import { useRouter } from "next/router";
import React from "react";
import { useAuth } from "../../hooks/auth/useAuth";
import { PrimaryButton } from "../../components/primary-button/primaryButton";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

export const TopContentComponent = () => {
  const router = useRouter();
  const { requestLogin } = useAuth();
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

  const onSubmit = handleSubmit(async ({ email, password }) => {
    await executeLogin(email, password);
  });
  return (
    <>
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
        <div className="form-group mb-3">
          <label htmlFor="password">パスワード</label>
          <input
            type="password"
            className="form-control"
            {...register("password", { required: true })}
          />
        </div>
        <PrimaryButton content="ログイン" className="mb-3" type="submit" />
      </form>
    </>
  );
};
TopContentComponent.displayName = "TopContent";
export const TopContent = React.memo(TopContentComponent);
