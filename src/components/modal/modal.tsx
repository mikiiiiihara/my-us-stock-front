import React, { ReactNode } from "react";
import { Button, Card } from "react-bootstrap";
import styles from "./modal.module.scss";

type Props = {
  showFlag: Boolean;
  setShowModal: Function;
  content?: ReactNode;
};

const Modal: React.FC<Props> = ({ showFlag, setShowModal, content }) => {
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <>
      {showFlag ? ( // showFlagがtrueだったらModalを表示する
        <div className={styles.overlay}>
          <Card className={styles.modalContent}>
            {content}
            <Button onClick={closeModal} variant="secondary">
              Close
            </Button>
          </Card>
        </div>
      ) : (
        <></> // showFlagがfalseの場合はModalは表示しない
      )}
    </>
  );
};

export default Modal;
