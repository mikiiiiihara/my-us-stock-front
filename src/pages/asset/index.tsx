import { useRouter } from "next/router";
import { Header } from "../../components/common/header/header";
import { AssetContent } from "../../contents/asset/assetContent";
import { useAuth } from "../../hooks/auth/useAuth";
import { HOOKS_STATE } from "../../constants/hooks";

const Asset = () => {
  const { getUser } = useAuth();
  const { user } = getUser();
  const router = useRouter();
  if (user !== HOOKS_STATE.LOADING && user == null) router.push("/");
  return (
    <>
      <Header title="My US Stock Portfolio | Asset" />
      <AssetContent />
    </>
  );
};

export default Asset;
