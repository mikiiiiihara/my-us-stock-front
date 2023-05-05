import React, { FC, ReactNode } from "react";
import { PrimaryButton } from "../../primary-button/primaryButton";
type Props = {
  children: ReactNode;
};
export const Layout: FC<Props> = ({ children }) => {
  const email = "mikiwhigh1274@gmail.com";
  return email ? (
    <div className="wrapper">{children}</div>
  ) : (
    <>
      <PrimaryButton
        content="googleログイン"
        onClick={() => console.log("signIn with google")}
        isForContent={true}
      />
    </>
  );
};
