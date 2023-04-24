import React, { FC, ReactNode, useContext } from "react";
import { SignInMenu } from "../sign-in/signInMenu";
import EmailContext from "../../../contexts/emailContext";
type Props = {
  children: ReactNode;
};
export const Layout: FC<Props> = ({ children }) => {
  const { email } = useContext(EmailContext);
  return email ? (
    <div className="wrapper">{children}</div>
  ) : (
    <>
      <SignInMenu />
    </>
  );
};
