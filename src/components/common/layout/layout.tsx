import React, { FC, ReactNode } from "react";
import { SignInMenu } from "../sign-in/signInMenu";
type Props = {
  children: ReactNode;
};
export const Layout: FC<Props> = ({ children }) => {
  const email = "mikiwhigh1274@gmail.com";
  return email ? (
    <div className="wrapper">{children}</div>
  ) : (
    <>
      <SignInMenu />
    </>
  );
};
