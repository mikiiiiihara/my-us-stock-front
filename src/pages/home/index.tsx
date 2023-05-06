import { useRouter } from "next/router";
import { Header } from "../../components/common/header/header";
import { HOOKS_STATE } from "../../constants/hooks";
import { HomeContent } from "../../contents/home/homeContent";
import { useAuth } from "../../hooks/auth/useAuth";
import { Loading } from "../../components/common/loading/loading";

const Home = () => {
  const { getUser } = useAuth();
  const { user } = getUser();
  const router = useRouter();
  if (user === HOOKS_STATE.LOADING) return <Loading />;
  if (user == null) router.push("/");
  return (
    <>
      <Header
        title="My US Stock Portfolio | Home"
        userName={user?.name}
        isLogined={true}
      />
      <HomeContent />
    </>
  );
};
export default Home;
