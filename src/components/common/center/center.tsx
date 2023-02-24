import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const Center: React.FC<Props> = ({ children }) => {
  return <div style={{ textAlign: "center" }}>{children}</div>;
};
