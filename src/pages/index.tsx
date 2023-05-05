import { useRouter } from "next/router";
import { Header } from "../components/common/header/header";
import { TopContent } from "../contents/top/topContent";
import { useAuth } from "../hooks/auth/useAuth";
import { HOOKS_STATE } from "../constants/hooks";

const Top = () => {
  const { getUser } = useAuth();
  const { user } = getUser();
  const router = useRouter();
  if (user !== HOOKS_STATE.LOADING && user != null) router.push("/home");
  return (
    <>
      <Header title="My US Stock Portfolio | Top" />
      <TopContent />
    </>
  );
};
export default Top;
