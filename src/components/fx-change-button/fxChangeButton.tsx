import React from "react";
import styles from "./fx-change-button.module.scss";
import { PrimaryButton } from "../primary-button/primaryButton";
import Image from "next/image";

type Props = {
  currency: string;
  onClick: () => void;
};

const FxChangeButtonComponent: React.FC<Props> = ({ currency, onClick }) => {
  return (
    <PrimaryButton
      content={
        <>
          <p className={styles.fxButton}>{currency}表示</p>
          <Image
            src="/fx.png"
            width={30}
            height={30}
            style={{ objectFit: "contain" }}
            alt="logo"
          />
        </>
      }
      onClick={onClick}
      className={styles.fxButtonFix}
    />
  );
};

FxChangeButtonComponent.displayName = "FxChangeButton";
export const FxChangeButton = React.memo(FxChangeButtonComponent);
