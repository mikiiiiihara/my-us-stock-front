import { useRouter } from "next/router";
import { Header } from "../../components/common/header/header";
import { AssetContent } from "../../contents/asset/assetContent";
import { useAuth } from "../../hooks/auth/useAuth";
import { HOOKS_STATE } from "../../constants/hooks";
import { Loading } from "../../components/common/loading/loading";

const Asset = () => {
  const { getUser } = useAuth();
  const { user } = getUser();
  const router = useRouter();
  if (user === HOOKS_STATE.LOADING) return <Loading />;
  if (user == null) router.push("/");
  return (
    <>
      <Header
        title="My US Stock Portfolio | Asset"
        userName={user?.name}
        isLogined={true}
      />
      <AssetContent />
    </>
  );
};

export default Asset;
