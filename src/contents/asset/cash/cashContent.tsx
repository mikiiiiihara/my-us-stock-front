import React, { FC, useState } from "react";
import { themeForest } from "../../../constants/themeColor";
import { SemiCircle } from "../../../components/graph/semiCircle";
import { Modal } from "../../../components/modal/modal";
import { UpdateForm } from "./forms/updateForm";
import { PrimaryButton } from "../../../components/primary-button/primaryButton";

type Props = {
  cash: number;
  crypto: number;
  stock: number;
};
const CashContent: FC<Props> = ({ cash, crypto, stock }) => {
  // 画面表示
  const [showUpdModal, setUpdModal] = useState(false);
  const ShowUpdModal = () => {
    setUpdModal(true);
  };
  const values = [
    {
      name: "現金",
      value: cash,
    },
    {
      name: "暗号通貨",
      value: crypto,
    },
    {
      name: "株式",
      value: stock,
    },
  ];
  return (
    <div className="cash-content">
      <div className="content">
        <h1>資産割合</h1>
        <SemiCircle
          values={values}
          themeColor={themeForest}
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
