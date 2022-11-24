import { useSession } from "next-auth/react";
import React, { FC, ReactNode } from "react";
import { SignInMenu } from "../sign-in/signInMenu";
type Props = {
  children: ReactNode;
};
export const Layout: FC<Props> = ({ children }) => {
  const { data: session } = useSession();
  return session ? (
    <div className="wrapper">{children}</div>
  ) : (
    <>
      <SignInMenu />
    </>
  );
};
