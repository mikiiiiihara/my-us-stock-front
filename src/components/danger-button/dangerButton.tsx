import React, { ReactNode } from "react";
import { Button } from "react-bootstrap";
import styles from "./danger-button.module.scss";

type Props = {
  content: string | ReactNode;
  type?: "submit";
  isForContent?: boolean;
  className?: string;
  notSelected?: boolean; // 非活性の見た目にしたいときにtrueを指定
  onClick?: (() => Promise<void>) | (() => void);
};
const DangerButtonComponent: React.FC<Props> = ({
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
        !notSelected ? styles.dangerButton : styles.dangerButtonNotSelected
      } ${isForContent ? styles.forContent : undefined} ${className}`}
      onClick={onClick}
      type={type}
    >
      {content}
    </Button>
  );
};

DangerButtonComponent.displayName = "DangerButton";
export const DangerButton = React.memo(DangerButtonComponent);
