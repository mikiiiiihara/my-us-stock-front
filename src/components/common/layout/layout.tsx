import { signIn, useSession } from "next-auth/react";
import React, { FC, ReactNode } from "react";
import { PrimaryButton } from "../../primary-button/primaryButton";
type Props = {
  children: ReactNode;
};
export const Layout: FC<Props> = ({ children }) => {
  const { data: session, status } = useSession();
  if (status == "loading") return <></>;
  return session ? (
    <div className="wrapper">{children}</div>
  ) : (
    <>
      <PrimaryButton
        content="googleログイン"
        onClick={signIn}
        isForContent={true}
      />
    </>
  );
};
