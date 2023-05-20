import { useRouter } from "next/router";
import { PrimaryButton } from "../../primary-button/primaryButton";

const SignIn = () => {
  const router = useRouter();

  const executeLogin = async () => {
    try {
      router.push("/api/login");
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  return (
    <PrimaryButton
      content={"googleログイン"}
      className="mb-3"
      onClick={executeLogin}
    />
  );
};
export default SignIn;
