import router from "next/router";
import { Button } from "react-bootstrap";

const SignOut = () => {
  const executeSignOut = async () => {
    // ログアウトAPIを実行
    await fetch("/api/logout");
    // ログイン画面に遷移
    router.push("/");
  };
  return (
    <Button variant="primary" size="sm" onClick={executeSignOut}>
      Sign out
    </Button>
  );
};
export default SignOut;
