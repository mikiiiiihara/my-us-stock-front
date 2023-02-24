import React, { ReactNode } from "react";
import { Button } from "react-bootstrap";

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
        <div className="overlay">
          <div className="modalContent card">
            {content}
            <Button onClick={closeModal} variant="secondary">
              Close
            </Button>
          </div>
        </div>
      ) : (
        <></> // showFlagがfalseの場合はModalは表示しない
      )}
    </>
  );
};

export default Modal;
