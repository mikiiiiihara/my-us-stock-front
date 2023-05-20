import router from "next/router";
import { TopContent } from "../contents/top/topContent";
import { GetServerSideProps } from "next";
import { parse } from "cookie";
import { useEffect } from "react";
import { NextHead } from "../components/common/next-head/nextHead";

type Props = {
  accessToken?: string;
};

const Top = (props: Props) => {
  // accessTokenが取得できた場合、Home画面に飛ばす
  useEffect(() => {
    if (props.accessToken != null && props.accessToken.length > 1)
      router.push("/home");
  }, [props.accessToken]);
  return (
    <>
      <NextHead title="My US Stock Portfolio | Top" />
      <TopContent />
    </>
  );
};
export default Top;

export const getServerSideProps: GetServerSideProps = async (context) => {
  let accessToken = "";
  if (context.req.headers.cookie) {
    const cookies = parse(context.req.headers.cookie);
    accessToken = cookies["accessToken"]; // Remove const before accessToken here
  }

  return {
    props: {
      accessToken,
    },
  };
};
