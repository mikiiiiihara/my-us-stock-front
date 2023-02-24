import React, { ReactNode } from "react";
import { Button } from "react-bootstrap";
import styles from "./primary-button.module.scss";

type Props = {
  content: string | ReactNode;
  type?: "submit";
  isForContent?: boolean;
  className?: string;
  onClick?: (() => Promise<void>) | (() => void);
};
const PrimaryButton: React.FC<Props> = ({
  content: content,
  type,
  isForContent,
  className,
  onClick,
}) => {
  return (
    <Button
      className={`${styles.primaryButton} ${
        isForContent ? styles.forContent : undefined
      } ${className}`}
      onClick={onClick}
      type={type}
    >
      {content}
    </Button>
  );
};

export default PrimaryButton;
