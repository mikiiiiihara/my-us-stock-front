import React, { ReactNode } from "react";

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
            <button onClick={closeModal} className="btn btn-secondary">
              Close
            </button>
          </div>
        </div>
      ) : (
        <></> // showFlagがfalseの場合はModalは表示しない
      )}
    </>
  );
};

export default Modal;
