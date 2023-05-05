import { useRouter } from "next/router";
import { Header } from "../../components/common/header/header";
import { HOOKS_STATE } from "../../constants/hooks";
import { HomeContent } from "../../contents/home/homeContent";
import { useAuth } from "../../hooks/auth/useAuth";

const Home = () => {
  const { getUser } = useAuth();
  const { user } = getUser();
  const router = useRouter();
  if (user !== HOOKS_STATE.LOADING && user == null) router.push("/");
  return (
    <>
      <Header title="My US Stock Portfolio | Home" />
      <HomeContent />
    </>
  );
};
export default Home;
