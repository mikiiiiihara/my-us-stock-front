import React, { ReactNode } from "react";
import { Button } from "react-bootstrap";
import styles from "./primary-button.module.scss";

type Props = {
  content: string | ReactNode;
  type?: "submit";
  isForContent?: boolean;
  className?: string;
  notSelected?: boolean; // 非活性の見た目にしたいときにtrueを指定
  onClick?: (() => Promise<void>) | (() => void);
};
const PrimaryButton: React.FC<Props> = ({
  content: content,
  type,
  isForContent,
  className,
  notSelected,
  onClick,
}) => {
  return (
    <Button
      className={`${
        !notSelected ? styles.primaryButton : styles.primaryButtonNotSelected
      } ${isForContent ? styles.forContent : undefined} ${className}`}
      onClick={onClick}
      type={type}
    >
      {content}
    </Button>
  );
};

export default PrimaryButton;
