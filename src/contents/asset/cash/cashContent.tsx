import React, { FC, useState } from "react";
import { themeElectronic } from "../../../constants/themeColor";
import SemiCircle from "../../../components/graph/semiCircle";
import Modal from "../../../components/modal/modal";
import UpdateForm from "./forms/updateForm";
import PrimaryButton from "../../../components/primary-button/primaryButton";

type Props = {
  cash: number;
  stock: number;
};
const CashContent: FC<Props> = ({ cash, stock }) => {
  // 画面表示
  const [showUpdModal, setUpdModal] = useState(false);
  const ShowUpdModal = () => {
    setUpdModal(true);
  };
  const cashValue = {
    name: "cash",
    value: cash,
  };
  const stockValue = {
    name: "stock",
    value: stock,
  };
  return (
    <div className="cash-content">
      <div className="content">
        <h1>Cash vs Stock</h1>
        <SemiCircle
          value1={cashValue}
          value2={stockValue}
          themeColor={themeElectronic}
          background="#343a40"
        />
        <Modal
          showFlag={showUpdModal}
          setShowModal={setUpdModal}
          content={<UpdateForm setShowModal={setUpdModal} priceTotal={stock} />}
        />
        <PrimaryButton
          content="所有現金を変更"
          onClick={ShowUpdModal}
          isForContent={true}
        />
      </div>
    </div>
  );
};

export default CashContent;
